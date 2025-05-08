## Vue3前端框架

- **第一章,vue3介绍**
- 1、vue3的优势
   - （1）更快的速度：重写diff算法，模板编译优化，更有效的组件初始化
   - （2）更优的数据响应：Proxy
   - （3）更小的体积：TreeShaking、按需引入
   - （4）更容易维护：组合式API、Typescript
- 2、组合式API
   - （1）代码精简高效
   - （2）维护集中便捷
- 3、搭建vue3项目
   - （1）使用create-vue创建vue3项目
   - （2）项目结构说明

- **第二章，setup选项**
- 1、setup选项
   - （1）在setup函数中写的数据， 需要在末尾以对象的方法return才能给模版使用
   - （2）setup选项在`beforeCreate`钩子之前执行
- 2、语法糖
- （1）script标签添加setup选项不需要再写导出语句
- （2）const和var声明的数据会在顶层被声明

- **第三章，reactive和ref函数**
- 1、reactive
   - （1）reactive函数用于创建响应式的对象
   - （2）修改视图格式：对象名.属性名=“新值”
- 2、ref
   - （1）ref用于创建响应式对象的引用对象
   - （2）修改视图格式：对象名.value=“新值”
 
- 3、二者对比
- 相同点：都用于创建响应式数据
- 不同点：
   - （1）数据类型不同：reactive用于对象或数组等复杂类型，ref可以用于任意类型数据
   - （2）访问方式不同：reactive通过对象名.属性名访问，ref通过对象名.value属性访问其值
   - （3）内部实现不同：对于对象或数组，ref内部会调用reactive来处理

- **第四章，computed计算属性**
- 与vue2保持一致，原始数据变化，依赖原始数据的变量也会自动发生变化；不同之处是vue3通过引入computed计算函数创建计算属性，该函数接受一个getter函数作为参数，并返回一个只读的响应式引用。

- **第五章，watch监听器**
- 1、watch介绍：侦听响应式数据的变化，变化时执行回调函数。
- 2、侦听单个数据，`watch(param, (newval, oldval)) =>{}`.
- 3、侦听多个数据, `watch(param1,param2, ([newval, oldval], [newval, oldval])) =>{}`.
- 4、immediate：可以在组件加载时立即执行，语法格式：`immediate：true`
- 5、deep深度侦听：对象或数组内部属性发生变化时 触发回调函数。

- **第六章，生命周期函数**
- 1、选项式API 对比 组合式API
- 2、组合式API
   - （1）setup，组件逻辑入口，替代data，methods 等选项
   - （2）onBeforeMount：组件挂载前调用
   - （3）onMounted：组件挂载后调用，可访问dom
   - （4）onBeforeUpdate：组件更新前调用
   - （5）onUpdate：组件更新后调用，dom更新完成
   - （6）onBeforeUnmount：组件卸载前调用，可执行清理工作
   - （7）onUnmounted:组件卸载后调用，完成清理
- 3、组合式API基本使用
   - （1）导入生命周期函数
   - （2）执行生命周期函数，传入回调

- **第七章，父子组件通信**
- 1、父传子
   - （1）基本思想：父组件给子组件绑定属性，子组件通过props选项接收数据
   - （2）注意事项：子组件通过defineProps宏接收父组件传递的数据的类型
- 2、子传父
   - （1）基本思想：子组件通过ref函数管理响应式数据，使用事件（$emit）将数据传递给父组件
   - （2）注意事项：子组件使用defineEmits宏 定义要触发的事件，父组件模版使用@eventName绑定子组件 事件监听器

- **第八章，模板引用**
- 1、模板引用介绍：访问dom元素，访问子组件实例
- 2、ref获取dom元素，语法格式：`对象名.value.textContent`, textContent 是dom元素的一个属性
- 3、defineExpose
   - （1）使用defineExpose可以将组件内部状态暴露给外部组件使用
   - （2）语法格式：defineExpose({属性名，方法名})
   - （3）应用案例：子组件通过defineExpose暴露内部状态，父组件通过`this.$refs.ref`属性名访问子组件实例

- **第九章，provide和inject**
- 1、应用场景：跨组件通信的一组API，在全局范围内共享数据特别有用。
- 2、跨层传递普通数据：顶层组件（数据提供者）使用provide函数提供数据，底层组件（数据消费者）使用inject函数获取数据
- 3、跨层传递响应式数据：顶层组件使用provide函数提供数据，底层组件使用inject函数获取数据
- 4、跨层传递方法：顶层组件使用provide函数提供数据（参数1是方法名称，参数2也是方法名称），底层组件使用inject函数获取数据

- **第十章，defineOptions**
- 1、背景说明：使用setup选项，无法在<script setup>内部声明一些传统的optionsAPI；defineProps 和 defineEmits 只解决了props 和 eimts 这两个属性。
- 2、defineOptions宏 允许开发者在 <script setup>内部声明一些传统的optionsAPI。

- **第十一章，Pinia状态管理**
- Pinia是vue的状态管理库，专为vue3设计。
- Pinia优势是 简化API（去除了vuex中的mutations）和独立模块（摒弃了vuex中的modules）
- Pinia基础使用：
   - （1）定义store：通过defineStore函数定义store
   - （2）getter：getter依赖的state发生变化时，getter会自动重新计算
   - （3）Action异步实现：类似vue组件中的methods，可以修改state
   - （4）Pinia持久化：安装持久化插件，结合sessionStorage 或 localStorage使用。
 
- 登录业务实战：
   - （1）定义store公共数据源；
   - （2）登录成功后将用户信息存储到store中；
   - （3）发送请求时 从Pinia获取用户Token 添加到请求头中；
   - （4）使用token作为身份认证。

- **第十二章，Typescript**
- 1、类型问题：
   - （1）动态类型问题：JavaScript运行时才能确定变量的具体类型，容易出现类型错误导致程序崩溃
   - （2）Typescript静态类型的优势：在代码运行之前确定变量类型，可以减少运行时出现类型错误。
- 2、Typescript类型：字符串类型 string，数字类型 number，布尔类型boolean， 数组类型 number[], string[], boolean[]， 任意类型any，复杂类型 type 与 interface，函数类型 ()=>void， 字面类型 "a"|"b"|"c", nullsh类型 null与undefined， 泛型<T> <T extends父类型>。
- 3、Typescript类：
   - （1）基本语法 class类名{}，
   - （2）readonly只读属性，
   - （3）方法（set访问器，get访问器），
   - （4）类与接口：类通过`implements`关键字实现接口，
   - （5）接口与继承：一个类只能有一个父类，可以实现多个接口


