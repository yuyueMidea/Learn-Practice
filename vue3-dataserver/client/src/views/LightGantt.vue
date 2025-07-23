<template>
  <div class="gantt-wrapper">
    <!-- 时间轴 -->
    <div class="timeline">
      <div v-for="(date, index) in dateRange" :key="index" class="timeline-cell">
        {{ formatDate(date) }}
      </div>
    </div>

    <!-- 任务区域 -->
    <div class="task-list">
      <div v-for="(task, index) in tasks" :key="task.id" class="task-row">
        <div class="task-name">{{ task.name }}</div>
        <div class="task-bar-wrapper">
          <div
            class="task-bar"
            :style="getBarStyle(task)"
          >
            {{ task.name }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

// mock 数据（可换成 props）
const tasks = [
  {
    id: '1',
    name: '任务一',
    start: '2025-07-20',
    end: '2025-07-22',
  },
  {
    id: '2',
    name: '任务二',
    start: '2025-07-21',
    end: '2025-07-25',
  },
  {
    id: '3',
    name: '任务三',
    start: '2025-07-23',
    end: '2025-07-28',
  }
]

// 时间范围设置（最小开始和最大结束）
const startDate = new Date('2025-07-20')
const endDate = new Date('2025-07-30')

// 生成日期列表
const dateRange = computed(() => {
  const dates = []
  const current = new Date(startDate)
  while (current <= endDate) {
    dates.push(new Date(current))
    current.setDate(current.getDate() + 1)
  }
  return dates
})

// 工具函数：日期 → index
function getDateIndex(dateStr) {
  const date = new Date(dateStr)
  const diffTime = date - startDate
  return Math.floor(diffTime / (1000 * 60 * 60 * 24))
}

// 工具函数：格式化
function formatDate(date) {
  return `${date.getMonth() + 1}/${date.getDate()}`
}

// 每个格子宽度
const cellWidth = 40

// 样式计算：位置 + 宽度
function getBarStyle(task) {
  const offset = getDateIndex(task.start) * cellWidth
  const width = (getDateIndex(task.end) - getDateIndex(task.start) + 1) * cellWidth
  return {
    left: `${offset}px`,
    width: `${width}px`
  }
}
</script>

<style scoped>
.gantt-wrapper {
  font-family: sans-serif;
  border: 1px solid #ccc;
  overflow-x: auto;
  padding: 8px;
}

/* 时间轴 */
.timeline {
  display: flex;
  border-bottom: 1px solid #ccc;
}

.timeline-cell {
  width: 40px;
  text-align: center;
  font-size: 12px;
  border-right: 1px solid #eee;
  padding: 2px 0;
}

/* 任务区域 */
.task-list {
  margin-top: 8px;
}

.task-row {
  display: flex;
  align-items: center;
  height: 30px;
  margin-bottom: 6px;
  position: relative;
}

.task-name {
  width: 80px;
  font-size: 14px;
}

.task-bar-wrapper {
  flex: 1;
  position: relative;
  height: 100%;
}

.task-bar {
  position: absolute;
  height: 20px;
  background-color: #5b9bd5;
  color: white;
  font-size: 12px;
  text-align: center;
  line-height: 20px;
  border-radius: 4px;
  transition: all 0.3s;
}
</style>
