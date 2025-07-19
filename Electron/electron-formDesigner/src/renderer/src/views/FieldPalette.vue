<template>
    <div class="palette">
      <div
        v-for="type in types"
        :key="type"
        class="field-item"
        draggable="true"
        @dragstart="handleDragStart"
        :data-type="type"
      >
        {{ labels[type] }}
      </div>
    </div>
  </template>
  
  <script setup>
  const types = ['input', 'select', 'checkbox', 'switch', 'time']
  const labels = {
    input: '文本输入',
    select: '下拉选择',
    checkbox: '勾选框',
    switch: '开关',
    time: '时间选择',
  }
  
  function handleDragStart(event) {
    const type = event.target.dataset.type
    event.dataTransfer.setData('type', type)
    event.dataTransfer.effectAllowed = 'copy'
  }
  </script>
  
  <style scoped>
  .palette {
    width: 150px;
    border: 1px solid #ccc;
    padding: 8px;
  }
  .field-item {
    padding: 8px;
    margin-bottom: 6px;
    background: #eee;
    cursor: grab;
    user-select: none;
  }
  </style>
  