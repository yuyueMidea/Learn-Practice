当然。纯 CSS 做加载动画是非常值得掌握的一类技巧，因为它能很好地训练你对 **`@keyframes`、`transform`、`opacity`、`border`、`box-shadow`、伪元素以及动画时序** 的理解。

下面直接给你几个可以复制运行的完整示例，而且我会从简单到稍微复杂一点。

---

## 1. 经典旋转 Loading

最常见，也最实用。

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<title>CSS Loading 1</title>

<style>

body {
    margin: 0;
    height: 100vh;

    display: flex;
    justify-content: center;
    align-items: center;

    background: #f5f5f5;
}

.loader {
    width: 50px;
    height: 50px;

    border: 5px solid #ddd;
    border-top-color: #333;

    border-radius: 50%;

    animation: spin 1s linear infinite;
}

@keyframes spin {
    to {
        transform: rotate(360deg);
    }
}

</style>
</head>

<body>

<div class="loader"></div>

</body>
</html>
```

核心其实就三句话：

```css
border: 5px solid #ddd;
border-top-color: #333;
border-radius: 50%;
```

再：

```css
animation: spin 1s linear infinite;
```

---

# 2. 三个小圆点跳动

非常适合聊天窗口、AI 对话框。

视觉大概：

```text
●  ●  ●
↕  ↕  ↕
```

代码：

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">

<style>

body {
    margin: 0;
    height: 100vh;

    display: flex;
    justify-content: center;
    align-items: center;
}

.loading {
    display: flex;
    gap: 8px;
}

.dot {
    width: 12px;
    height: 12px;

    border-radius: 50%;
    background: #333;

    animation: bounce 0.8s infinite ease-in-out;
}

.dot:nth-child(2) {
    animation-delay: 0.1s;
}

.dot:nth-child(3) {
    animation-delay: 0.2s;
}

@keyframes bounce {

    0%,
    80%,
    100% {
        transform: translateY(0);
    }

    40% {
        transform: translateY(-12px);
    }

}

</style>
</head>

<body>

<div class="loading">
    <div class="dot"></div>
    <div class="dot"></div>
    <div class="dot"></div>
</div>

</body>
</html>
```

这里特别值得理解：

```css
animation-delay
```

三个元素：

```text
A → B → C
```

依次延迟：

```text
0s
0.1s
0.2s
```

于是静态元素就产生了“连续运动”的感觉。

---

# 3. 三个柱状条

非常适合音频、音乐、语音识别之类的界面。

```text
█
███
█████
██
████
```

代码：

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">

<style>

body {
    margin: 0;
    height: 100vh;

    display: flex;
    justify-content: center;
    align-items: center;
}

.loader {
    display: flex;
    align-items: center;
    gap: 6px;
}

.bar {
    width: 6px;
    height: 30px;

    background: #333;

    animation: wave 1s ease-in-out infinite;
}

.bar:nth-child(2) {
    animation-delay: 0.1s;
}

.bar:nth-child(3) {
    animation-delay: 0.2s;
}

.bar:nth-child(4) {
    animation-delay: 0.3s;
}

.bar:nth-child(5) {
    animation-delay: 0.4s;
}

@keyframes wave {

    0%,
    100% {
        transform: scaleY(0.4);
    }

    50% {
        transform: scaleY(1.5);
    }

}

</style>
</head>

<body>

<div class="loader">
    <div class="bar"></div>
    <div class="bar"></div>
    <div class="bar"></div>
    <div class="bar"></div>
    <div class="bar"></div>
</div>

</body>
</html>
```

这里用到了：

```css
transform: scaleY()
```

所以实际上并没有真的改变高度，而是在视觉上进行缩放。

---

# 4. 旋转的小方块

这种比较有科技感。

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>

<meta charset="UTF-8">

<style>

body {
    margin: 0;
    height: 100vh;

    display: flex;
    align-items: center;
    justify-content: center;
}

.loader {
    position: relative;

    width: 60px;
    height: 60px;
}

.square {
    position: absolute;

    width: 18px;
    height: 18px;

    background: #333;

    top: 21px;
    left: 21px;

    animation: rotateSquare 1.5s ease-in-out infinite;
}

@keyframes rotateSquare {

    0% {
        transform:
            rotate(0deg)
            translateX(20px)
            rotate(0deg);
    }

    100% {
        transform:
            rotate(360deg)
            translateX(20px)
            rotate(-360deg);
    }

}

</style>

</head>

<body>

<div class="loader">
    <div class="square"></div>
</div>

</body>
</html>
```

