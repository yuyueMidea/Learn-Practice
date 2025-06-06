**Vue3 + Composition API简单介绍**

Vue 3.x 中引入了一种新的 API 叫做“组合式 API”（Composition API）。组合式 API 是一个在 Vue 组件内部，用于组织和重用代码逻辑的新方式。

在 Vue 2.x 中，我们主要使用选项对象（Options API）来定义组件。这种方式对于简单的组件来说很有效，但对于复杂组件，特别是具有大量逻辑和状态的组件，可能导致代码难以维护和理解。

组合式 API 的目的是克服 Options API 的一些限制，它提供了一种将逻辑按照功能或关注点划分为更小、更可重用部分的方式。这些部分被称为“组合函数”，每个函数都可以包含响应式状态、计算属性、方法等。

使用组合式 API，你可以在组件中使用以下函数：

1. `setup` 函数：这是组合式 API 的入口点，它在组件实例被创建之前执行。你可以在 `setup` 函数中返回数据、方法和生命周期钩子等，它们将在组件实例中可用。

2. `reactive` 函数：这个函数可以用来创建一个响应式的数据对象。它类似于 Vue 2.x 中的 `data` 选项，但使用在 `setup` 函数内部。

3. `computed` 函数：用于创建计算属性。它类似于 Vue 2.x 中的 `computed` 选项。

4. `watch` 函数：用于监视响应式数据的变化，并执行相应的操作。它类似于 Vue 2.x 中的 `watch` 选项。

5. `ref` 函数：用于创建一个包装对象，使普通数据变为响应式数据。

6. `toRefs` 函数：用于将一个响应式对象转换为普通对象，每个属性都是一个独立的 `ref`。

组合式 API 不取代 Options API，而是提供了另一种组织代码的方式，你可以根据项目的需求选择使用其中的一种或混合使用两种 API。对于复杂的组件和更好的代码组织，组合式 API 提供了更灵活、清晰和易于维护的解决方案

代码说明
---

1. Composition API 是vue引入的一种新的组件代码 组织方式，它解决了Options API 在复杂组件中代码分散的问题，让相关逻辑可以集中管理。
    ```
    // Options API (Vue2 风格)
    export default {
      data() {
        return { count: 0 }
      },
      methods: {
        increment() { this.count++ }
      },
      mounted() {
        console.log('组件已挂载')
      }
    }
    
    // Composition API (Vue3 风格)
    import { ref, onMounted } from 'vue'
    
    export default {
      setup() {
        const count = ref(0)
        
        function increment() {
          count.value++
        }
        
        onMounted(() => {
          console.log('组件已挂载')
        })
        
        return { count, increment }
      }
    }
    ```

**核心特性**
1. setup（）函数：Composition API 的入口点、在组件创建之前执行、返回的对象会暴露给模板和其他选项。
    ```
    setup() {
      // 在这里声明响应式数据、计算属性、方法等
      return {
        // 暴露给模板的内容
      }
    }
    ```
2. 响应式系统：ref（）用于基本类型值，reactive（）用于对象，computed（）计算属性，watch() 和 watchEffect(): 侦听器；
    ```
    import { ref, reactive, computed, watch } from 'vue'
    
    setup() {
      const count = ref(0)
      const state = reactive({ name: 'Vue' })
      
      const doubleCount = computed(() => count.value * 2)
      
      watch(count, (newVal, oldVal) => {
        console.log(`count changed from ${oldVal} to ${newVal}`)
      })
      
      return { count, state, doubleCount }
    }
    ```
3. 生命周期钩子以`onX`形式提供：
        ```
        import { onMounted, onUpdated, onUnmounted } from 'vue'
        
        setup() {
          onMounted(() => {
            console.log('组件挂载')
          })
          
          onUpdated(() => {
            console.log('组件更新')
          })
          
          onUnmounted(() => {
            console.log('组件卸载')
          })
        }
        ```

**组合式API优势特点**
1. 更好的逻辑复用；
2. 更灵活的代码组织；
3. 更好的Typescript支持；
4. 更小的生产包体积；


**组合式API 与 Options API 的关系**
1. 不是替代而是补充：Composition API是可选的、可以与Options API混用；
2. 适用场景：简单组件 Options API可能更简洁，复杂组件 Composition API更有优势。

总结：Composition API 代表了vue的未来发展方向，特别适合大型项目和 需要良好Typescript支持的项目。









