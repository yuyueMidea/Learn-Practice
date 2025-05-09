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
   - （2）使用示例：
```
<template>
  <view>
    <uni-card title="卡片标题" extra="额外信息">
      <text>卡片内容</text>
    </uni-card>
    
    <uni-segmented-control 
      :current="current" 
      :values="['选项1', '选项2', '选项3']"
      @clickItem="onClickItem"
    />
  </view>
</template>

<script>
import {uniCard, uniSegmentedControl} from '@dcloudio/uni-ui'

export default {
  components: {uniCard, uniSegmentedControl},
  data() {
    return {
      current: 0
    }
  },
  methods: {
    onClickItem(index) {
      this.current = index
    }
  }
}
</script>
```

**四、状态管理**
- 1、Vuex使用；
- 2、全局变量在main.js中定义：
```
Vue.prototype.$globalData = {
  apiBaseUrl: 'https://api.example.com',
  version: '1.0.0'
}
```
在页面中使用：```console.log(this.$globalData.apiBaseUrl)```

**五、网络请求**
- 1、uni.request封装
```
// utils/http.js
const http = {
  request(options) {
    return new Promise((resolve, reject) => {
      uni.request({
        url: options.url,
        method: options.method || 'GET',
        data: options.data || {},
        header: {
          'Content-Type': 'application/json',
          'Authorization': uni.getStorageSync('token') || ''
        },
        success: (res) => {
          if (res.statusCode === 200) {
            resolve(res.data)
          } else {
            reject(res.data)
          }
        },
        fail: (err) => {
          reject(err)
        }
      })
    })
  },
  get(url, data) {
    return this.request({url, method: 'GET', data})
  },
  post(url, data) {
    return this.request({url, method: 'POST', data})
  }
}

export default http
```
- uni.request使用示例：
```
import http from '@/utils/http'

export default {
  methods: {
    async fetchData() {
      try {
        const res = await http.get('/api/data')
        console.log(res)
      } catch (err) {
        console.error(err)
      }
    }
  }
}
```

**六、跨平台适配**
- 1、平台判断：
```
// 方式1：条件编译
// #ifdef H5
console.log('当前是H5平台')
// #endif

// 方式2：运行时判断
if (uni.getSystemInfoSync().platform === 'android') {
  console.log('当前是Android平台')
}
```
- 2、平台特定代码：
```
// utils/platform.js
export function getPlatformApi() {
  // #ifdef MP-WEIXIN
  return wx
  // #endif
  
  // #ifdef H5
  return window
  // #endif
  
  // #ifdef APP-PLUS
  return plus
  // #endif
}
```

**七、插件与扩展**
- 1、常用插件推荐：图标插件uCharts, ```npm install @qiun/ucharts```

**八、性能优化**
- 1、图片优化：
```
<!-- 使用webp格式（H5支持） -->
<image src="/static/logo.webp" webp></image>

<!-- 懒加载 -->
<image lazy-load src="/static/banner.jpg"></image>
```
- 2、列表优化
```
<template>
  <view>
    <scroll-view scroll-y style="height: 100vh;">
      <recycle-list :list="longList" @click="onItemClick">
        <template v-slot:default="{item}">
          <view class="item">{{item.name}}</view>
        </template>
      </recycle-list>
    </scroll-view>
  </view>
</template>
```
- 3、分包加载
```
// pages.json
{
  "subPackages": [
    {
      "root": "pages/sub1",
      "pages": [
        {
          "path": "page1",
          "style": { ... }
        }
      ]
    }
  ]
}
```