这个例子值得注意：

```css
rotate()
translateX()
rotate()
```

组合起来可以让一个元素：

> 围绕中心旋转，同时保持自身方向。

---

# 5. 双圆环旋转

这个非常适合现代 Web UI。

```html
<!DOCTYPE html>
<html lang="zh-CN">

<head>

<meta charset="UTF-8">

<style>

body {
    margin: 0;
    height: 100vh;

    display: flex;
    justify-content: center;
    align-items: center;

    background: #111;
}

.loader {
    width: 60px;
    height: 60px;

    position: relative;
}

.loader::before,
.loader::after {

    content: "";

    position: absolute;

    inset: 0;

    border-radius: 50%;

    border: 4px solid transparent;

}

.loader::before {

    border-top-color: #fff;

    animation:
        spin 1s linear infinite;

}

.loader::after {

    border-bottom-color: #888;

    animation:
        spinReverse 1s linear infinite;

}

@keyframes spin {

    to {
        transform: rotate(360deg);
    }

}

@keyframes spinReverse {

    to {
        transform: rotate(-360deg);
    }

}

</style>

</head>

<body>

<div class="loader"></div>

</body>
</html>
```

这里第一次出现一个非常重要的技巧：

```css
::before
::after
```

一个元素实际上可以变成：

```text
DOM
├── 本体
├── ::before
└── ::after
```

所以一个 `<div>` 就能承载三个视觉层。

---

# 6. Pulsing Loader —— 呼吸灯

非常简单，但是效果很舒服。

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>

<meta charset="UTF-8">

<style>

body {
    margin: 0;
    height: 100vh;

    display: flex;
    justify-content: center;
    align-items: center;
}

.loader {

    width: 20px;
    height: 20px;

    border-radius: 50%;

    background: #333;

    animation:
        pulse 1s ease-in-out infinite;

}

@keyframes pulse {

    0% {

        transform: scale(1);

        opacity: 1;

        box-shadow:
            0 0 0 0 rgba(0, 0, 0, 0.3);

    }

    50% {

        transform: scale(1.3);

        opacity: 0.6;

        box-shadow:
            0 0 0 15px rgba(0, 0, 0, 0);

    }

    100% {

        transform: scale(1);

        opacity: 1;

        box-shadow:
            0 0 0 0 rgba(0, 0, 0, 0);

    }

}

</style>

</head>

<body>

<div class="loader"></div>

</body>
</html>
```

这个例子非常值得研究，因为：

```css
transform
+
opacity
+
box-shadow
```

三个东西同时变化。

所以得到：

```text
      ●
     ↗ ↖
   ↗     ↖
  ●       ●
   ↘     ↙
     ↘ ↙
      ●
```

类似“脉冲波”。

---

# 7. 点阵旋转 Loader

这个就开始有点漂亮了。

```html
<!DOCTYPE html>
<html lang="zh-CN">

<head>

<meta charset="UTF-8">

<style>

body {
    margin: 0;

    height: 100vh;

    display: flex;
    justify-content: center;
    align-items: center;
}

.loader {

    width: 40px;
    height: 40px;

    position: relative;

}

.dot {

    position: absolute;

    width: 6px;
    height: 6px;

    background: #333;

    border-radius: 50%;

    top: 17px;
    left: 17px;

    transform-origin: 3px 3px;

}

.dot:nth-child(1) {
    transform:
        rotate(0deg)
        translateX(15px);
}

.dot:nth-child(2) {
    transform:
        rotate(45deg)
        translateX(15px);
}

.dot:nth-child(3) {
    transform:
        rotate(90deg)
        translateX(15px);
}

.dot:nth-child(4) {
    transform:
        rotate(135deg)
        translateX(15px);
}

.dot:nth-child(5) {
    transform:
        rotate(180deg)
        translateX(15px);
}

