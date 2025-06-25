// 引入分析工具库
// importScripts('https://cdn.jsdelivr.net/npm/lodash@4.17.21/lodash.min.js')

import { sumBy, orderBy, mean } from 'lodash-es' // 使用ES模块版本

// 监听主线程消息
self.onmessage = function(e) {
  const { taskId, operation, payload } = e.data
  
  try {
    let result
    switch(operation) {
      case 'CALCULATE_TURNOVER':
        result = calculateTurnover(payload)
        break
      case 'ABC_CLASSIFICATION':
        result = abcClassification(payload)
        break
      case 'DETECT_ANOMALIES':
        result = detectAnomalies(payload)
        break
      default:
        throw new Error(`未知操作: ${operation}`)
    }
    
    self.postMessage({ taskId, status: 'success', result })
  } catch (error) {
    self.postMessage({ taskId, status: 'error', error: error.message })
  }
}

// 库存周转率计算
function calculateTurnover({ items, periodDays }) {
  const start = Date.now()

  // 大数据处理逻辑
  const totalValue = sumBy(items, 'inventoryValue')
  const avgInventory = totalValue / periodDays
  const turnover = sumBy(items, 'issueValue') / avgInventory
  
  console.log(`calculateTurnover_计算完成，耗时 ${Date.now() - start}ms`)
  return {
    turnoverRate: turnover,
    avgDays: periodDays / turnover
  }
}
  console.log('Worker初始化完成')
// 使用更高效的计算方法
/* function calculateTurnover({ items, periodDays }) {
    console.time('calculateTurnover')
    // 使用定点数累加避免精度问题
    let totalValue = 0
    let issueSum = 0
    const len = items.length
    
    // 使用for循环代替reduce（大数据量下更快）
    for (let i = 0; i < len; i++) {
      totalValue += items[i].inventoryValue
      issueSum += items[i].issueValue
    }
  
    console.timeEnd('calculateTurnover')
    // 添加安全除零处理
    const avgInventory = totalValue / periodDays || 0.01
    return {
      turnoverRate: issueSum / avgInventory,
      avgDays: periodDays / (issueSum / avgInventory || 1)
    }
  } */

// ABC分类计算
function abcClassification({ items }) {
  // 按年度使用价值排序
  const sorted = orderBy(items, 'annualUsageValue', 'desc')
  const totalValue = sumBy(sorted, 'annualUsageValue')
  
  let cumulative = 0
  return sorted.map(item => {
    cumulative += item.annualUsageValue
    return {
      ...item,
      class: cumulative <= totalValue * 0.8 ? 'A' : 
             cumulative <= totalValue * 0.95 ? 'B' : 'C',
      percentage: (item.annualUsageValue / totalValue * 100).toFixed(2)
    }
  })
}

// 异常检测算法
function detectAnomalies({ items }) {
  // 使用Z-score检测异常值
  const values = items.map(i => i.usageRate)
  const mean = mean(values)
  const stdDev = Math.sqrt( sumBy(values, v => Math.pow(v - mean, 2)) / values.length)
  
  return items.filter(item => {
    const z = (item.usageRate - mean) / stdDev
    return Math.abs(z) > 3 // 3个标准差外的视为异常
  })
}