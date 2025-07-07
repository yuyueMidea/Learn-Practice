**Vue 项目中的模块化开发与组件扩展方案**

**一、模块化开发架构**
1. 项目结构组织：典型的模块化vue项目结构如下：
      ```
      src/
      ├── components/         # 基础通用组件
      │   ├── UI/            # 纯UI组件(按钮、输入框等)
      │   └── Business/      # 业务通用组件
      ├── modules/           # 业务模块
      │   ├── User/          # 用户模块
      │   │   ├── components/ # 模块专用组件
      │   │   ├── composables/ # 组合式函数
      │   │   ├── stores/     # 模块状态
      │   │   └── views/      # 模块视图
      │   └── Product/       # 产品模块
      ├── composables/        # 全局组合式函数
      └── App.vue
      ```
2. 组件分类原则：
   1. 基础组件：与业务无关的纯UI组件（Button，Input等）
   2. 业务组件：包含特定业务逻辑的组件
   3. 容器组件：负责数据获取和状态管理
   4. 展示组件：只负责UI呈现
  
**二、Mixin实现复用逻辑**
1. 基本使用方式
      ```
      // mixins/loadingMixin.js
      export default {
        data() {
          return {
            isLoading: false
          }
        },
        methods: {
          showLoading() {
            this.isLoading = true
          },
          hideLoading() {
            this.isLoading = false
          }
        }
      }
      
      // 组件中使用
      import loadingMixin from '@/mixins/loadingMixin'
      
      export default {
        mixins: [loadingMixin],
        methods: {
          async fetchData() {
            this.showLoading()
            try {
              // 获取数据
            } finally {
              this.hideLoading()
            }
          }
        }
      }
      ```
2. Mixin的优缺点
   1. 优点：简单易用，适合Vue2项目；可以复用组件选项（data，methods等）
   2. 缺点：命名冲突风险；来源不清晰（多个Mixin时 难以追踪）；不利于Typescript类型推断；
  
3. Vue3的替代方案（组合式函数）
      ```
      // composables/useLoading.js
      import { ref } from 'vue'
      
      export default function useLoading() {
        const isLoading = ref(false)
        
        const showLoading = () => isLoading.value = true
        const hideLoading = () => isLoading.value = false
        
        return { isLoading, showLoading, hideLoading }
      }
      
      // 组件中使用
      import useLoading from '@/composables/useLoading'
      
      export default {
        setup() {
          const { isLoading, showLoading, hideLoading } = useLoading()
          
          return { isLoading, showLoading, hideLoading }
        }
      }
      ```

**三、Slot实现组件扩展**
1. 基本插槽使用
      ```
      <!-- BaseButton.vue -->
      <template>
        <button class="base-btn">
          <slot>默认文本</slot>
        </button>
      </template>
      
      <!-- 使用 -->
      <BaseButton>提交表单</BaseButton>
      ```
2. 具名插槽
      ```
      <!-- CardComponent.vue -->
      <template>
        <div class="card">
          <header class="card-header">
            <slot name="header"></slot>
          </header>
          <div class="card-body">
            <slot></slot>
          </div>
          <footer class="card-footer">
            <slot name="footer"></slot>
          </footer>
        </div>
      </template>
      
      <!-- 使用 -->
      <CardComponent>
        <template #header>
          <h2>卡片标题</h2>
        </template>
        
        <p>卡片主要内容...</p>
        
        <template #footer>
          <button>确认</button>
        </template>
      </CardComponent>
      ```







