## Pinia 与 Vuex 在 Vue 3 中的区别

Pinia 是 Vue 3 的官方推荐状态管理库，而 Vuex 是 Vue 2 时代的主流状态管理解决方案。以下是它们的主要区别：

核心差异
- 1、API 设计：
   - Pinia: 更简单的 API，基于 Composition API 设计
   - Vuex: 基于选项式 API 设计，概念较多（mutations, actions, getters）
 
- 2、TypeScript 支持：Pinia: 一流的 TypeScript 支持，类型推断更完善；Vuex: TypeScript 支持需要额外配置，类型系统不够自然
- 3、模块系统：Pinia: 使用扁平化的 store 结构，自动代码分割；Vuex: 需要手动划分模块，可能产生嵌套结构
- 4、体积：Pinia: 更轻量级 (约 1KB)；Vuex: 相对较大
