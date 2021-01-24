/**
 * @author fangzhicong
 * @deprecated 颜色转换
 */

/**
 * RGBA 转 HEX
 * @param r RGBA 的 R
 * @param g RGBA 的 G
 * @param b RGBA 的 B
 * @param a RGBA 的 A
 */
export function RGBAToHEX(r: number, g: number, b: number, a: number = 1) {
    const hex = `#${((1 << 24) + r * (1 << 16) + g * (1 << 8) + b)
        .toString(16)
        .slice(1)
        .toUpperCase()}`
    return a == 1 ? hex : `${hex}${a.toString(16).toUpperCase().slice(2, 4) || 'FF'}`
}

/**
 * HEX 转 RGBA
 * @param hex HEX
 */
export function HEXToRGBA(hex: string) {
    const rgba = { r: 0, g: 0, b: 0, a: 1 }
    if (hex.charAt(0) === '#') {
        hex = hex.substring(1, hex.length)
    }
    if ([3, 6, 8].indexOf(hex.length) === -1) {
        throw new Error('无效的 HEX 值')
    }
    if (hex.length === 3) {
        rgba.r = parseInt(hex.substring(0, 1).repeat(2), 16)
        rgba.g = parseInt(hex.substring(1, 2).repeat(2), 16)
        rgba.b = parseInt(hex.substring(2, 3).repeat(2), 16)
    } else {
        rgba.r = parseInt(hex.substring(0, 2), 16)
        rgba.g = parseInt(hex.substring(2, 4), 16)
        rgba.b = parseInt(hex.substring(4, 6), 16)
    }
    if (hex.length === 8) {
        rgba.a = parseFloat((parseInt(hex.substring(6, 8), 16) / 255).toFixed(2))
    }
    return rgba
}

/**
 * RGBA 转 RGBA 字符串
 * @param r RGBA 的 R
 * @param g RGBA 的 G
 * @param b RGBA 的 B
 * @param a RGBA 的 A
 */
export function RGBAToSTR(r: number, g: number, b: number, a: number = 1) {
    return a == 1 ? `rgb(${r}, ${g}, ${b})` : `rgba(${r}, ${g}, ${b}, ${a})`
}

/**
 * RGB 转 HSV
 * https://www.rapidtables.com/convert/color/rgb-to-hsV.html
 * @param r RGB 的 R
 * @param g RGB 的 G
 * @param b RGB 的 B
 */
export function RGBToHSV(r: number, g: number, b: number) {
    const hsv = { h: 0, s: 100, v: 100 }
    r /= 255
    g /= 255
    b /= 255
    const max = Math.max(r, g, b)
    const min = Math.min(r, g, b)
    const c = max - min
    if (c === 0) {
        hsv.h = 0
    } else if (max === r) {
        hsv.h = ((g - b) / c) % 6
    } else if (max === g) {
        hsv.h = (b - r) / c + 2
    } else {
        hsv.h = (r - g) / c + 4
    }
    hsv.h *= 60
    if (hsv.h < 0) {
        hsv.h += 360
    }
    hsv.v = max
    hsv.s = hsv.v === 0 ? 0 : c / hsv.v
    hsv.s *= 100
    hsv.v *= 100
    return hsv
}
