**Python 多进程中更新 UI 的解决方案**

一、基于队列(Queue)的通信方案: 使用 multiprocessing.Queue
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

三、使用进程间通信(IPC)的高级方案: 结合 multiprocessing.Manager

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
