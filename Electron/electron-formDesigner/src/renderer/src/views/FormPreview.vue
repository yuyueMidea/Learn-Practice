<template>
    <div class="form-preview">
      <h3>表单预览</h3>
      <form @submit.prevent>
        <div
          v-for="field in schema"
          :key="field.id"
          class="form-item"
        >
          <label>{{ field.label }}</label>
  
          <input
            v-if="field.type === 'input'"
            v-model="formData[field.id]"
            :placeholder="field.placeholder"
          />
  
          <select
            v-if="field.type === 'select'"
            v-model="formData[field.id]"
          >
            <option
              v-for="opt in field.options"
              :key="opt"
              :value="opt"
            >
              {{ opt }}
            </option>
          </select>
  
          <div v-if="field.type === 'checkbox'" class="chkbox_line">
            <label class="chk_label"
              v-for="opt in field.options"
              :key="opt"
            >
              <input class="chk_input"
                type="checkbox"
                :value="opt"
                v-model="formData[field.id]"
              />{{ opt }}
            </label>
          </div>
  
          <input
            v-if="field.type === 'time'"
            type="time"
            v-model="formData[field.id]"
          />
  
          <label v-if="field.type === 'switch'" class="chkbox_line">
            <input
              type="checkbox"
              v-model="formData[field.id]"
            /> {{ formData[field.id] ? '开' : '关' }}
          </label>
        </div>
      </form>
    </div>
  </template>
  
  <script setup>
  import { watchEffect } from 'vue'
  
  const props = defineProps({
    schema: Array,
    formData: Object,
  })
  
  watchEffect(() => {
    props.schema.forEach((field) => {
      if (!(field.id in props.formData)) {
        if (field.type === 'switch') props.formData[field.id] = false
        else if (field.type === 'checkbox') props.formData[field.id] = []
        else props.formData[field.id] = ''
      }
    })
  })
  </script>
  
  <style scoped>
  .form-preview {
    padding: 10px 20px;
    border-top: 1px solid #ddd;
    max-width: 900px;
    margin: auto;
  }
  h3 {
    margin-bottom: 14px;
    color: #2c7be5;
  }
  .form-item {
    margin-bottom: 16px;
    display: flex;
    align-items: center;
  }
  label {
    width: 120px;
    font-weight: 600;
    color: #555;
  }
  input,
  select {
    flex: 1;
    padding: 6px 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  .form-item > div label {
    margin-right: 10px;
  }
  .form-item .chkbox_line {
    display: flex;
  }
  .form-item .chkbox_line .chk_label{
    display: flex; align-items: center; cursor: pointer;
  }
  </style>
  