<template>
    <div class="modal-overlay">
      <div class="modal-content">
        <h3>{{ task.id ? '编辑任务' : '新增任务' }}</h3>
        
        <div class="form-group">
          <label>任务名称</label>
          <input v-model="localTask.text" type="text">
        </div>
        
        <div class="form-group">
          <label>设备选择</label>
          <select v-model="localTask.device">
            <option 
              v-for="device in availableDevices" 
              :key="device.id" 
              :value="device.id"
              :disabled="device.status === 'maintenance' && localTask.type !== 'maintenance'"
            >
              {{ device.text }} 
              <span v-if="device.status === 'maintenance'">(维护中)</span>
            </option>
          </select>
        </div>
        
        <div class="form-group">
          <label>任务类型</label>
          <select v-model="localTask.type">
            <option value="production">生产任务</option>
            <option value="maintenance">设备维护</option>
          </select>
        </div>
        
        <div class="form-group">
          <label>开始时间</label>
          <input 
            v-model="formattedStartDate" 
            type="datetime-local"
            @change="handleDateChange"
          >
        </div>
        
        <div class="form-group">
          <label>持续时间(小时)</label>
          <input v-model="localTask.duration" type="number" min="1">
        </div>
        
        <div class="form-group">
          <label>进度</label>
          <input v-model="localTask.progress" type="range" min="0" max="1" step="0.1">
          <span>{{ Math.round(localTask.progress * 100) }}%</span>
        </div>
        
        <div class="modal-actions">
          <button @click="save">保存</button>
          <button @click="$emit('close')">取消</button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, watch } from 'vue';
  
  const props = defineProps({
    task: Object,
    devices: Array
  });
  
  const emit = defineEmits(['save', 'close']);
  
  const localTask = ref({
    id: '',
    text: '',
    start_date: '',
    duration: 4,
    progress: 0,
    device: '',
    type: 'production',
    ...JSON.parse(JSON.stringify(props.task))
  });
  
  // 计算可用设备
  const availableDevices = computed(() => {
    return props.devices.filter(device => {
      if (localTask.value.type === 'maintenance') {
        return device.status === 'maintenance';
      }
      return true;
    });
  });

  // 日期格式转换计算属性
  const formattedStartDate = computed({
    get() {
      if (!localTask.value.start_date) return '';
      
      try {
        let dateObj;
        const dateStr = localTask.value.start_date;
        
        if (dateStr instanceof Date) {
          dateObj = dateStr;
        } else if (typeof dateStr === 'string') {
          // 处理Gantt格式 "YYYY-MM-DD HH:mm" 或 ISO格式
          const normalized = dateStr.includes('T') ? dateStr : dateStr.replace(' ', 'T');
          dateObj = new Date(normalized);
          
          // 验证日期有效性
          if (isNaN(dateObj.getTime())) {
            console.warn('Invalid date:', dateStr);
            return '';
          }
        } else {
          console.warn('Unsupported date format:', dateStr);
          return '';
        }
        
        // 转换为datetime-local需要的格式 yyyy-MM-ddThh:mm
        const pad = num => num.toString().padStart(2, '0');
        return [
          dateObj.getFullYear(),
          pad(dateObj.getMonth() + 1),
          pad(dateObj.getDate())
        ].join('-') + 'T' + [
          pad(dateObj.getHours()),
          pad(dateObj.getMinutes())
        ].join(':');
        
      } catch (error) {
        console.error('Date formatting error:', error);
        return '';
      }
    },
    set(value) {
      // 由handleDateChange处理
    }
  });
  
  // 处理日期变化
  function handleDateChange(e) {
    const value = e.target.value;
    if (!value) return;
    
    try {
      // 将datetime-local值转换为Gantt需要的格式 "YYYY-MM-DD HH:mm"
      const dateObj = new Date(value);
      if (isNaN(dateObj.getTime())) {
        throw new Error('Invalid date');
      }
      
      const pad = num => num.toString().padStart(2, '0');
      localTask.value.start_date = [
        dateObj.getFullYear(),
        pad(dateObj.getMonth() + 1),
        pad(dateObj.getDate())
      ].join('-') + ' ' + [
        pad(dateObj.getHours()),
        pad(dateObj.getMinutes())
      ].join(':');
      
    } catch (error) {
      console.error('Date parsing error:', error);
      // 回退到简单替换（不含时区处理）
      localTask.value.start_date = value.replace('T', ' ').substring(0, 16);
    }
  }
  

