<template>
    <div v-if="modelValue" class="modal-overlay" @click.self="close">
      <div class="modal-box">
          <button class="close-btn" @click="close">关闭</button>
        <slot />
      </div>
    </div>
  </template>
  
  <script setup>
  const props = defineProps({ modelValue: Boolean })
  const emit = defineEmits(['update:modelValue'])
  
  const close = () => emit('update:modelValue', false)
  </script>
  
  <style scoped>
  .modal-overlay {
    position: fixed; top: 0; left: 0; right: 0; bottom: 0;
    background: rgba(0,0,0,0.5); display: flex; justify-content: center; align-items: center;
  }
  .modal-box {
    background: white; padding: 20px; border-radius: 8px;
    min-width: 400px; min-height: 300px;
    max-height: 500px; overflow-y: auto;
    box-sizing: border-box;
  }
  .close-btn {
    margin-top: 10px; float: right;
  }
  </style>
  