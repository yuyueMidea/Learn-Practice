// ============================================
// 文件: contents/messages/update-color.ts
// ============================================

import type { PlasmoMessaging } from "@plasmohq/messaging"

const handler: PlasmoMessaging.MessageHandler = async (req, res) => {
    const { color } = req.body

    console.log('[Message] 更新颜色:', color)

    // 显示颜色切换提示
    const message = document.createElement('div')
    message.textContent = `颜色已切换为: ${color}`
    message.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    background: rgba(0, 0, 0, 0.8);
    color: white;
    padding: 10px 16px;
    border-radius: 6px;
    font-size: 13px;
    font-weight: 500;
    z-index: 10000;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    animation: fadeIn 0.2s ease-out;
    pointer-events: none;
  `

    document.body.appendChild(message)

    setTimeout(() => {
        message.style.animation = 'fadeOut 0.2s ease-in'
        setTimeout(() => message.remove(), 200)
    }, 1500)

    res.send({ success: true, color })
}

export default handler