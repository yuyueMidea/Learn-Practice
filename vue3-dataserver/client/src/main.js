import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

// 添加全局方法
app.config.globalProperties.$formatDate = (date, format = 'YYYY-MM-DD hh:mm:ss') => {
    // 简单的日期格式化逻辑
    const d = new Date(date)
    const year = d.getFullYear()
    const month = String(d.getMonth() + 1).padStart(2, '0')
    const day = String(d.getDate()).padStart(2, '0')
    const hh = String(d.getHours()).padStart(2, '0')
    const mm = String(d.getMinutes()).padStart(2, '0')
    const ss = String(d.getSeconds()).padStart(2, '0')
    return format
        .replace('YYYY', year)
        .replace('MM', month)
        .replace('DD', day)
        .replace('hh', hh)
        .replace('mm', mm)
        .replace('ss', ss)
}
  
// 添加另一个全局方法
app.config.globalProperties.$log = (message) => {
    console.log(`[App Log]: `, message)
}

app.provide('reverseTxt', (txt='abc')=>{
    return String(txt).split('').reverse().join('')
})

app.mount('#app')
