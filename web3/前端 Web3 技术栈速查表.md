**前端 Web3 技术栈速查表**

一、应用框架/脚手架
- Next.js（React 全栈框架）,特点：SSR/SSG、App Router、边缘渲染、与 React 生态深度整合；主流 dApp 前端默认选择。建议：做生产级 dApp 或需要 SEO 的站点选它。
- Vite（通用构建工具）,特点：极快 HMR、零配置上手、打包走 Rollup；适合轻量/工具型 dApp 的前端壳。

二、钱包连接（Connect / Onboarding UI）
- RainbowKit（@rainbow-me/rainbowkit）,定位：React 钱包连接 UI 套件，开箱即用的“连接钱包”弹窗/管理。与 wagmi/viem 配合天然顺滑。适合：需要漂亮的默认 UI、以 EVM 为主的应用。
- Web3Modal / WalletConnect（AppKit）,定位：通过 WalletConnect 标准连接 700+ 钱包 & 多链（EVM、Solana、Bitcoin…），支持 React/Vue 等。适合：多终端/多钱包覆盖、想要官方 WalletConnect 生态（社交登录/法币买币等扩展）。
- ConnectKit（Family 出品）,定位：另一套优雅的 React 连接组件，底层也常搭 wagmi；近年更新活跃并跟进 EIP-6963 钱包发现。
- Coinbase OnchainKit, 定位：不仅是“连钱包”，而是一套 React 组件+工具，覆盖连接、交易、身份等，偏“快速做出上链应用”的一体化 SDK（Base 文档系）。

三、RPC/合约交互客户端
- viem（强类型、组合式 TS 客户端）,特点：对 JSON-RPC 的轻量封装、原生 BigInt、ABI 工具、自动类型推断（配合 abitype）；性能与包体积优秀。何时选：希望全链路 TypeScript 类型安全、搭配 wagmi 做 React。
- ethers.js（v6）,特点：成熟稳定、钱包/合约/Provider 功能完整，生态/示例丰富；v6 有更现代 API。何时选：已有 ethers 经验或需要其丰富的工具/示例。
- web3.js, 特点：历史最久的以太坊 JS 库之一，API 完整、文档持续更新（也能与 Web3Modal 结合）。

四、React Hooks 层（状态、缓存、链上读写）
- wagmi（React Hooks for Ethereum）
- 定位：在 React 里优雅完成“连钱包/读写合约/签名/余额 ENS”等常用场景，并带有缓存、请求去重、持久化。自 v2 起把 TanStack Query 设为 peer 依赖，用它提供的缓存/重试/SSR 水合等能力。
- 何时选：做 React dApp 的主流首选，通常与 viem 组合。

五、类型与代码生成（提升 DX 与安全）
- abitype, 作用：为以太坊 ABI 提供严格的 TypeScript 类型（含 EIP-712），wagmi/viem 的类型系统基石之一。
- TypeChain, 作用：基于 ABI 生成对应库（ethers/web3.js 等）的 TS 绑定，减少手写类型/调用出错。

**常见的组合与选型建议**
- 主流react DApp： Next.js + Wagmi + viem + RainbowKit + the Graph，说明：类型安全+ 组件化体验好，RainbowKit UI成熟，上线快;
- 需要WalletConnect生态、或者多链多钱包： Next.js/vite + Wagmi + （Web3Modal/AppKit）+viem/ethers， 说明：一套介入覆盖700+钱包、多网络；
- 快速原型、或一体化上链应用：Next.js + OnchainKit（内置连接、交易、身份等组件），适合在Base生态快速落地；

**快速对比**
- @rainbow-me/rainbowkit：开箱即用的钱包连接UI，主题、网络切换、最近连接 等细节完善，与Wagmi/viem组合主流；
- ethers： 成熟稳健、生态广，偏向丰富工具链、或者现有项目迁移。
- viem：更轻量，原生bigInt，类型友好，与Wagmi强耦合；
- Wagmi：React Hooks层把连接、读写、签名做成可组合的Hook，并且借助Tanstack Query 做缓存、去重、持久化。
