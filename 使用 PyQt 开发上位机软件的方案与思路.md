## 使用 PyQt 开发上位机软件的方案与思路
---
**技术选型与架构设计**
1、PyQt 技术栈选择
- 核心框架：PyQt5/PyQt6（推荐PyQt6，长期支持）；
- UI设计工具：Qt Designer（可视化设计）；
- 图标库：PyQtGraph（高性能）、Matplotlib（丰富图表）；
- 通信协议：QSerialPort（串口）、QTcpSocket/QUdpSocket（网络）
- 数据库：SQLite（内置）、QtSql模块；
