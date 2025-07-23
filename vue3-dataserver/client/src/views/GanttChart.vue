<template>
    <div ref="ganttRef" class="gantt-container"></div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import Gantt from 'frappe-gantt'
  import '@/assets/frappe-gantt.css' // 替换为你的实际路径
  
  const ganttRef = ref(null)
  
  onMounted(() => {
    const tasks = [
      {
        id: 'Task1',
        name: '任务一',
        start: '2025-07-20',
        end: '2025-07-25',
        progress: 50,
      },
      {
        id: 'Task2',
        name: '任务二',
        start: '2025-07-26',
        end: '2025-08-01',
        progress: 20,
      }
    ]
  
    // ✅ 确保 DOM 渲染完成才挂载 Gantt
    if (ganttRef.value) {
      new Gantt(ganttRef.value, tasks, {
        view_mode: 'Day',
        language: 'zh',
      })
    } else {
      console.error('ganttRef 不存在，DOM 未挂载')
    }
  })
  </script>
  
  <style>
  .gantt-container {
    width: 100%;
    height: 500px;
  }
  </style>
  