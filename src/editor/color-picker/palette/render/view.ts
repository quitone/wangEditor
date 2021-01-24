import $, { DomElement } from '../../../../utils/dom-core'
import { arrForEach } from '../../../../utils/util'

export interface $refs {
    [propName: string]: DomElement
}

export function refs($root: DomElement) {
    const temp: $refs = {}
    const allRef = $root.elems[0].querySelectorAll('[ref]')
    arrForEach(allRef, el => {
        temp[el.getAttribute('ref')] = $(el)
    })
    return temp
}

export function renderView() {
    return $(`<div class="we-palette">
                <div class="we-color_hsv">
                    <div class="we-hsv-sv">
                        <div class="we-slider circle" ref="sv"></div>
                    </div>
                    <div class="we-hsv-h">
                        <div class="we-slider across" ref="hue"></div>
                    </div>
                </div>
                <div class="we-color_alpha" ref="a">
                    <div class="we-slider vertical" ref="alpha"></div>
                </div>
                <div class="we-color-preview">
                    <div class="we-view" ref="preview"></div>
                    <div class="we-input">
                        <input class="value" type="text" value="rgba(255, 255, 255, 1)" ref="input" />
                        <label class="pattern" ref="pattern">RGB</label>
                    </div>
                </div>
                <div class="we-color-btns">
                    <button type="button" class="btn warm">清除颜色</button>
                    <button type="button" class="btn primary">取消</button>
                    <button type="button" class="btn">确认</button>
                </div>
            </div>`)
}
