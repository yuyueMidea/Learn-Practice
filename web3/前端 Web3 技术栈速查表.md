**前端 Web3 技术栈速查表**

一、应用框架/脚手架
- Next.js（React 全栈框架）,特点：SSR/SSG、App Router、边缘渲染、与 React 生态深度整合；主流 dApp 前端默认选择。建议：做生产级 dApp 或需要 SEO 的站点选它。
- Vite（通用构建工具）,特点：极快 HMR、零配置上手、打包走 Rollup；适合轻量/工具型 dApp 的前端壳。

二、钱包连接（Connect / Onboarding UI）
- RainbowKit（@rainbow-me/rainbowkit）,定位：React 钱包连接 UI 套件，开箱即用的“连接钱包”弹窗/管理。与 wagmi/viem 配合天然顺滑。适合：需要漂亮的默认 UI、以 EVM 为主的应用。
- Web3Modal / WalletConnect（AppKit）,定位：通过 WalletConnect 标准连接 700+ 钱包 & 多链（EVM、Solana、Bitcoin…），支持 React/Vue 等。适合：多终端/多钱包覆盖、想要官方 WalletConnect 生态（社交登录/法币买币等扩展）。
- ConnectKit（Family 出品）,定位：另一套优雅的 React 连接组件，底层也常搭 wagmi；近年更新活跃并跟进 EIP-6963 钱包发现。
- Coinbase OnchainKit, 定位：不仅是“连钱包”，而是一套 React 组件+工具，覆盖连接、交易、身份等，偏“快速做出上链应用”的一体化 SDK（Base 文档系）。