.dot:nth-child(6) {
    transform:
        rotate(225deg)
        translateX(15px);
}

.dot:nth-child(7) {
    transform:
        rotate(270deg)
        translateX(15px);
}

.dot:nth-child(8) {
    transform:
        rotate(315deg)
        translateX(15px);
}

.loader {
    animation:
        spin 1.5s linear infinite;
}

@keyframes spin {

    to {
        transform: rotate(360deg);
    }

}

</style>

</head>

<body>

<div class="loader">

    <div class="dot"></div>
    <div class="dot"></div>
    <div class="dot"></div>
    <div class="dot"></div>

    <div class="dot"></div>
    <div class="dot"></div>
    <div class="dot"></div>
    <div class="dot"></div>

</div>

</body>
</html>
```

它的核心思想是：

```text
        ●
    ●       ●

  ●     ○     ●

    ●       ●
        ●
```

首先通过：

```css
rotate()
translateX()
```

把 8 个点摆成圆。

然后让整体：

```css
rotate(360deg)
```

---

# 8. 一个更加“黑科技”的：box-shadow Loading

刚好接上你上一条问的 `box-shadow`。

HTML：

```html
<div class="loader"></div>
```

CSS：

```css
body {
    margin: 0;
    height: 100vh;

    display: flex;
    justify-content: center;
    align-items: center;
}

.loader {

    width: 10px;
    height: 10px;

    border-radius: 50%;

    background: #333;

    box-shadow:
        20px 0 #333,
        40px 0 #333;

    animation: dots 1s infinite;
}

@keyframes dots {

    0% {
        box-shadow:
            20px 0 #333,
            40px 0 #333;
    }

    33% {
        box-shadow:
            20px 0 #999,
            40px 0 #333;
    }

    66% {
        box-shadow:
            20px 0 #333,
            40px 0 #999;
    }

    100% {
        box-shadow:
            20px 0 #333,
            40px 0 #333;
    }

}
```

这就体现出上一条内容的意义了：

```text
一个 DOM
  ↓
本体
  +
box-shadow
  ↓
三个圆
```

所以：

> 一个元素就能模拟多个 Loading 元素。

---

# 9. CSS 环形进度 Loader

这个更偏实际项目。

```html
<!DOCTYPE html>
<html lang="zh-CN">

<head>

<meta charset="UTF-8">

<style>

body {
    margin: 0;
    height: 100vh;

    display: flex;
    justify-content: center;
    align-items: center;
}

.loader {

    width: 70px;
    height: 70px;

    border-radius: 50%;

    background:
        conic-gradient(
            #333 0deg,
            #333 250deg,
            #ddd 250deg,
            #ddd 360deg
        );

    position: relative;

    animation: progress 2s linear infinite;

}

.loader::after {

    content: "";

    position: absolute;

    width: 54px;
    height: 54px;

    background: white;

    border-radius: 50%;

    top: 8px;
    left: 8px;

}

@keyframes progress {

    0% {
        background:
            conic-gradient(
                #333 0deg,
                #333 0deg,
                #ddd 0deg
            );
    }

    100% {
        background:
            conic-gradient(
                #333 360deg,
                #333 360deg,
                #ddd 360deg
            );
    }

}

</style>

</head>

<body>

<div class="loader"></div>

</body>
</html>
```

这里开始进入另一个重要方向：

```css
conic-gradient()
```

它其实非常适合：

* 环形进度条
* 饼图
* 仪表盘
* 彩色加载环
* 数据可视化

---

# 10. Skeleton Loading

真实项目中更加常见。

比如一个正在加载的 Card：

```html
<div class="card">

    <div class="skeleton avatar"></div>

    <div class="content">

        <div class="skeleton title"></div>

        <div class="skeleton text"></div>

        <div class="skeleton text short"></div>

    </div>

</div>
```

CSS：

```css
body {
    margin: 0;

    height: 100vh;

    display: flex;
    justify-content: center;
    align-items: center;

    background: #f5f5f5;
}

.card {

    width: 400px;

    display: flex;

    gap: 20px;

    padding: 20px;

    background: white;

    border-radius: 12px;

}

