import throttle from 'lodash/throttle'
import Palette from '..'
import define from '../../util/define'

export default function vModel(palette: Palette) {
    /**
     * 过滤数据，将数据限定在 0 ~ 1
     * @param value 被过滤的数据
     */
    function between0and1(value: number) {
        if (value > 1) {
            value /= 100
        }
        if (value < 0) {
            value = 0
        }
        value = parseFloat(value.toFixed(2))
        return {
            valid: true,
            data: value,
        }
    }

    /**
     * 滑块定位 - 色度
     */
    define(palette.data.position, 'h', function (value) {
        if (palette.forward) {
            palette.data.h = -value
        }
        palette.$refs.hue.css('top', `${value * 100}%`)
    }, between0and1)

    /**
     * 滑块定位 - 饱和度
     */
    define(palette.data.position, 's', function (value) {
        if (palette.forward) {
            palette.data.s = -value
        }
        palette.$refs.sv.css('left', `${value * 100}%`)
    }, between0and1)

    /**
     * 滑块定位 - 纯度
     */
    define(palette.data.position, 'v', function (value) {
        if (palette.forward) {
            palette.data.v = value - 1
        }
        palette.$refs.sv.css('top', `${value * 100}%`)
    }, between0and1)

    /**
     * 滑块定位 - 透明度
     */
    define(palette.data.position, 'a', function (value) {
        palette.data.a = value
        palette.$refs.alpha.css('left', `${value * 100}%`)
    }, between0and1)

    // 转换颜色
    const computedRGB = throttle(() => {}, 25)

    /**
     * 色度（值的范围限定在 -1 ~ 360；-1 ~ 0 表示传入的百分比；0 ~ 360 表示传入的最终值）
     */
    define<number, string>(palette.data, 'h', computedRGB, function (value) {
        if (value >= -1) {
            if (value < 0) {
                value = Math.abs(value * 360)
            }
            value = parseFloat(value.toFixed(1))
            if (value >= 360 || value < 0) {
                value = 0
            }
            return {
                valid: true,
                data: `${value}deg`,
            }
        } else {
            return {
                valid: false,
                data: value,
            }
        }
    }, palette)

    /**
     * 将值限定在 0 ~ max 之间
     * @param value 需要被过滤的值（值的范围限定在 -1 ~ max；-1 ~ 0 表示传入的百分比；0 ~ max 表示传入的最终值）
     * @param max 最大值
     * @param template 过滤值后的模板
     */
    function between(value: number, max: number, template?: string) {
        if (value >= -1) {
            if (value < 0) {
                value = Math.abs(value * max)
            }
            value = parseFloat(value.toFixed(1))
            if (value > max) {
                value = max
            }
            return {
                valid: true,
                data: template ? template.replace(/\$/, value.toString()) : value,
            }
        } else {
            return {
                valid: false,
                data: value,
            }
        }
    }

    /**
     * 饱和度（值的范围限定在 -1 ~ 100；-1 ~ 0 表示传入的百分比；0 ~ 100 表示传入的最终值）
     */
    define<number, string>(palette.data, 's', computedRGB, function (value) {
        return between(value, 100, '$%')
    }, palette)

    /**
     * 纯度（值的范围限定在 -1 ~ 100；-1 ~ 0 表示传入的百分比；0 ~ 100 表示传入的最终值）
     */
    define<number, string>(palette.data, 'v', computedRGB, function (value) {
        return between(value, 100, '$%')
    }, palette)

    /**
     * RGBA - R
     */
    define(palette.data, 'r', computedRGB, function (value: number) {
        return between(value, 255)
    }, palette)

    /**
     * RGBA - G
     */
    define(palette.data, 'g', computedRGB, function (value: number) {
        return between(value, 255)
    }, palette)

    /**
     * RGBA - B
     */
    define(palette.data, 'b', computedRGB, function (value: number) {
        return between(value, 255)
    }, palette)

    /**
     * RGBA - A
     */
    define(palette.data, 'a', computedRGB, between0and1, palette)

    /**
     * 模式切换
     */
    define(palette.data, 'pattern', function (value: string) {
        palette.computedValue()
        palette.$refs.pattern.text(value)
    }, function (value: string) {
        return {
            valid: palette.pattern.indexOf(value) !== -1,
            data: value,
        }
    })

    /**
     * value
     */
    define(palette.data, 'value', function (value: string) {
        ;(palette.$refs.input.elems[0] as HTMLInputElement).value = value
        palette.$refs.preview.css('background-color', value)
    }, function (value: string) {
        return {
            valid: true,
            data: value,
        }
    }, palette)
}
