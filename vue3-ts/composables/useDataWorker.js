// src/composables/useDataWorker.js
import { ref, onBeforeUnmount } from 'vue';

export function useDataWorker() {
  const worker = ref(null);
  const result = ref([]);
  const progress = ref(0);
  const isProcessing = ref(false);
  const stats = ref({
    totalItems: 0,
    processedItems: 0,
    timeTaken: 0,
    chunksProcessed: 0
  });

  const initWorker = () => {
    worker.value = new Worker(new URL('../workers/dataProcessor.worker.js', import.meta.url), {
      type: 'module'
    });

    worker.value.onmessage = (e) => {
      const { type } = e.data;
      
      switch(type) {
        case 'progress':
          progress.value = Math.round((e.data.processed / e.data.total) * 100);
          stats.value.processedItems += e.data.chunkProcessed;
          stats.value.chunksProcessed = e.data.processed;
          break;
          
        case 'complete':
          result.value = e.data.result;
          isProcessing.value = false;
          stats.value.timeTaken = e.data.timeTaken;
          break;
      }
    };

    worker.value.onerror = (e) => {
      console.error('Worker error:', e);
      isProcessing.value = false;
    };
  };

  const processData = (data, options = {}) => {
    if (!worker.value) initWorker();
    
    isProcessing.value = true;
    result.value = [];
    progress.value = 0;
    stats.value = {
      totalItems: data.length,
      processedItems: 0,
      timeTaken: 0,
      chunksProcessed: 0
    };
    
    worker.value.postMessage({
      type: 'start',
      data,
      chunkSize: options.chunkSize || 10000
    });
  };

  const terminate = () => {
    if (worker.value) {
      worker.value.terminate();
      worker.value = null;
    }
  };

  onBeforeUnmount(terminate);

  return {
    result,
    progress,
    isProcessing,
    stats,
    processData,
    terminate
  };
}