.skeleton {

    background:
        linear-gradient(
            90deg,
            #eeeeee 25%,
            #dddddd 50%,
            #eeeeee 75%
        );

    background-size: 200% 100%;

    animation:
        skeleton 1.5s infinite;

}

.avatar {

    width: 60px;
    height: 60px;

    border-radius: 50%;

}

.content {

    flex: 1;

}

.title {

    width: 60%;

    height: 20px;

    margin-bottom: 15px;

    border-radius: 5px;

}

.text {

    width: 100%;

    height: 14px;

    margin-bottom: 10px;

    border-radius: 5px;

}

.short {

    width: 70%;

}

@keyframes skeleton {

    from {

        background-position:
            200% 0;

    }

    to {

        background-position:
            -200% 0;

    }

}
```

这个动画本质：

```text
████████████████
     →→→
      光带
████████████████
```

这就是现在大量网站使用的：

> **Shimmer Skeleton Loading**

---

# 11. 从这些例子可以总结出 CSS Loading 的几大套路

其实没你想象得那么多。

### 第一类：旋转

```css
transform: rotate();
```

对应：

```text
◜ ◝
◟ ◞
```

典型：

```text
border spinner
ring loader
circle loader
```

---

### 第二类：缩放

```css
transform: scale();
```

对应：

```text
●
 ↓
⭕
 ↓
●
```

典型：

```text
pulse
breathing
ripple
```

---

### 第三类：位移

```css
transform:
    translateY();
```

或者：

```css
translateX();
```

对应：

```text
●
↓
●
↓
●
```

典型：

```text
跳动小球
进度动画
移动点
```

---

### 第四类：透明度

```css
opacity
```

例如：

```text
● ○ ○
○ ● ○
○ ○ ●
```

通过：

```css
opacity: 0.2;
opacity: 1;
```

制造运动感。

---

### 第五类：颜色变化

```css
background
border-color
box-shadow
```

比如：

```text
● ○ ○
● ● ○
● ● ●
```

---

### 第六类：渐变移动

例如：

```css
linear-gradient()
```

然后：

```css
background-position
```

产生：

```text
████████
  →→→
████████
```

这就是：

```text
Skeleton
Shimmer
Progress
```

---

# 12. 一个非常关键的高级思想：Loading 本质上是“状态动画”

你会发现所有 Loading 最终都可以抽象成：

```text
状态 A
 ↓
状态 B
 ↓
状态 C
 ↓
状态 A
```

例如旋转：

```text
0°
 ↓
90°
 ↓
180°
 ↓
270°
 ↓
360°
```

小球：

```text
Y = 0
 ↓
Y = -10
 ↓
Y = 0
```

透明度：

```text
1
 ↓
0.3
 ↓
1
```

所以 CSS 动画真正的核心并不是：

> “会写几个 Loading。”

而是理解：

```text
初始状态
↓
关键帧
↓
插值
↓
时间函数
↓
重复
```

也就是：

```css
@keyframes
animation-duration
animation-delay
animation-timing-function
animation-iteration-count
animation-direction
```

这一整套东西。

---

# 13. 特别值得你继续研究的 5 个方向

如果你想把 CSS 动画真正玩熟，我建议下一步重点研究：

**`transform` 的组合动画**

```css
translate
rotate
scale
skew
```

**`animation-timing-function`**

尤其：

```css
linear
ease
ease-in
ease-out
ease-in-out
cubic-bezier()
steps()
```

其中 `steps()` 非常适合做：

```text
打字机
像素动画
Sprite Animation
数字跳变
```

**CSS 伪元素**

```css
::before
::after
```

一个 DOM 就能产生多个动画层。

**CSS Gradient 动画**

```css
linear-gradient
radial-gradient
conic-gradient
```

可以做：

```text
光效
扫描
Shimmer
环形进度
彩虹 loading
```

还有非常值得结合你上一条 `box-shadow` 的：

**`box-shadow + animation`**

这实际上能做出大量非常有意思的：

```text
粒子
点阵
像素
霓虹灯
发光
波纹
DNA
星空
```

式加载动画。

其中 `steps()`、`cubic-bezier()`、`pseudo-element` 和 `box-shadow` 结合起来以后，CSS 动画会一下子从“几个简单 Loading”变成一个很完整的小型动画系统。
