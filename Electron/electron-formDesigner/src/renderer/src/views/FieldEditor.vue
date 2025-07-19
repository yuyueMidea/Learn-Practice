<template>
    <div class="field-editor">
      <div>字段编辑区域</div><hr/>
      <div>
        <label>标签名称：</label>
        <input v-model="localField.label" />
      </div>
      <div v-if="hasPlaceholder">
        <label>占位符：</label>
        <input v-model="localField.placeholder" />
      </div>
      <div v-if="hasOptions">
        <label>选项（逗号分隔）：</label>
        <input
          :value="localField.options.join(',')"
          @input="onOptionsChange($event)"
        />
      </div>
      <div v-if="localField.type === 'switch'">
        <label>默认开关：</label>
        <input type="checkbox" v-model="localField.default" />
      </div>
      <button @click="save">保存</button>
    </div>
  </template>
  
  <script setup>
  import { reactive, watch, computed } from 'vue'
  
  const props = defineProps({
    field: Object,
  })
  const emit = defineEmits(['updateField'])
  
  const localField = reactive({
    id: '',
    label: '',
    placeholder: '',
    options: [],
    default: false,
    type: '',
  })
  
  watch(
    () => props.field,
    (val) => {
      if (!val) return
      Object.assign(localField, {
        id: val.id,
        label: val.label,
        placeholder: val.placeholder || '',
        options: val.options ? [...val.options] : [],
        default: val.default || false,
        type: val.type,
      })
    },
    { immediate: true }
  )
  
  const hasPlaceholder = computed(() =>
    ['input', 'time'].includes(localField.type)
  )
  const hasOptions = computed(() =>
    ['select', 'checkbox'].includes(localField.type)
  )
  
  function onOptionsChange(e) {
    localField.options = e.target.value.split(',').map((o) => o.trim())
  }
  
  function save() {
    emit('updateField', { ...localField })
  }
  </script>
  
  <style scoped>
  .field-editor {
    width: 250px;
    border: 1px solid #ccc;
    padding: 10px;
    border-radius: 6px;
  }
  label {
    display: inline-block;
    width: 80px;
    margin-bottom: 6px;
  }
  input[type='text'],
  input[type='checkbox'] {
    width: calc(100% - 90px);
    margin-bottom: 10px;
    padding: 4px;
  }
  button {
    padding: 6px 12px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  button:hover {
    background-color: #0056b3;
  }
  </style>
  