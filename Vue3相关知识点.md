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






