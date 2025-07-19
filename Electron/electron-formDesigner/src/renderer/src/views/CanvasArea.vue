<template>
  <div
    class="canvas-area"
    @dragover.prevent
    @drop="handleDrop"
  >
    <div
      v-for="field in schema"
      :key="field.id"
      class="canvas-field"
      :class="{ selected: field.id === selectedId }"
      @click="() => selectField(field.id)"
    >
      {{ field.label || '未命名' }}
    </div>
  </div>
</template>

<script setup>
import { v4 as uuidv4 } from 'uuid'

const props = defineProps({
  schema: Array,
  selectedId: String,
  getNewLabel: Function,
})
const emit = defineEmits(['update:schema', 'update:selectedId'])

function handleDrop(e) {
  const type = e.dataTransfer.getData('type')
  if (!type) return
  const label = props.getNewLabel ? props.getNewLabel(type) : (type + '字段')
  const newField = {
    id: uuidv4(),
    type,
    label,
    placeholder: type === 'input' || type === 'time' ? '请输入...' : '',
    options: type === 'select' || type === 'checkbox' ? ['选项1', '选项2'] : undefined,
    default: type === 'switch' ? false : undefined,
  }
  emit('update:schema', [...props.schema, newField])
}

function selectField(id) {
  emit('update:selectedId', id)
}
</script>

<style scoped>
.canvas-area {
  flex: 1;
  border: 1px solid #ccc;
  padding: 8px;
  min-height: 400px;
  user-select: none;
  overflow-y: auto;
}
.canvas-field {
  padding: 8px;
  margin-bottom: 4px;
  background: #d0eaff;
  cursor: pointer;
  border-radius: 4px;
}
.selected {
  background-color: #89c9ff;
  font-weight: bold;
}
</style>
