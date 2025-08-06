## HTML5 新特性全面介绍

**一、语义化标签**
```
<header>     <!-- 页面或区块的页眉 -->
<nav>        <!-- 导航链接 -->
<main>       <!-- 文档主要内容 -->
<article>    <!-- 独立的内容区块（如博客文章） -->
<section>    <!-- 文档中的节或段 -->
<aside>      <!-- 侧边栏或相关内容 -->
<footer>     <!-- 页面或区块的页脚 -->
<figure>     <!-- 自包含内容（如图表、照片等） -->
<figcaption> <!-- figure 的标题 -->
<mark>       <!-- 突出显示的文本 -->
<time>       <!-- 日期/时间 -->
<progress>   <!-- 进度条 -->
<meter>      <!-- 度量衡（如磁盘使用量） -->
```

**二、多媒体支持**
```
音频和视频
<!-- 音频 -->
<audio controls>
  <source src="audio.mp3" type="audio/mpeg">
  <source src="audio.ogg" type="audio/ogg">
  您的浏览器不支持 audio 元素
</audio>

<!-- 视频 -->
<video width="320" height="240" controls>
  <source src="movie.mp4" type="video/mp4">
  <source src="movie.ogg" type="video/ogg">
  您的浏览器不支持 video 元素
</video>

//canvas绘图
<canvas id="myCanvas" width="200" height="100"></canvas>
<script>
  const canvas = document.getElementById('myCanvas');
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#FF0000';
  ctx.fillRect(0, 0, 150, 75);
</script>

svg支持
<svg width="100" height="100">
  <circle cx="50" cy="50" r="40" stroke="green" stroke-width="4" fill="yellow" />
</svg>
```

**三、表单增强**
```
//新的输入类型
<input type="color">       <!-- 颜色选择器 -->
<input type="date">        <!-- 日期选择器 -->
<input type="datetime-local"> <!-- 本地日期时间 -->
<input type="email">       <!-- 邮箱地址 -->
<input type="month">       <!-- 年月选择 -->
<input type="number">      <!-- 数字输入 -->
<input type="range">       <!-- 滑块控件 -->
<input type="search">      <!-- 搜索框 -->
<input type="tel">         <!-- 电话号码 -->
<input type="time">        <!-- 时间选择 -->
<input type="url">         <!-- URL地址 -->
<input type="week">        <!-- 周选择 -->

//表单属性和元素
<!-- 表单验证 -->
<input type="text" required>
<input type="email" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$">

<!-- 表单元素 -->
<datalist id="browsers">
  <option value="Chrome">
  <option value="Firefox">
  <option value="Safari">
</datalist>
<input list="browsers">

<output name="result" for="a b"></output>
<progress value="70" max="100"></progress>
<meter value="2" min="0" max="10">2 out of 10</meter>
```

**四、API增强**
```
//本地存储----
// localStorage - 长期存储
localStorage.setItem('name', 'John');
const name = localStorage.getItem('name');

// sessionStorage - 会话期间存储
sessionStorage.setItem('sessionName', 'value');

//地理位置API
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(showPosition);
}

function showPosition(position) {
  console.log("纬度: " + position.coords.latitude + 
              " 经度: " + position.coords.longitude);
}
```
