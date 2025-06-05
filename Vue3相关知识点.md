**Vue3 + Composition API简单介绍**

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
- 不是替代而是补充；









