<template>
    <div class="app-form">
      <FieldPalette />
      <CanvasArea
        :schema="schema"
        :selectedId="selectedId"
        :getNewLabel="getNewLabel"
        @update:schema="schema = $event"
        @update:selectedId="selectedId = $event"
      />
      <FieldEditor
        v-if="selectedField"
        :field="selectedField"
        @updateField="updateField"
      />
    </div>
    <!-- 下方：工具栏 + 表单渲染预览 -->
    <div class="editor-footer">
        <div class="toolbar">
          <button class="btn" @click="download">导出 JSON</button>
          <label class="btn">
            导入 JSON
            <input type="file" accept="application/json" @change="importSchema" hidden />
          </label>
        </div>
        <FormPreview :schema="schema" v-model:formData="formData" />
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue'
  import FieldPalette from './FieldPalette.vue'
  import CanvasArea from './CanvasArea.vue'
  import FieldEditor from './FieldEditor.vue'
  import FormPreview from './FormPreview.vue'
  
  const schema = ref([])
  const selectedId = ref(null)
  const formData = ref({})
  
  const selectedField = computed(() =>
    schema.value.find((f) => f.id === selectedId.value)
  )
  
  function updateField(updated) {
    const idx = schema.value.findIndex((f) => f.id === updated.id)
    if (idx >= 0) {
      schema.value[idx] = { ...updated }
    }
  }
  
  // 自动生成带序号的不重复 label
  function getNewLabel(type) {
    const base = {
      input: '文本输入',
      select: '下拉框',
      checkbox: '勾选框',
      switch: '开关',
      time: '时间选择',
    }[type] || '字段'
  
    const existingLabels = schema.value
      .filter(f => f.type === type)
      .map(f => f.label)
  
    // 找最大的序号
    let maxNum = 0
    existingLabels.forEach(label => {
      const reg = new RegExp(`^${base}(\\d+)$`)
      const m = label.match(reg)
      if (m && m[1]) {
        const num = parseInt(m[1], 10)
        if (num > maxNum) maxNum = num
      }
    })
  
    return `${base}${maxNum + 1}`
  }
  function downloadJSON(data, filename = 'form-schema.json') {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    a.click()
    URL.revokeObjectURL(url)
  }

    function download() {
        downloadJSON({
            schema: schema.value,
            data: formData.value
        })
    }

  function importSchema(event) {
    const file = event.target.files[0]
    const reader = new FileReader()
    reader.onload = () => {
        try {
        const result = JSON.parse(reader.result)
        schema.value = result.schema || []
        formData.value = result.data || {}
        } catch (e) {
        alert('导入失败：文件格式错误')
        }
    }
    reader.readAsText(file)
  }
  </script>
  
  <style scoped>
  .app-form {
    display: flex;
    gap: 16px;
    padding: 20px;
    font-family: Arial, sans-serif;
    min-height: 420px;
    border-bottom: 1px solid #ddd;
  }
  .editor-footer {
    margin-top: 24px;
  }
  
  /* 导入导出按钮区域 */
  .toolbar {
    margin-bottom: 12px;
  }
  .toolbar .btn {
    display: inline-block;
    padding: 6px 12px;
    margin-right: 10px;
    background: #409eff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
  }
  .toolbar .btn:hover {
    background: #66b1ff;
  }
  </style>
  