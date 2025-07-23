<template>
    <div class="test1-wrapper">
        <h2>test1</h2>
        <p>在 Composition API 的 setup() 函数中无法直接访问 this，可以通过 getCurrentInstance() 获取</p>
        <p>
            <button @click="handleCLick">获取当前时间</button>
            <span>cdate: {{ cdate }}</span>
        </p>
        <p>
            <input type="text" v-model="inputText" />
            <button @click="handleCLick2">click</button>
            <span>翻转输入框的文本: {{ showText }}</span>
        </p>
        <p>
            <button @click="increment">Add</button>
            <button @click="reset">Reset</button>
            <span>Count: {{ count }}</span>
        </p>
    </div>
</template>
<script setup>
import { getCurrentInstance, inject, ref } from 'vue';
import { useCounter } from './userCounter';

defineOptions({
    name:'Test1'
})
const instance = getCurrentInstance();
const cdate = ref('')
const handleCLick = ()=>{
    // console.log(3333333)
    cdate.value = instance?.appContext.config.globalProperties.$formatDate(new Date());
    instance?.appContext.config.globalProperties.$log( {msg: 666, time: cdate.value} )
}
const inputText = ref('')
const showText = ref('')
// 组件中使用全局的方法
const myreverseTxt = inject('reverseTxt')

// 点击按钮调用该方法
const handleCLick2 = ()=>{
    showText.value = myreverseTxt(inputText.value)
}

const {count, increment, reset} = useCounter(5)

</script>