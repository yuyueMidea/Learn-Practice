**Python 多进程中更新 UI 的解决方案**

1、基于队列(Queue)的通信方案: 使用 multiprocessing.Queue
```
from multiprocessing import Process, Queue
from PyQt5.QtWidgets import QApplication, QLabel, QVBoxLayout, QWidget
from PyQt5.QtCore import QTimer
import sys

def worker(queue):
    """工作进程函数"""
    for i in range(1, 6):
        queue.put(f"Progress: {i}/5")
        time.sleep(1)

class MainWindow(QWidget):
    def __init__(self):
        super().__init__()
        self.queue = Queue()
        self.init_ui()
        self.start_worker()
        
    def init_ui(self):
        self.label = QLabel("Waiting for updates...")
        layout = QVBoxLayout()
        layout.addWidget(self.label)
        self.setLayout(layout)
        
        # 设置定时器检查队列
        self.timer = QTimer()
        self.timer.timeout.connect(self.check_queue)
        self.timer.start(100)  # 每100ms检查一次
        
    def start_worker(self):
        self.process = Process(target=worker, args=(self.queue,))
        self.process.start()
        
    def check_queue(self):
        if not self.queue.empty():
            data = self.queue.get()
            self.label.setText(data)  # 在主线程更新UI
            
    def closeEvent(self, event):
        self.process.terminate()
        event.accept()

if __name__ == '__main__':
    app = QApplication(sys.argv)
    window = MainWindow()
    window.show()
    sys.exit(app.exec_())
```

2、使用进程间通信(IPC)的高级方案: 结合 multiprocessing.Manager

```
from multiprocessing import Process, Manager
from PyQt5.QtWidgets import QApplication, QLabel, QVBoxLayout, QWidget
from PyQt5.QtCore import QTimer
import sys

def worker(shared_dict):
    for i in range(1, 6):
        shared_dict['progress'] = f"Progress: {i}/5"
        time.sleep(1)

class MainWindow(QWidget):
    def __init__(self):
        super().__init__()
        self.manager = Manager()
        self.shared_dict = self.manager.dict()
        self.init_ui()
        self.start_worker()
        
    def init_ui(self):
        self.label = QLabel("Waiting for updates...")
        layout = QVBoxLayout()
        layout.addWidget(self.label)
        self.setLayout(layout)
        
        self.timer = QTimer()
        self.timer.timeout.connect(self.update_ui)
        self.timer.start(100)
        
    def start_worker(self):
        self.process = Process(target=worker, args=(self.shared_dict,))
        self.process.start()
        
    def update_ui(self):
        if 'progress' in self.shared_dict:
            self.label.setText(self.shared_dict['progress'])
            
    def closeEvent(self, event):
        self.process.terminate()
        event.accept()

if __name__ == '__main__':
    app = QApplication(sys.argv)
    window = MainWindow()
    window.show()
    sys.exit(app.exec_())
```

总结：跨进程 UI 更新的最佳实践：
- 避免直接跨进程操作UI组件：所有UI更新必须发生在主线程；
- 合理设置通信频率：高频更新可能导致 UI 卡顿，考虑数据聚合；
- 错误处理：确保子进程异常能被捕获并反馈到 UI；
- 资源清理：在窗口关闭时正确终止子进程
- 性能优化：对于大量数据，考虑共享内存 (multiprocessing.Value/Array)；使用批量更新而非单个更新；对非关键更新进行节流(throttle)；
- 跨平台注意事项：Windows 平台需要 if __name__ == '__main__': 保护； macOS 可能需要特殊处理进程启动方式；



