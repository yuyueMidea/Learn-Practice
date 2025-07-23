<template>
    <div class="gantt-container">
      <!-- 时间线 -->
      <div class="gantt-header" :style="{ width: timelineWidth + 'px' }">
        <div
          v-for="(day, index) in days"
          :key="index"
          class="gantt-header-cell"
        >
          {{ day }}
        </div>
      </div>
  
      <!-- 分组任务 -->
      <div class="gantt-body" ref="ganttBody">
        <div
          v-for="(group, groupIndex) in groupedTasks"
          :key="groupIndex"
          class="gantt-group"
        >
          <div class="gantt-group-label">{{ group.label }}</div>
          <div class="gantt-group-tasks" :style="{ width: timelineWidth + 'px' }">
            <div
              v-for="task in group.tasks"
              :key="task.id"
              class="gantt-task"
              :style="getTaskStyle(task)"
              :title="task.name"
              @click="onClickTask(task)"
              @mousedown.prevent="onStartDrag(task, $event)"
            >
              {{ task.name }}
            </div>
          </div>
        </div>
      </div>
  
      <!-- 工具栏 -->
      <div class="gantt-toolbar">
        <button @click="sortTasks">排序任务</button>
        <button @click="exportPng">导出 PNG</button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, reactive, computed, onMounted } from 'vue'
  import html2canvas from 'html2canvas'
  
  const cellWidth = 40
  const days = Array.from({ length: 30 }, (_, i) => `7-${i + 1}`)
  
  const tasks = reactive([
    { id: 1, name: '设计', start: 1, duration: 5, group: '产品' },
    { id: 2, name: '开发', start: 6, duration: 8, group: '技术' },
    { id: 3, name: '测试', start: 15, duration: 4, group: '测试' },
    { id: 4, name: '发布', start: 20, duration: 2, group: '技术' },
    { id: 5, name: '验收', start: 23, duration: 3, group: '产品' },
  ])
  
  const dragging = ref(null)
  const offsetX = ref(0)
  
  const groupedTasks = computed(() => {
    const groups = {}
    tasks.forEach((task) => {
      if (!groups[task.group]) groups[task.group] = []
      groups[task.group].push(task)
    })
    return Object.keys(groups).map((label) => ({
      label,
      tasks: groups[label],
    }))
  })
  
  const timelineWidth = computed(() => days.length * cellWidth)
  
  const getTaskStyle = (task) => ({
    left: task.start * cellWidth + 'px',
    width: task.duration * cellWidth + 'px',
  })
  
  const onClickTask = (task) => {
    console.log(`点击任务：${task.name}`)
  }
  
  // 拖拽逻辑
  const onStartDrag = (task, e) => {
    dragging.value = task
    offsetX.value = e.offsetX
    window.addEventListener('mousemove', onDragging)
    window.addEventListener('mouseup', onEndDrag)
  }
  
  const onDragging = (e) => {
    if (!dragging.value) return
    const parentRect = e.target.closest('.gantt-group-tasks')?.getBoundingClientRect()
    if(!parentRect) return
    let newLeft = e.clientX - parentRect.left - offsetX.value
    newLeft = Math.max(0, newLeft)
    const newStart = Math.round(newLeft / cellWidth)
    dragging.value.start = newStart
  }
  
  const onEndDrag = () => {
    dragging.value = null
    window.removeEventListener('mousemove', onDragging)
    window.removeEventListener('mouseup', onEndDrag)
  }
  
  // 任务排序
  const sortTasks = () => {
    tasks.sort((a, b) => a.start - b.start)
  }
  
  // 导出为 PNG
  const ganttBody = ref(null)
  const exportPng = async () => {
    const canvas = await html2canvas(ganttBody.value, {
      backgroundColor: '#fff',
    })
    const link = document.createElement('a')
    link.download = 'gantt-chart.png'
    link.href = canvas.toDataURL()
    link.click()
  }
  
  onMounted(() => {
    // 可选初始化逻辑
  })
  </script>
  
  <style scoped>
  .gantt-container {
    font-family: sans-serif;
    border: 1px solid #ddd;
    padding: 10px;
    overflow-x: auto;
    max-width: 100%;
  }
  
  .gantt-header {
    display: flex;
    background: #f0f0f0;
    position: sticky;
    top: 0;
    z-index: 2;
    border-bottom: 1px solid #ccc;
  }
  
  .gantt-header-cell {
    width: 40px;
    text-align: center;
    padding: 4px;
    border-right: 1px solid #ccc;
    font-size: 12px;
  }
  
  .gantt-body {
    display: flex;
    flex-direction: column;
    gap: 10px;
    overflow-x: auto;
    position: relative;
  }
  
  .gantt-group {
    display: flex;
    align-items: flex-start;
  }
  
  .gantt-group-label {
    width: 60px;
    text-align: right;
    padding-right: 8px;
    font-weight: bold;
    white-space: nowrap;
    flex-shrink: 0;
  }
  
  .gantt-group-tasks {
    position: relative;
    height: 30px;
    display: flex;
    align-items: center;
  }
  
  .gantt-task {
    position: absolute;
    height: 24px;
    background-color: #42b983;
    color: white;
    text-align: center;
    font-size: 12px;
    line-height: 24px;
    border-radius: 4px;
    cursor: grab;
    white-space: nowrap;
    padding: 0 6px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  .gantt-toolbar {
    margin-top: 20px;
    display: flex;
    gap: 12px;
  }
  </style>
  