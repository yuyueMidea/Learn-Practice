// src/workers/dataProcessor.worker.js

// 直接定义分块处理函数，不再导入其他Worker
/* const processChunk = (chunk) => {
    // 这里是具体的数据处理逻辑
    return chunk.map(item => {
      // 模拟耗时计算
      let value = item.value;
      for (let i = 0; i < 1000; i++) {
        value = Math.sqrt(value) * Math.random();
      }
      
      return {
        ...item,
        processedValue: value,
        analyzed: analyzeValue(value)
      };
    });
  }; */
  
  function analyzeValue(value) {
    let result = 0;
    for (let i = 0; i < 100; i++) {
      result += Math.sin(value) * Math.cos(value);
    }
    return result;
  }
  
  class DataProcessor {
    constructor() {
      this.activeWorkers = 0;
      this.totalChunks = 0;
      this.results = [];
      this.startTime = 0;
      this.concurrency = navigator.hardwareConcurrency || 4;
    }
  
    process(data, chunkSize = 10000) {
      this.startTime = performance.now();
      this.totalChunks = Math.ceil(data.length / chunkSize);
      this.activeWorkers = 0;
      this.results = [];
      
      // 使用Promise.all管理并发
      const chunkPromises = [];
      const workerChunks = [];
      
      for (let i = 0; i < this.concurrency; i++) {
        workerChunks.push({
          worker: new Worker(new URL('./chunkProcessor.worker.js', import.meta.url), { type: 'module' }),
          busy: false
        });
      }
  
      // 处理每个分块
      for (let i = 0; i < data.length; i += chunkSize) {
        const chunk = data.slice(i, i + chunkSize);
        const chunkId = i / chunkSize;
        
        chunkPromises.push(new Promise((resolve) => {
          this.processChunk(workerChunks, chunk, chunkId, resolve);
        }));
      }
  
      Promise.all(chunkPromises).then(() => {
        const finalResult = this.results.flat();
        self.postMessage({
          type: 'complete',
          result: finalResult,
          timeTaken: performance.now() - this.startTime
        });
      });
    }
  
    processChunk(workers, chunk, chunkId, resolve) {
      const availableWorker = workers.find(w => !w.busy);
      
      if (availableWorker) {
        availableWorker.busy = true;
        this.activeWorkers++;
        
        availableWorker.worker.onmessage = (e) => {
          availableWorker.busy = false;
          this.activeWorkers--;
          
          this.results[chunkId] = e.data.result;
          
          self.postMessage({
            type: 'progress',
            processed: this.results.filter(Boolean).length,
            total: this.totalChunks,
            chunkProcessed: e.data.processed
          });
          
          resolve();
        };
        
        availableWorker.worker.postMessage({
          chunk,
          chunkId,
          type: 'process'
        });
      } else {
        setTimeout(() => this.processChunk(workers, chunk, chunkId, resolve), 100);
      }
    }
  }
  
  const processor = new DataProcessor();
  
  self.onmessage = function(e) {
    if (e.data.type === 'start') {
      processor.process(e.data.data, e.data.chunkSize);
    }
  };