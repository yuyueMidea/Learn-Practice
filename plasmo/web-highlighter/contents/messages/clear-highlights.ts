// ============================================
// 文件: contents/messages/clear-highlights.ts
// ============================================

import type { PlasmoMessaging } from "@plasmohq/messaging"

const handler: PlasmoMessaging.MessageHandler = async (req, res) => {
    console.log('[Message] 清除高亮')

    // 移除所有高亮标记
    const highlights = document.querySelectorAll('.highlight-marker')
    let count = 0

    highlights.forEach(highlight => {
        const parent = highlight.parentNode
        if (parent) {
            // 将高亮文本恢复为普通文本
            const textNode = document.createTextNode(highlight.textContent || '')
            parent.replaceChild(textNode, highlight)
            count++
        }
    })

    console.log(`[Message] 已清除 ${count} 个高亮`)

    // 显示提示
    const message = document.createElement('div')
    message.textContent = `✓ 已清除 ${count} 个高亮`
    message.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: #EF4444;
    color: white;
    padding: 12px 20px;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 600;
    z-index: 10000;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    animation: slideInRight 0.3s ease-out;
    pointer-events: none;
  `

    document.body.appendChild(message)

    setTimeout(() => {
        message.style.animation = 'slideOutRight 0.3s ease-in'
        setTimeout(() => message.remove(), 300)
    }, 2000)

    res.send({ success: true, count })
}

export default handler