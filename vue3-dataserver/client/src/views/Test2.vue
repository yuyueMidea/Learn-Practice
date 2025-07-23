<template>
    <div class="test2-wrapper">
        <h2>test2</h2>
        <p>
            <button @click="handleCLick">click</button>
            <span>当前时间: {{ cdate }}</span>
        </p>
        <p>
            <input type="text" v-model="input1txt" />
            <button @click="handleCLick2">click</button>
            <span>翻转输入框的文本: {{ showTxt }}</span>
        </p>
        <p>
            <button @click="hdecrement">Decrement</button>
            <button @click="hreset">Reset</button>
            <span>Count: {{ cnt }}</span>, 
            <span>Count*3: {{ cnt3 }}</span>
        </p>
    </div>
</template>
<script>
import { useCounter } from './userCounter'
const {count, increment,decrement, reset} = useCounter(5)

export default {
    name: 'Test2',
    inject: ['reverseTxt'],
    data() {
        return {
            cdate: '',
            input1txt: '',
            showTxt: '',
            cnt: count,
        }
    },
    computed: {
        cnt3() {
            return this.cnt * 3
        }
    },
    mounted() {
        this.$log('test2 mounted!')
    },
    methods: {
        handleCLick() {
            this.cdate = this.$formatDate(new Date())
        },
        handleCLick2() {
            this.showTxt = this.reverseTxt(this.input1txt)
        },
        hdecrement() {
            decrement()
        },
        hreset() {
            reset()
        },
    }
}
</script>