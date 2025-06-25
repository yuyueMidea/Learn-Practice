// src/workers/chunkProcessor.worker.js

function processChunk(chunk) {
    // 这里是具体的数据处理逻辑
    return chunk.map(item => {
      // 模拟耗时计算
      let value = item.value;
      for (let i = 0; i < 2000; i++) {
        value = Math.sqrt(value) * Math.random();
      }
      
      return {
        ...item,
        processedValue: value,
        analyzed: analyzeValue(value)
      };
    });
  }
  
  function analyzeValue(value) {
    let result = 0;
    for (let i = 0; i < 100; i++) {
      result += Math.sin(value) * Math.cos(value);
    }
    return result;
  }
  
  self.onmessage = function(e) {
    if (e.data.type === 'process') {
      const start = performance.now();
      const result = processChunk(e.data.chunk);
      const end = performance.now();
      
      self.postMessage({
        result,
        chunkId: e.data.chunkId,
        processed: e.data.chunk.length,
        timeTaken: end - start
      });
    }
  };