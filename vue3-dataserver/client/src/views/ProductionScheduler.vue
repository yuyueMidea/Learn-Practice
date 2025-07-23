<template>
    <div class="scheduler-container">
      <div class="toolbar">
        <button @click="addNewTask">新增任务</button>
        <button @click="saveSchedule">保存排程</button>
        <div class="time-range">
          <input type="date" v-model="startDate" @change="updateTimeRange">
          <span>至</span>
          <input type="date" v-model="endDate" @change="updateTimeRange">
        </div>
      </div>
      
      <div ref="ganttContainer" class="gantt-container"></div>
      
      <TaskDetailModal 
        v-if="showModal"
        :task="selectedTask"
        :devices="devices"
        @save="handleSaveTask"
        @close="showModal = false"
      />
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, onBeforeUnmount } from 'vue';
  import { gantt } from 'dhtmlx-gantt';
  import 'dhtmlx-gantt/codebase/dhtmlxgantt.css';
  import TaskDetailModal from './TaskDetailModal.vue';
  
  // 设备数据
  const devices = ref([
    { id: 'compressor-1', text: '空压机#1', status: 'normal' },
    { id: 'compressor-2', text: '空压机#2', status: 'normal' },
    { id: 'compressor-3', text: '空压机#3', status: 'maintenance' },
    { id: 'compressor-4', text: '空压机#4', status: 'normal' },
  ]);
  
  // 生产任务数据
  const tasks = ref({
    data: [
      {
        id: 1, 
        text: '订单A-生产', 
        start_date: '2025-07-01 08:00', 
        duration: 8,
        progress: 0.6,
        device: 'compressor-1',
        type: 'production'
      },
      {
        id: 2, 
        text: '订单B-生产', 
        start_date: '2025-07-01 16:00', 
        duration: 8,
        progress: 0.3,
        device: 'compressor-1',
        type: 'production'
      },
      {
        id: 3, 
        text: '定期维护', 
        start_date: '2025-07-02 09:00', 
        duration: 4,
        progress: 0,
        device: 'compressor-3',
        type: 'maintenance'
      }
    ],
    links: []
  });
  
  // 时间范围控制
  const startDate = ref('2025-07-01');
  const endDate = ref('2025-07-07');
  
  // 模态框控制
  const showModal = ref(false);
  const selectedTask = ref(null);
  
  const ganttContainer = ref(null);
  
  onMounted(() => {
    initGantt();
  });
  
  onBeforeUnmount(() => {
    if (gantt.$destroy) {
      gantt.$destroy();
    }
  });
  
  function initGantt() {
    gantt.init(ganttContainer.value);
    
    // 配置时间轴
    gantt.config.scales = [
      { unit: "day", step: 1, format: "%j, %d %M" },
      { unit: "hour", step: 4, format: "%H:%i" }
    ];
    // 设置时间刻度单元格宽度
    gantt.config.scale_height = 50; // 时间轴总高度
    gantt.config.min_column_width = 36; // 最小列宽
    gantt.config.column_width = 40; // 默认列宽
    
    // 自定义任务样式
    gantt.templates.task_class = function(start, end, task) {
      if (task.type === 'maintenance') {
        return 'maintenance-task';
      }
      if (task.progress >= 1) {
        return 'completed-task';
      }
      return '';
    };
    
    // 配置列
    gantt.config.columns = [
      { name: "text", label: "任务名称", tree: true, width: 150 },
      { name: "device", label: "设备", align: "center", template: (obj) => {
        const device = devices.value.find(d => d.id === obj.device);
        return device ? device.text : '';
      }},
      { name: "start_date", label: "开始时间", align: "center", width: 120 },
      { name: "duration", label: "时长(小时)", align: "center", width: 80 },
      { name: "progress", label: "进度", align: "center", template: (obj) => {
        return `<div class='progress-bar'><div style='width:${obj.progress * 100}%'></div></div>`;
      }, width: 100 }
    ];
    
    // 启用拖拽调整
    gantt.config.drag_move = true;
    gantt.config.drag_resize = true;
    
    // 点击事件
    gantt.attachEvent("onTaskClick", function(id, e) {
      const task = gantt.getTask(id);
      openTaskDetail(task);
      return true;
    });
    
    // 初始化数据
    gantt.parse(tasks.value);
    
    // 设置时间范围
    updateTimeRange();
  }
  
  function updateTimeRange() {
    gantt.setWorkTime({ start: new Date(startDate.value), end: new Date(endDate.value) });
    gantt.render();
  }
  
  function addNewTask() {
    const newTask = {
      id: gantt.uid(),
      text: "新任务",
      start_date: gantt.date.start_of(new Date(startDate.value))(gantt.config.duration_unit),
      duration: 4,
      progress: 0,
      device: devices.value[0].id,
      type: "production"
    };
    openTaskDetail(newTask);
  }
  
  function openTaskDetail(task) {
    selectedTask.value = JSON.parse(JSON.stringify(task));
    showModal.value = true;
  }
  
// 添加日期验证函数
const validateTaskDate = (date) => {
  if (date instanceof Date) {
    return !isNaN(date.getTime());
  }
  
  if (typeof date === 'string') {
    // 检查是否为 "YYYY-MM-DD HH:mm" 格式
    if (/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}$/.test(date)) {
      return true;
    }
    // 检查是否能解析为有效日期
    return !isNaN(new Date(date).getTime());
  }
  
  return false;
};

// 修改任务保存处理
const handleSaveTask = (task) => {
  try {
    // 验证日期
    if (!validateTaskDate(task.start_date)) {
      throw new Error('任务开始时间无效');
    }
    
    // 确保任务对象格式正确
    const validatedTask = {
      ...task,
      start_date: task.start_date instanceof Date ? 
        task.start_date : 
        new Date(task.start_date.replace(/-/g, '/'))
    };
    
    if (validatedTask.id) {
      gantt.updateTask(validatedTask.id, validatedTask);
    } else {
      gantt.addTask(validatedTask);
    }
    
  } catch (error) {
    console.error('更新任务失败:', error);
    alert('保存任务失败: ' + error.message);
  }
};
  
  function saveSchedule() {
    const updatedTasks = gantt.serialize();
    console.log("保存排程:", updatedTasks);
    // 这里实际应该调用API保存数据
    alert("排程已保存!");
  }
  </script>
  
  <style scoped>
  .scheduler-container {
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  
  .toolbar {
    padding: 10px;
    background: #f5f5f5;
    display: flex;
    gap: 10px;
    align-items: center;
  }
  
  .gantt-container {
    flex: 1;
    min-height: 0;
  }
  /* 时间刻度样式 */
.gantt-container .gantt_scale_cell {
  font-size: 12px;
  color: #555;
}
  
  /* 自定义任务样式 */
  .maintenance-task {
    background-color: #ffcccc;
    border-color: #ff9999;
  }
  
  .completed-task {
    background-color: #ccffcc;
    border-color: #99cc99;
  }
  
  .progress-bar {
    width: 100%;
    height: 15px;
    background: #eee;
    border-radius: 3px;
    overflow: hidden;
  }
  
  .progress-bar div {
    height: 100%;
    background: #4CAF50;
    transition: width 0.3s;
  }
  
  .time-range {
    margin-left: auto;
    display: flex;
    align-items: center;
    gap: 5px;
  }
  
  .time-range input {
    padding: 5px;
    border: 1px solid #ddd;
    border-radius: 3px;
  }
  </style>