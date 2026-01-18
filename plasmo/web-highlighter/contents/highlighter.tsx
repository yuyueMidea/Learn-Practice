// ============================================
// 文件: contents/highlighter.tsx (完全修复版本)
// ============================================

import type { PlasmoCSConfig } from "plasmo"
import { useEffect, useState } from "react"
import { useStorage } from "@plasmohq/storage/hook"
import type { Highlight, ColorKey } from "~types/highlight"
import { COLORS } from "~types/highlight"
import cssText from "data-text:~style.css"

export const config: PlasmoCSConfig = {
    matches: ["<all_urls>"],
    all_frames: false,
    run_at: "document_idle"
}

export const getStyle = () => {
    const style = document.createElement("style")
    style.textContent = cssText
    return style
}

const HighlighterContent = () => {
    const [highlights, setHighlights] = useStorage<Highlight[]>("highlights", [])
    const [isHighlighting, setIsHighlighting] = useStorage("is-highlighting", false)
    const [currentColor, setCurrentColor] = useStorage<ColorKey>("current-color", "yellow")
    const [tooltip, setTooltip] = useState<{ x: number, y: number, text: string } | null>(null)
    const [isReady, setIsReady] = useState(false)

    // 等待页面完全加载
    useEffect(() => {
        if (document.readyState === 'complete') {
            setIsReady(true)
        } else {
            window.addEventListener('load', () => setIsReady(true))
        }
    }, [])

    // 应用已保存的高亮（只在页面准备好后执行一次）
    useEffect(() => {
        if (!isReady) return

        const currentUrl = window.location.href
        const pageHighlights = highlights.filter(h => h.url === currentUrl)

        console.log(`[Highlighter] 准备应用 ${pageHighlights.length} 个高亮`)

        // 延迟应用，确保 DOM 完全渲染
        const timer = setTimeout(() => {
            pageHighlights.forEach(highlight => {
                applyHighlight(highlight)
            })
            console.log('[Highlighter] 高亮应用完成')
        }, 100)

        return () => clearTimeout(timer)
    }, [isReady])

    // 监听文本选择（使用 mouseup 事件）
    useEffect(() => {
        console.log('[Highlighter] 高亮模式:', isHighlighting ? '已启用' : '已禁用')

        if (!isHighlighting) {
            document.body.style.cursor = 'default'
            return
        }

        document.body.style.cursor = 'text'

        const handleMouseUp = (e: MouseEvent) => {
            // 延迟执行，确保选择已完成
            setTimeout(() => {
                const selection = window.getSelection()

                if (!selection || selection.isCollapsed) {
                    console.log('[Highlighter] 没有选中文本')
                    return
                }

                const selectedText = selection.toString().trim()
                console.log('[Highlighter] 选中文本:', selectedText)

                if (selectedText.length < 2) {
                    console.log('[Highlighter] 文本太短，忽略')
                    return
                }

                // 检查是否点击了已有的高亮
                const target = e.target as HTMLElement
                if (target.classList.contains('highlight-marker')) {
                    console.log('[Highlighter] 点击了已有高亮，跳过')
                    return
                }

                // 创建高亮
                console.log('[Highlighter] 开始创建高亮')
                createHighlight(selection, selectedText)
            }, 10)
        }

        document.addEventListener('mouseup', handleMouseUp)

        return () => {
            document.removeEventListener('mouseup', handleMouseUp)
            document.body.style.cursor = 'default'
        }
    }, [isHighlighting, currentColor])

    const createHighlight = (selection: Selection, text: string) => {
        try {
            const range = selection.getRangeAt(0)

            // 检查范围是否有效
            if (!range || range.collapsed) {
                console.error('[Highlighter] 无效的范围')
                return
            }

            // 生成唯一 ID
            const highlightId = `highlight-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`

            // 创建高亮元素
            const span = document.createElement('span')
            span.className = 'highlight-marker'
            span.style.setProperty('--highlight-color', COLORS[currentColor])
            span.dataset.highlightId = highlightId
            span.style.backgroundColor = COLORS[currentColor]

            // 尝试包裹选中内容
            try {
                range.surroundContents(span)
                console.log('[Highlighter] 高亮创建成功')
            } catch (err) {
                // 如果范围跨越多个节点，使用替代方法
                console.log('[Highlighter] 使用替代方法创建高亮')
                const contents = range.extractContents()
                span.appendChild(contents)
                range.insertNode(span)
            }

            // 保存高亮数据
            const highlight: Highlight = {
                id: highlightId,
                text,
                color: currentColor,
                url: window.location.href,
                pageTitle: document.title,
                timestamp: Date.now(),
                range: {
                    startContainer: '',
                    startOffset: range.startOffset,
                    endContainer: '',
                    endOffset: range.endOffset
                }
            }

            // 更新存储
            setHighlights(prev => [...prev, highlight])
            console.log('[Highlighter] 高亮已保存到存储')

            // 添加点击事件
            span.addEventListener('click', (e) => {
                e.stopPropagation()
                e.preventDefault()
                showTooltip(e.clientX, e.clientY, text)
            })

            // 清除选择
            selection.removeAllRanges()

            // 显示成功提示
            showSuccessMessage()

        } catch (error) {
            console.error('[Highlighter] 创建高亮失败:', error)
        }
    }

    const applyHighlight = (highlight: Highlight) => {
        try {
            // 检查是否已经应用
            const existing = document.querySelector(`[data-highlight-id="${highlight.id}"]`)
            if (existing) {
                console.log('[Highlighter] 高亮已存在，跳过:', highlight.id)
                return
            }

            // 使用简单的文本搜索方式
            const walker = document.createTreeWalker(
                document.body,
                NodeFilter.SHOW_TEXT,
                {
                    acceptNode: (node) => {
                        const parent = node.parentElement
                        if (!parent) return NodeFilter.FILTER_REJECT

                        // 跳过特殊标签
                        const tagName = parent.tagName
                        if (['SCRIPT', 'STYLE', 'NOSCRIPT', 'IFRAME'].includes(tagName)) {
                            return NodeFilter.FILTER_REJECT
                        }

                        // 跳过已高亮的内容
                        if (parent.classList.contains('highlight-marker')) {
                            return NodeFilter.FILTER_REJECT
                        }

                        return NodeFilter.FILTER_ACCEPT
                    }
                }
            )

            let node: Node | null
            while (node = walker.nextNode()) {
                const text = node.textContent || ''
                const index = text.indexOf(highlight.text)

                if (index !== -1) {
                    try {
                        const range = document.createRange()
                        range.setStart(node, index)
                        range.setEnd(node, index + highlight.text.length)

                        const span = document.createElement('span')
                        span.className = 'highlight-marker'
                        span.style.setProperty('--highlight-color', COLORS[highlight.color as ColorKey])
                        span.style.backgroundColor = COLORS[highlight.color as ColorKey]
                        span.dataset.highlightId = highlight.id

                        range.surroundContents(span)

                        // 添加点击事件
                        span.addEventListener('click', (e) => {
                            e.stopPropagation()
                            e.preventDefault()
                            showTooltip(e.clientX, e.clientY, highlight.text)
                        })

                        console.log('[Highlighter] 恢复高亮成功:', highlight.id)
                        break
                    } catch (error) {
                        console.error('[Highlighter] 恢复高亮失败:', error)
                        continue
                    }
                }
            }
        } catch (error) {
            console.error('[Highlighter] 应用高亮时出错:', error)
        }
    }

    const showTooltip = (x: number, y: number, text: string) => {
        console.log('[Highlighter] 显示提示:', text.slice(0, 20))
        setTooltip({ x, y, text })
        setTimeout(() => setTooltip(null), 3000)
    }

    const showSuccessMessage = () => {
        const message = document.createElement('div')
        message.textContent = '✓ 高亮已保存'
        message.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: #10B981;
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
    }

    return (
        <>
            {tooltip && (
                <div
                    style={{
                        position: 'fixed',
                        left: `${tooltip.x}px`,
                        top: `${tooltip.y - 50}px`,
                        background: 'rgba(0, 0, 0, 0.9)',
                        color: 'white',
                        padding: '8px 12px',
                        borderRadius: '6px',
                        fontSize: '13px',
                        zIndex: 10001,
                        pointerEvents: 'none',
                        maxWidth: '300px',
                        wordBreak: 'break-word',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
                        animation: 'tooltipFadeIn 0.2s ease-out'
                    }}>
                    {tooltip.text.slice(0, 100)}{tooltip.text.length > 100 ? '...' : ''}
                </div>
            )}

            <style>{`
        @keyframes tooltipFadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(100px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes slideOutRight {
          from {
            opacity: 1;
            transform: translateX(0);
          }
          to {
            opacity: 0;
            transform: translateX(100px);
          }
        }
        .highlight-marker {
          cursor: pointer;
          transition: opacity 0.15s;
        }
        .highlight-marker:hover {
          opacity: 0.85;
        }
      `}</style>
        </>
    )
}

export default HighlighterContent