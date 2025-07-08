import sys
import vlc
from PyQt5.QtWidgets import (QApplication, QWidget, QVBoxLayout, QHBoxLayout,
                             QLabel, QLineEdit, QPushButton, QSlider, QSizePolicy)
from PyQt5.QtCore import Qt, QTimer

# # 设置VLC库路径（根据实际情况修改）
# VLC_PATH = r"C:\Program Files\VideoLAN\VLC"
# if sys.platform.startswith('win'):
#     os.add_dll_directory(VLC_PATH)

class VLCPlayer(QWidget):
    def __init__(self):
        super().__init__()
        self.setWindowTitle("VLC网络播放器 - 优化版")
        self.resize(1200, 800)  # 更大的初始窗口尺寸
        
        # VLC初始化
        # 初始化VLC实例（禁用有问题的渲染后端）
        """ vlc_args = [
            "--no-d3d11",       # 禁用Direct3D11
            "--no-d3d9",        # 禁用Direct3D9
            "--vout=direct2d",  # 使用Direct2D
            "--no-osd",         # 禁用OSD
            "--no-stats",       # 禁用统计
        ] """
        # self.instance = vlc.Instance(vlc_args)
        self.instance = vlc.Instance()
        self.media_player = self.instance.media_player_new()
        
        # 界面元素
        self.setup_ui()
        
        # 定时器
        self.timer = QTimer(self)
        self.timer.setInterval(200)
        self.timer.timeout.connect(self.update_ui)
    
    def setup_ui(self):
        """设置优化后的用户界面"""
        main_layout = QVBoxLayout()
        main_layout.setContentsMargins(5, 5, 5, 5)  # 减少边距
        main_layout.setSpacing(5)
        
        # 顶部控制栏（一行紧凑布局）
        control_bar = QHBoxLayout()
        control_bar.setSpacing(10)
        
        # URL输入框（自动扩展宽度）
        self.url_input = QLineEdit()
        self.url_input.setPlaceholderText("输入视频URL...")
        self.url_input.setText("http://api.yujn.cn/api/zzxjj.php?type=video&rand=")
        self.url_input.setSizePolicy(QSizePolicy.Expanding, QSizePolicy.Fixed)
        
        # 紧凑按钮组
        button_layout = QHBoxLayout()
        button_layout.setSpacing(5)
        
        self.load_button = QPushButton("加载")
        self.load_button.setFixedWidth(60)
        self.load_button.clicked.connect(self.load_media)
        
        self.play_button = QPushButton("▶")
        self.play_button.setFixedWidth(40)
        self.play_button.clicked.connect(self.toggle_play)
        self.play_button.setEnabled(False)
        
        self.stop_button = QPushButton("■")
        self.stop_button.setFixedWidth(40)
        self.stop_button.clicked.connect(self.stop)
        self.stop_button.setEnabled(False)
        
        # 音量控制（紧凑样式）
        self.volume_slider = QSlider(Qt.Horizontal)
        self.volume_slider.setRange(0, 100)
        self.volume_slider.setValue(70)
        self.volume_slider.setFixedWidth(100)
        self.volume_slider.valueChanged.connect(self.set_volume)
        
        # 组装控制栏
        button_layout.addWidget(self.load_button)
        button_layout.addWidget(self.play_button)
        button_layout.addWidget(self.stop_button)
        button_layout.addWidget(QLabel("音量:"))
        button_layout.addWidget(self.volume_slider)
        
        control_bar.addWidget(self.url_input)
        control_bar.addLayout(button_layout)
        
        # 视频显示区域（最大化）
        self.video_frame = QLabel()
        self.video_frame.setAlignment(Qt.AlignCenter)
        self.video_frame.setStyleSheet("background-color: black;")
        self.video_frame.setSizePolicy(QSizePolicy.Expanding, QSizePolicy.Expanding)
        
        # 进度条和时间显示
        bottom_bar = QHBoxLayout()
        
        self.position_slider = QSlider(Qt.Horizontal)
        self.position_slider.setRange(0, 1000)
        self.position_slider.sliderMoved.connect(self.set_position)
        
        self.time_label = QLabel("00:00:00 / 00:00:00")
        self.time_label.setFixedWidth(150)
        self.time_label.setAlignment(Qt.AlignRight | Qt.AlignVCenter)
        
        bottom_bar.addWidget(self.position_slider)
        bottom_bar.addWidget(self.time_label)
        
        # 组装主界面
        main_layout.addLayout(control_bar)
        main_layout.addWidget(self.video_frame, 1)  # 视频区域占据剩余所有空间
        main_layout.addLayout(bottom_bar)
        
        self.setLayout(main_layout)
        
        # 设置视频输出窗口
        if sys.platform.startswith('linux'):
            self.media_player.set_xwindow(int(self.video_frame.winId()))
        elif sys.platform == "win32":
            self.media_player.set_hwnd(int(self.video_frame.winId()))
        elif sys.platform == "darwin":
            self.media_player.set_nsobject(int(self.video_frame.winId()))
    
    # [保持原有的功能方法不变...]
    def load_media(self):
        """加载媒体文件"""
        url = self.url_input.text().strip()
        if not url:
            return
        
        media = self.instance.media_new(url)
        self.media_player.set_media(media)
        
        self.play_button.setEnabled(True)
        self.stop_button.setEnabled(True)
        self.toggle_play()
    
    def toggle_play(self):
        if self.media_player.is_playing():
            self.media_player.pause()
            self.play_button.setText("▶")
        else:
            if self.media_player.play() == -1:
                return
            self.play_button.setText("❚❚")
            self.timer.start()
            self.media_player.audio_set_volume(self.volume_slider.value())
    
    def stop(self):
        self.media_player.stop()
        self.play_button.setText("▶")
        self.timer.stop()
        self.time_label.setText("00:00:00 / 00:00:00")
        self.position_slider.setValue(0)
    
    def set_position(self, position):
        if self.media_player.is_playing():
            self.media_player.set_position(position / 1000.0)
    
    def set_volume(self, volume):
        self.media_player.audio_set_volume(volume)
    
    def update_ui(self):
        if not self.media_player.is_playing():
            return
        
        position = int(self.media_player.get_position() * 1000)
        self.position_slider.setValue(position)
        
        current_time = self.format_time(self.media_player.get_time())
        total_time = self.format_time(self.media_player.get_length())
        self.time_label.setText(f"{current_time} / {total_time}")
    
    def format_time(self, ms):
        seconds = ms // 1000
        hours = seconds // 3600
        seconds %= 3600
        minutes = seconds // 60
        seconds %= 60
        return f"{hours:02d}:{minutes:02d}:{seconds:02d}"
    
    def closeEvent(self, event):
        self.media_player.stop()
        self.timer.stop()
        event.accept()

if __name__ == "__main__":
    app = QApplication(sys.argv)
    player = VLCPlayer()
    player.show()
    sys.exit(app.exec_())