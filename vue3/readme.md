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


