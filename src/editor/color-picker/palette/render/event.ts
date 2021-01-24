/**
 * @author 翠林
 * @deprecated 绑定事件
 */

import Palette from '..'
import { HEXToRGBA } from '../../util/color-conversion'
import drag from '../../util/drag'

export default function bindEvent(palette: Palette) {
    // 拖拽绑定 - 色度
    drag(palette.$refs.hue, function ({ y, h }) {
        palette.forward = true
        palette.data.position.h = y / h
    })

    // 拖拽绑定 - 饱和度、纯度
    drag(palette.$refs.sv, function ({ x, y, w, h }) {
        palette.forward = true
        palette.data.position.s = x / w
        palette.data.position.v = y / h
    })

    // 拖拽绑定 - 透明度
    drag(palette.$refs.alpha, function ({ x, w }) {
        palette.forward = true
        palette.data.position.a = x / w
    })

    // 输入绑定
    palette.$refs.input.on('blur', function (e) {
        palette.forward = false
        let value = (e.target as HTMLInputElement).value.trim()
        // 分析用户的输入
        if (/\^#[0-9a-zA-Z]$/.test(value)) {
            const rgba = HEXToRGBA(value)
            palette.data.r = rgba.r
            palette.data.g = rgba.g
            palette.data.b = rgba.b
            palette.data.a = rgba.a
        } else if (/^(rgb|RGB)/.test(value)) {
            const rgba = value.match(/\d+(\.\d+)?/g)
            if (rgba && rgba.length > 2) {
                const [r, g, b, a] = rgba.map(n => parseFloat(n))
                palette.data.r = r
                palette.data.g = g
                palette.data.b = b
                palette.data.a = typeof a === 'number' ? a : 1
            }
        }
    })

    // 切换输出值的模式
    palette.$refs.pattern.on('click', function () {
        let index = palette.pattern.indexOf(palette.data.pattern) + 1
        if (index > palette.pattern.length) {
            index = 0
        }
        palette.data.pattern = palette.pattern[index]
    })
}
