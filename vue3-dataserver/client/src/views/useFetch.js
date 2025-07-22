import { onMounted, ref } from "vue";

export function useFetch(url) {
    const data = ref('')
    const loading = ref(true)
    const error = ref('')
    const fetchData = async()=>{
        try {
            loading.value = true
            const res = await fetch(url)
            data.value = await res.json()
        } catch (err) {
            console.log({err})
            error.value = err
        } finally {
            loading.value = false
        }
    }
    onMounted(fetchData)
    return { data, loading, error, refresh: fetchData }
}