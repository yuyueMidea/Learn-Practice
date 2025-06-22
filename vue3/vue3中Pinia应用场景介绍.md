**Vue 3 Pinia 应用场景详解**

Pinia是vue3官方推荐的状态管理库，相比vuex提供了更简洁、更符合组合式API的设计理念，下面详细介绍Pinia的使用场景。
1. 全局状态管理：需要在多个组件间共享的数据；使用场景如：用户登录状态、应用主题设置、全局加载状态、多步骤表单数据；
2. 服务层抽象：封装API调用和业务逻辑；
3. 模块化状态管理：大型应用中按功能模块划分store；
    ```
    src/
      stores/
        modules/
          user.ts      # 用户相关状态
          product.ts   # 产品相关状态
          cart.ts      # 购物车状态
          order.ts     # 订单状态
        index.ts       # 统一导出
    ```
4. 复杂业务逻辑：处理涉及多个状态的操作；
5. 持久化状态，场景：保持状态在页面刷新后不丢失
6. 组合式store：使用Composition API风格定义复杂store；
7. 跨store通信：多个store之间需要交互；
