<template>
    <div class="inventory_wrapper">
        <div class="header_wrapper">
            <span>数据长度</span><el-input v-model="dataLen" style="width:200px;margin: 0 11px;"></el-input>
            <el-button @click="runAnalysis" :loading="isCalculating">
                执行库存分析
            </el-button>
        </div>
      
      <div v-if="analysisResult">
        <h3>周转率: {{ analysisResult.turnoverRate.toFixed(2) }}</h3>
        <h3>平均周转天数: {{ analysisResult.avgDays.toFixed(1) }}天</h3>
      </div>
      <div class="table_wrapper" v-loading="isClassifying">
          <!-- <el-table :data="abcItems" height="400" v-loading="isClassifying">
            <el-table-column prop="name" label="物料名称" width="180"/>
            <el-table-column prop="class" label="分类" width="80">
              <template #default="{row}">
                <el-tag :type="row.class === 'A' ? 'danger' : row.class === 'B' ? 'warning' : 'success'">
                  {{ row.class }}
                </el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="percentage" label="价值占比%" width="120"/>
          </el-table> -->
            <vxe-table ref="tableRef" :data="abcItems"
                border
                show-overflow
                height="400"
                :cell-config="{height: 30}"
                :scroll-y="{ enabled: true, gt: 20 }"
                :scroll-x="{ enabled: true, gt: 40 }">
                <vxe-column type="seq" title="序号" width="60"></vxe-column>
                <vxe-column field="name" title="物料名称"></vxe-column>
                <vxe-column field="class" title="分类" sortable></vxe-column>
                <vxe-column field="percentage" title="价值占比%" ></vxe-column>
            </vxe-table>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, onUnmounted } from 'vue'
import { InventoryWorkerManager } from './workerManager'
import { ElMessage } from 'element-plus'
//   import { InventoryWorkerManager } from './workerManager'

  const dataLen = ref(10000);
  const workerManager = ref(null)
  const isCalculating = ref(false)
  const isClassifying = ref(false)
  const analysisResult = ref(null)
  const abcItems = ref([])
  
  onMounted(() => {
    workerManager.value = new InventoryWorkerManager()
  })
  
  onUnmounted(() => {
    workerManager.value?.destroy()
  })
  
  const runAnalysis = async () => {
    try {
      isCalculating.value = true
      isClassifying.value = true
      
      // 模拟从API获取大数据集
      const largeInventoryData = await fetchInventoryData()
      console.time('abcClassification')
      // 并行执行多个分析任务
      const [turnover, classification] = await Promise.all([
        workerManager.value.executeTask('CALCULATE_TURNOVER', {
          items: largeInventoryData,
          periodDays: 365
        }),
        workerManager.value.executeTask('ABC_CLASSIFICATION', {
          items: largeInventoryData
        })
      ])
      console.timeEnd('abcClassification')
      
      analysisResult.value = turnover
      abcItems.value = classification
      
    } catch (error) {
      console.error('分析失败:', error)
      ElMessage.error('库存分析失败: ' + error.message)
    } finally {
      isCalculating.value = false
      isClassifying.value = false
    }
  }
  
  async function fetchInventoryData() {
    // 实际项目中替换为真实API调用
    return new Promise(resolve => {
      setTimeout(() => {
        // 生成10万条测试数据
        const data = Array.from({ length: dataLen.value }, (_, i) => ({
          id: `mat-${i}`,
          name: `物料${i}`,
          inventoryValue: Math.random() * 10000,
          issueValue: Math.random() * 8000,
          annualUsageValue: Math.random() * 50000,
          usageRate: Math.random()
        }))
        resolve(data)
      }, 300)
    })
  }
  </script>

<style scoped>
.inventory_wrapper {
    padding: 5px;
}
.header_wrapper {
    margin: 0 auto;
    padding: 11px;
    border: 1px solid #ccc;
    max-width: 500px;
}
.table_wrapper {
    margin: 0 auto;
    padding: 11px;
    border: 1px solid #ccc;
    max-width: 500px;
}
</style>