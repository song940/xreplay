import { SnapshotRecord } from '../../types'
import { nodeStore } from '../../utils'
import { setAttribute } from '../../virtual-dom'
import { createIframeDOM, injectIframeContent } from '../utils'

export async function renderSnapshot(data: SnapshotRecord['data']) {
    const snapshotData = data
    const { frameId } = snapshotData

    if (frameId) {
        const iframeNode = nodeStore.getNode(frameId) as HTMLIFrameElement
        if (iframeNode) {
            const src = iframeNode.getAttribute('src')
            if (src) {
                setAttribute(iframeNode, 'disabled-src', src)
                setAttribute(iframeNode, 'src', null)
            }
            const contentDocument = iframeNode.contentDocument!
            createIframeDOM(contentDocument, snapshotData)
            injectIframeContent(contentDocument, snapshotData)
        }
    }
}
