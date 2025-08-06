## CSS3 新特性全面介绍

一、增强了很多选择器
```
/* 匹配具有特定属性的元素 */
[attribute] { ... }

/* 匹配属性值等于特定值的元素 */
[attribute="value"] { ... }

/* 匹配属性值包含特定单词的元素 */
[attribute~="value"] { ... }

/* 匹配属性值以特定字符串开头的元素 */
[attribute^="value"] { ... }

/* 匹配属性值以特定字符串结尾的元素 */
[attribute$="value"] { ... }

/* 匹配属性值中包含特定子串的元素 */
[attribute*="value"] { ... }

/* 选择父元素的第n个子元素 */
:nth-child(n) { ... }

/* 选择父元素的倒数第n个子元素 */
:nth-last-child(n) { ... }

/* 选择父元素中类型为E的第n个子元素 */
:nth-of-type(n) { ... }

/* 选择父元素中类型为E的倒数第n个子元素 */
:nth-last-of-type(n) { ... }

/* 选择父元素的第一个子元素 */
:first-child { ... }

/* 选择父元素的最后一个子元素 */
:last-child { ... }

/* 选择父元素中类型为E的第一个子元素 */
:first-of-type { ... }

/* 选择父元素中类型为E的最后一个子元素 */
:last-of-type { ... }

/* 选择没有任何子元素的元素 */
:empty { ... }

/* 启用状态的元素 */
:enabled { ... }

/* 禁用状态的元素 */
:disabled { ... }

/* 被选中的单选/复选框 */
:checked { ... }

/* 默认选中的元素 */
:default { ... }

/* 输入有效的元素 */
:valid { ... }

/* 输入无效的元素 */
:invalid { ... }

/* 必填字段 */
:required { ... }

/* 可选的字段 */
:optional { ... }
```

二、盒模型与布局：（1）弹性盒模型 (Flexbox)，（2）网格布局 (Grid)；（3）多列布局

三、视觉增强：边框增强，背景增强等：
```
/* 圆角 */
border-radius: 10px; /* 所有角 */
border-radius: 10px 5px 15px 20px; /* 分别设置 */

/* 边框图片 */
border-image: url(border.png) 30 round;

/* 盒子阴影 */
box-shadow: 5px 5px 5px rgba(0,0,0,0.5);
box-shadow: inset 0 0 10px #000;

/* 多重阴影 */
box-shadow: 3px 3px red, -1em 0 0.4em olive;

背景增强
/* 多重背景 */
background: url(bg1.png) top left no-repeat, 
            url(bg2.png) bottom right no-repeat;

/* 背景大小 */
background-size: cover | contain | 100px 100px;

/* 背景原点 */
background-origin: border-box | padding-box | content-box;

/* 背景裁剪 */
background-clip: border-box | padding-box | content-box | text;

渐变
/* 线性渐变 */
background: linear-gradient(to right, red, yellow);

/* 径向渐变 */
background: radial-gradient(circle at center, red, yellow);

/* 重复渐变 */
background: repeating-linear-gradient(45deg, blue, blue 10px, white 10px, white 20px);
```

四、过渡与动画
```
过渡
div {
  transition-property: width, height;
  transition-duration: 1s, 2s;
  transition-timing-function: ease-in, ease-out;
  transition-delay: 0s, 1s;
  
  /* 简写 */
  transition: all 0.5s ease-out;
}

动画
@keyframes example {
  0%   {background-color: red;}
  25%  {background-color: yellow;}
  50%  {background-color: blue;}
  100% {background-color: green;}
}

div {
  animation-name: example;
  animation-duration: 4s;
  animation-timing-function: ease-in-out;
  animation-delay: 2s;
  animation-iteration-count: infinite;
  animation-direction: alternate;
  
  /* 简写 */
  animation: example 4s ease-in-out 2s infinite alternate;
}
```

五、2D/3D变换
```
transform: translate(50px, 100px); /* 移动 */
transform: rotate(20deg); /* 旋转 */
transform: scale(2, 3); /* 缩放 */
transform: skew(20deg, 10deg); /* 倾斜 */
transform: matrix(1, -0.3, 0, 1, 0, 0); /* 矩阵变换 */

3D变换
transform: rotateX(120deg);
transform: rotateY(130deg);
transform: rotateZ(90deg);
transform: translate3d(12px, 50%, 3em);
transform: perspective(500px) rotateY(45deg);
```

六、字体与排版：
```
文本效果
/* 文本阴影 */
text-shadow: 2px 2px 5px red;

/* 文本溢出 */
text-overflow: ellipsis | clip;

/* 文字换行 */
word-wrap: break-word;
word-break: break-all;

/* 多列文本 */
column-count: 3;
column-gap: 40px;
column-rule: 1px solid lightblue;
```

七、媒体查询与响应式设计:
```
/* 设备宽度小于600px时的样式 */
@media screen and (max-width: 600px) {
  body {
    background-color: lightblue;
  }
}

/* 打印样式 */
@media print {
  body {
    font-size: 12pt;
    color: black;
  }
}

/* 设备方向 */
@media (orientation: landscape) {
  body {
    flex-direction: row;
  }
}
```




