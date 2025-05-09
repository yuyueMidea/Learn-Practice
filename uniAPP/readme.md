## uniAPP开发指南
- uniAPP是一个使用vue.js开发所有前端应用的框架，开发者编写一套代码，可以发布到iOS、Android、web（响应式），以及各种小程序、快应用等多个平台。

- 核心概念与语法
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
2、页面生命周期（页面.vue）
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
- 页面配置（pages.json）
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
