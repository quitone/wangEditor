/**
 * @author 翠林
 * @deprecated 调色板
 */

import { Data } from '../types'
import { RGBAToHEX } from '../util/color-conversion'
import $, { DomElement } from './../../../utils/dom-core'
import bindEvent from './render/event'
import { $refs, refs, renderView } from './render/view'

export default class Palette {
    public $el: DomElement

    public $refs: $refs

    public pattern = ['rgb', 'hex']

    public data: Data = {
        position: {
            h: 0,
            s: 1,
            v: 1,
            a: 1,
        },
        h: '0deg',
        s: '100%',
        v: '100%',
        r: 255,
        g: 0,
        b: 0,
        a: 1,
        pattern: 'rgb', // rgb、hex
        value: 'rgb(255, 0, 0)',
    }

    public forward = true

    public constructor() {
        this.$el = $('<div></div>')
        this.$refs = {}
    }

    public render() {
        this.$el = renderView()
        this.$refs = refs(this.$el)
        bindEvent(this)
    }

    /**
     * 计算最终值
     */
    public computedValue() {
        const { r, g, b, a } = this.data
        switch (this.data.pattern) {
            case 'hex':
                this.data.value = RGBAToHEX(r, g, b, a)
                break
            default:
                this.data.value = a === 1 ? `rgb(${r}, ${g}, ${b})` : `rgba(${r}, ${g}, ${b}, ${a})`
                break
        }
    }
}
