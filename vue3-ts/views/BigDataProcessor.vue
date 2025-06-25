<!-- src/components/BigDataProcessor.vue -->
<script setup>
import { ref } from 'vue';
import { useDataWorker } from '../composables/useDataWorker';

const { result, progress, isProcessing, stats, processData } = useDataWorker();

const dataSize = ref(1000000); // 默认50万条数据
const chunkSize = ref(10000); // 每块处理1万条

// 生成测试数据
function generateTestData(size) {
  return Array.from({ length: size }, (_, i) => ({
    id: i,
    value: Math.random() * 1000,
    category: `Category ${i % 10}`,
    timestamp: Date.now() - Math.floor(Math.random() * 1000000000)
  }));
}

const startProcessing = () => {
  const data = generateTestData(dataSize.value);
  console.log('data10: ', data.slice(0,10))
  processData(data, { chunkSize: chunkSize.value });
};
</script>

<template>
  <div class="big-data-processor">
    <h2>大数据处理演示</h2>
    
    <div class="controls">
      <div class="control-group">
        <label>数据量:</label>
        <input v-model.number="dataSize" type="number" min="1000" max="10000000">
        <span>条</span>
      </div>
      
      <div class="control-group">
        <label>分块大小:</label>
        <input v-model.number="chunkSize" type="number" min="100" max="50000">
        <span>条/块</span>
      </div>
      
      <button 
        @click="startProcessing" 
        :disabled="isProcessing"
      >
        {{ isProcessing ? '处理中...' : '开始处理' }}
      </button>
    </div>
    
    <div v-if="isProcessing" class="progress-container">
      <div class="progress-bar" :style="{ width: `${progress}%` }"></div>
      <div class="progress-text">
        进度: {{ progress }}% | 
        已处理: {{ stats.processedItems.toLocaleString() }}/{{ stats.totalItems.toLocaleString() }} | 
        分块: {{ stats.chunksProcessed }}
      </div>
    </div>
    
    <div v-if="stats.timeTaken > 0" class="stats">
      <h3>处理结果统计</h3>
      <p>总耗时: {{ (stats.timeTaken / 1000).toFixed(2) }} 秒</p>
      <p>处理速度: {{ Math.floor(stats.totalItems / (stats.timeTaken / 1000)).toLocaleString() }} 条/秒</p>
      <p>分块数量: {{ Math.ceil(stats.totalItems / chunkSize) }}</p>
    </div>
    
    <div v-if="result.length > 0" class="result-preview">
      <h3>结果预览 (前10条)</h3>
      <pre>{{ result.slice(0, 10) }}</pre>
    </div>
  </div>
</template>

<style scoped>
.big-data-processor {
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
}

.controls {
  margin: 20px 0;
  padding: 15px;
  background: #f5f5f5;
  border-radius: 8px;
}

.control-group {
  margin-bottom: 10px;
  display: flex;
  align-items: center;
}

.control-group label {
  width: 100px;
  font-weight: bold;
}

.control-group input {
  width: 120px;
  padding: 5px;
  margin: 0 10px;
}

button {
  padding: 8px 16px;
  background: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

button:disabled {
  background: #cccccc;
  cursor: not-allowed;
}

.progress-container {
  margin: 20px 0;
  height: 30px;
  background: #e0e0e0;
  border-radius: 4px;
  overflow: hidden;
  position: relative;
}

.progress-bar {
  height: 100%;
  background: #42b983;
  transition: width 0.3s ease;
}

.progress-text {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  text-align: center;
  line-height: 30px;
  color: #333;
  font-size: 12px;
}

.stats {
  margin: 20px 0;
  padding: 15px;
  background: #f0f8ff;
  border-radius: 8px;
}

.result-preview {
  margin-top: 20px;
  padding: 15px;
  background: #f9f9f9;
  border: 1px solid #eee;
  border-radius: 8px;
  max-height: 300px;
  overflow: auto;
}

pre {
  white-space: pre-wrap;
  font-size: 12px;
}
</style>