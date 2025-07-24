<template>
    <button :disabled="disabled || loading"
        :class="['base-btn', type, {loading, disabled}]"
        @click="handleClick">
        <span v-if="loading">loading...</span>
        <slot v-else></slot>
    </button>
</template>
<script setup>
defineProps({
    type: {
        type: String,
        default: 'primary'
    },
    loading: {
        type: Boolean,
        default: false
    },
    disabled: {
        type: Boolean,
        default: false
    }
})

const emit = defineEmits(['click'])
const handleClick = (e) => emit('click', e)
</script>

<style scoped>
.base-btn {
  padding: 8px 16px;
  border: none;
  cursor: pointer;
  border-radius: 3px;
}
.base-btn.primary { background: #409eff; color: white; }
.base-btn.disabled, .loading { background: #ccc !important; cursor: not-allowed; }
</style>