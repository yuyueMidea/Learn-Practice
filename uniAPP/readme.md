## uniAPP开发指南
- uniAPP是一个使用vue.js开发所有前端应用的框架，开发者编写一套代码，可以发布到iOS、Android、web（响应式），以及各种小程序、快应用等多个平台。

**一、核心概念与语法**
- 1、应用生命周期(APP.vue)
```
export default {
  onLaunch(options) {
    console.log('应用初始化', options)
  },
  onShow() {
    console.log('应用显示')
  },
  onHide() {
    console.log('应用隐藏')
  }
}
```
- 2、页面生命周期（页面.vue）
```
export default {
  onLoad(options) {
    // 页面加载
  },
  onShow() {
    // 页面显示
  },
  onReady() {
    // 页面初次渲染完成
  },
  onHide() {
    // 页面隐藏
  },
  onUnload() {
    // 页面卸载
  }
}
```

**二、路由与页面跳转**
- 1、页面配置（pages.json）
```
{
  "pages": [
    {
      "path": "pages/index/index",
      "style": {
        "navigationBarTitleText": "首页"
      }
    },
    {
      "path": "pages/detail/detail",
      "style": {
        "navigationBarTitleText": "详情页"
      }
    }
  ]
}
```
- 2、页面跳转方法
```
// 保留当前页面，跳转到应用内页面
uni.navigateTo({
  url: '/pages/detail/detail?id=1'
})

// 关闭当前页面，跳转到应用内页面
uni.redirectTo({
  url: '/pages/detail/detail?id=1'
})

// 返回上一页
uni.navigateBack()

// 跳转到 tabBar 页面
uni.switchTab({
  url: '/pages/tabbar/home'
})
```
- 3、条件编译
```
<!-- #ifdef MP-WEIXIN -->
<view>仅微信小程序显示</view>
<!-- #endif -->

<!-- #ifdef H5 -->
<view>仅H5显示</view>
<!-- #endif -->
```
**三、UI组件库**
- 1、基础组件：视图容器；表单组件；
- 2、扩展组件：
- （1）安装uni-ui; ```npm install @dcloudio/uni-ui```

