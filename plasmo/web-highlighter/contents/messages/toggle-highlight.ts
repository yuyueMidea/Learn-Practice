// ============================================
// 文件: contents/messages/toggle-highlight.ts
// ============================================

import type { PlasmoMessaging } from "@plasmohq/messaging"

const handler: PlasmoMessaging.MessageHandler = async (req, res) => {
    const { enabled, color } = req.body

    console.log('[Message] 切换高亮模式:', enabled, '颜色:', color)

    if (enabled) {
        document.body.style.cursor = 'text'

        // 添加视觉提示
        const indicator = document.createElement('div')
        indicator.id = 'highlight-mode-indicator'
        indicator.textContent = '🖍️ 高亮模式已启用'
        indicator.style.cssText = `
      position: fixed;
      bottom: 20px;
      left: 50%;
      transform: translateX(-50%);
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 10px 20px;
      border-radius: 25px;
      font-size: 14px;
      font-weight: 600;
      z-index: 10000;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
      animation: slideUp 0.3s ease-out;
      pointer-events: none;
    `

        // 移除旧的提示
        const oldIndicator = document.getElementById('highlight-mode-indicator')
        if (oldIndicator) oldIndicator.remove()

        document.body.appendChild(indicator)

        // 3秒后自动隐藏
        setTimeout(() => {
            if (indicator.parentNode) {
                indicator.style.animation = 'slideDown 0.3s ease-in'
                setTimeout(() => indicator.remove(), 300)
            }
        }, 3000)

    } else {
        document.body.style.cursor = 'default'

        // 移除提示
        const indicator = document.getElementById('highlight-mode-indicator')
        if (indicator) indicator.remove()

        console.log('[Message] 高亮模式已禁用')
    }

    res.send({ success: true, enabled, color })
}

export default handler