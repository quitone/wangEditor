/**
 * @description 处理跳出 table 时各浏览器行为不一致
 * @author yanbiao(86driver)
 */
import Editor from '../../../editor/index'
import $ from '../../../utils/dom-core'

export default function bindEventDomEvent(editor: Editor) {
    const { txt, selection, $textElem } = editor
    const { keydownEvents, clickEvents } = txt.eventHooks

    clickEvents.push(function (e) {
        const $selectElem = selection.getSelectionContainerElem()
        if ($selectElem && $textElem.equal($selectElem)) {
            // 处理chrome点击table末尾空白选区
            $selectElem.elems[0].blur()
        }
    })

    keydownEvents.push(function (e) {
        // 实时保存选区
        editor.selection.saveRange()

        const $topElem = $(selection.getSelectionContainerElem()).getNodeTop(editor)
        const $preElem = $topElem.elems.length
            ? $topElem.prev().elems.length
                ? $topElem.prev()
                : null
            : null
        const $currElem = $(editor.selection.getSelectionContainerElem())
        if ($topElem.elems.length && $topElem.getNodeName() === 'TABLE') {
            const tdElems = $topElem.elems[0].getElementsByTagName('td')
            const lastTdElem = tdElems[tdElems.length - 1]
            // 当前选区处于table最后一个td时按右方向键跳转到与table同级的下一个元素
            if (lastTdElem === $currElem.elems[0] && e.keyCode === 39) {
                window.getSelection()?.extend($topElem.next().elems[0], 0)
            }
        }
        if ($preElem && $preElem.getNodeName() === 'TABLE') {
            // 光标处于选区开头
            if (selection.getCursorPos() === 0) {
                // 按下左方向键时跳转到table最后一个td内
                if (e.keyCode === 37) {
                    const tdElems = $preElem.elems[0].getElementsByTagName('td')
                    const lastTdElem = tdElems[tdElems.length - 1]
                    window.getSelection()?.extend(lastTdElem, 0)
                }
                // 按下delete键阻止默认行为
                if (e.keyCode === 8) {
                    e.preventDefault()
                }
            }
        }
    })
}