// 在组件顶部添加日期格式化函数
const formatForGantt = (date) => {
  if (!date) return null;
  
  // 如果已经是Date对象且有效
  if (date instanceof Date && !isNaN(date.getTime())) {
    return date;
  }
  
  // 如果是字符串
  if (typeof date === 'string') {
    // 尝试解析为Date对象
    let parsedDate;
    
    // 处理Gantt格式 "YYYY-MM-DD HH:mm"
    if (/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}$/.test(date)) {
      const [datePart, timePart] = date.split(' ');
      const [year, month, day] = datePart.split('-').map(Number);
      const [hours, minutes] = timePart.split(':').map(Number);
      parsedDate = new Date(year, month - 1, day, hours, minutes);
    }
    // 处理ISO格式
    else if (date.includes('T')) {
      parsedDate = new Date(date);
    }
    // 其他格式尝试直接解析
    else {
      parsedDate = new Date(date.replace(/-/g, '/'));
    }
    
    if (parsedDate && !isNaN(parsedDate.getTime())) {
      return parsedDate;
    }
  }
  
  return null;
};

// 修改保存方法
const save = () => {
  try {
    // 验证必填字段
    if (!localTask.value.text || !localTask.value.device) {
      throw new Error('任务名称和设备是必填项');
    }
    
    // 转换日期格式
    const formattedDate = formatForGantt(localTask.value.start_date);
    if (!formattedDate) {
      throw new Error('无效的开始时间格式');
    }
    
    // 创建任务对象副本
    const taskToSave = {
      ...localTask.value,
      start_date: formattedDate
    };
    
    emit('save', taskToSave);
    
  } catch (error) {
    console.error('保存任务失败:', error);
    alert(`保存失败: ${error.message}`);
  }
};

  
  // 当任务类型变化时，自动调整设备选择
  watch(() => localTask.value.type, (newType) => {
    if (newType === 'maintenance') {
      const maintenanceDevice = props.devices.find(d => d.status === 'maintenance');
      if (maintenanceDevice) {
        localTask.value.device = maintenanceDevice.id;
      }
    } else {
      // 如果不是维护任务，确保不选择维护中的设备
      if (localTask.value.device) {
        const selectedDevice = props.devices.find(d => d.id === localTask.value.device);
        if (selectedDevice?.status === 'maintenance') {
          const firstAvailable = props.devices.find(d => d.status !== 'maintenance');
          if (firstAvailable) {
            localTask.value.device = firstAvailable.id;
          }
        }
      }
    }
  });
  
  // 初始化设备选择
  if (!localTask.value.device && availableDevices.value.length > 0) {
    localTask.value.device = availableDevices.value[0].id;
  }
  </script>
  
  <style>
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0,0,0,0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }
  
  .modal-content {
    background: white;
    padding: 20px;
    border-radius: 5px;
    width: 500px;
    max-width: 90%;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  }
  
  h3 {
    margin-top: 0;
    color: #333;
    border-bottom: 1px solid #eee;
    padding-bottom: 10px;
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  .form-group label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
    color: #555;
  }
  
  .form-group input[type="text"],
  .form-group input[type="datetime-local"],
  .form-group input[type="number"],
  .form-group select {
    width: 100%;
    padding: 8px 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    box-sizing: border-box;
    font-size: 14px;
  }
  
  .form-group input[type="range"] {
    width: calc(100% - 50px);
    vertical-align: middle;
  }
  
  .modal-actions {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    margin-top: 20px;
    padding-top: 15px;
    border-top: 1px solid #eee;
  }
  
  .modal-actions button {
    padding: 8px 15px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
    transition: background 0.2s;
  }
  
  .modal-actions button:first-child {
    background: #4CAF50;
    color: white;
  }
  
  .modal-actions button:first-child:hover {
    background: #45a049;
  }
  
  .modal-actions button:last-child {
    background: #f5f5f5;
    color: #333;
  }
  
  .modal-actions button:last-child:hover {
    background: #e0e0e0;
  }
  
  /* 错误状态样式 */
  input:invalid {
    border-color: #ff6b6b;
  }
  </style>