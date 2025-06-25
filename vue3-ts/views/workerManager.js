export class InventoryWorkerManager {
    constructor() {
      this.worker = new Worker(new URL('./inventory.worker.js', import.meta.url), { type: 'module' })
      this.taskCallbacks = new Map()
      this.nextTaskId = 0
      
      this.worker.onmessage = (e) => {
        const { taskId, status, result, error } = e.data
        const callback = this.taskCallbacks.get(taskId)
        
        if (callback) {
          if (status === 'success') {
            callback.resolve(result)
          } else {
            callback.reject(new Error(error))
          }
          this.taskCallbacks.delete(taskId)
        }
      }
    }
  
    executeTask(operation, payload) {
      const taskId = this.nextTaskId++
      return new Promise((resolve, reject) => {
        this.taskCallbacks.set(taskId, { resolve, reject })
        this.worker.postMessage({ taskId, operation, payload })
      })
    }
  
    destroy() {
      this.worker.terminate()
      this.taskCallbacks.clear()
    }
  }