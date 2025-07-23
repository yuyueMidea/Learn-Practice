import { ref } from "vue"

export function useCounter(initVal = 0) {
    const count = ref(initVal)
    const increment = ()=>count.value++
    const decrement = ()=>count.value--
    const reset = ()=>count.value=initVal
    return { count, increment, decrement, reset }
}