<template>
    <div class="gantt-wrapper">
      <div class="gantt-header">
        <div class="gantt-header-cell" v-for="day in dateRange" :key="day">
          {{ day }}
        </div>
      </div>
      <div class="gantt-body">
        <div class="task-labels">
          <div class="task-label" v-for="group in groupedTasks" :key="group.name">
            <div class="group-title">{{ group.name }}</div>
            <div class="task-name" v-for="task in group.tasks" :key="task.id">
              {{ task.name }}
            </div>
          </div>
        </div>
  
        <div class="gantt-chart" ref="scrollRef">
          <div
            class="group-chart"
            v-for="group in groupedTasks"
            :key="group.name"
          >
            <div
              v-for="task in group.tasks"
              :key="task.id"
              class="task-bar"
              :style="getTaskStyle(task)"
              @mouseenter="showTooltip($event, task)"
              @mouseleave="hideTooltip"
              @mousedown="startDrag($event, task)"
              @click="onTaskClick(task)"
            >
              {{ task.name }}
            </div>
          </div>
        </div>
      </div>
  
      <div
        class="tooltip"
        v-if="tooltip.visible"
        :style="{ left: tooltip.x + 'px', top: tooltip.y + 'px' }"
      >
        {{ tooltip.text }}
      </div>
  
      <button @click="exportPng">导出 PNG</button>
    </div>
  </template>
  
  <script setup>
  import { ref, reactive, computed, onMounted } from 'vue'
  import html2canvas from 'html2canvas'
  
  const ganttRef = ref(null)
  const scrollRef = ref(null)
  const dayWidth = 40
  const startDate = new Date('2025-07-01')
  const endDate = new Date('2025-07-15')
  const dragging = ref(null)
  const startX = ref(0)
  
  const tooltip = reactive({ visible: false, x: 0, y: 0, text: '' })
  
  const tasks = ref([
    { id: 1, name: '任务 A', group: '前端', start: '2025-07-02', end: '2025-07-06' },
    { id: 2, name: '任务 B', group: '前端', start: '2025-07-05', end: '2025-07-08' },
    { id: 3, name: '任务 C', group: '后端', start: '2025-07-03', end: '2025-07-10' },
    { id: 4, name: '任务 D', group: '后端', start: '2025-07-11', end: '2025-07-13' }
  ])
  
  const groupedTasks = computed(() => {
    const groups = {}
    for (const task of tasks.value) {
      if (!groups[task.group]) groups[task.group] = []
      groups[task.group].push(task)
    }
    return Object.entries(groups).map(([name, tasks]) => ({ name, tasks }))
  })
  
  function getDateRange(start, end) {
    const range = []
    const date = new Date(start)
    while (date <= end) {
      range.push(date.toISOString().slice(5, 10))
      date.setDate(date.getDate() + 1)
    }
    return range
  }
  
  const dateRange = computed(() => getDateRange(startDate, endDate))
  
  function getTaskStyle(task) {
    const totalDays = (new Date(task.start) - startDate) / (1000 * 60 * 60 * 24)
    const duration = (new Date(task.end) - new Date(task.start)) / (1000 * 60 * 60 * 24) + 1
    return {
      left: totalDays * dayWidth + 'px',
      width: duration * dayWidth + 'px'
    }
  }
  
  function showTooltip(e, task) {
    tooltip.visible = true
    tooltip.x = e.pageX + 10
    tooltip.y = e.pageY + 10
    tooltip.text = `${task.name}: ${task.start} → ${task.end}`
  }
  
  function hideTooltip() {
    tooltip.visible = false
  }
  
  function onTaskClick(task) {
    alert(`点击了任务：${task.name}`)
  }
  
  function startDrag(e, task) {
    dragging.value = task
    startX.value = e.clientX
    document.addEventListener('mousemove', onDragging)
    document.addEventListener('mouseup', stopDragging)
  }
  
  function onDragging(e) {
    if (!dragging.value) return
    const deltaX = e.clientX - startX.value
    const daysMoved = Math.round(deltaX / dayWidth)
    const newStart = new Date(dragging.value.start)
    const newEnd = new Date(dragging.value.end)
    newStart.setDate(newStart.getDate() + daysMoved)
    newEnd.setDate(newEnd.getDate() + daysMoved)
    dragging.value.start = newStart.toISOString().slice(0, 10)
    dragging.value.end = newEnd.toISOString().slice(0, 10)
    startX.value = e.clientX
  }
  
  function stopDragging() {
    dragging.value = null
    document.removeEventListener('mousemove', onDragging)
    document.removeEventListener('mouseup', stopDragging)
  }
  
  function exportPng() {
    html2canvas(ganttRef.value).then(canvas => {
      const a = document.createElement('a')
      a.href = canvas.toDataURL('image/png')
      a.download = 'gantt.png'
      a.click()
    })
  }
  </script>
  
  <style scoped>
  .gantt-wrapper {
    font-family: sans-serif;
    padding: 10px;
    overflow: auto;
    position: relative;
  }
  .gantt-header {
    display: flex;
    position: sticky;
    top: 0;
    background: #f4f4f4;
    z-index: 10;
  }
  .gantt-header-cell {
    width: 40px;
    text-align: center;
    font-size: 12px;
    border-right: 1px solid #ddd;
  }
  .gantt-body {
    display: flex;
  }
  .task-labels {
    min-width: 100px;
  }
  .task-name, .group-title {
    height: 30px;
    line-height: 30px;
    padding-left: 4px;
  }
  .gantt-chart {
    overflow-x: auto;
    flex: 1;
    position: relative;
  }
  .group-chart {
    position: relative;
  }
  .task-bar {
    position: absolute;
    height: 24px;
    margin-top: 3px;
    background: #409eff;
    border-radius: 4px;
    color: #fff;
    font-size: 12px;
    text-align: center;
    line-height: 24px;
    cursor: grab;
    user-select: none;
  }
  .tooltip {
    position: absolute;
    background: #333;
    color: white;
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 12px;
    pointer-events: none;
  }
  </style>
  