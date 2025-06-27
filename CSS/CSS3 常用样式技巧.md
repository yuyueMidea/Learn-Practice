## CSS3 常用样式技巧

1、盒子水平垂直居中
- （1）flex布局
```
.container {
  display: flex;
  justify-content: center; /* 水平居中 */
  align-items: center;     /* 垂直居中 */
  height: 100vh;           /* 需要设置容器高度 */
}
```
- （2）绝对定位 + transform
```
.box {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
```

2、文本渐变色
- （1）线性渐变
```
.text-gradient {
  background: linear-gradient(to right, #ff8a00, #e52e71);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
```
- (2)径向渐变
```
.text-gradient {
  background: radial-gradient(circle, #ff8a00, #e52e71);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
```






