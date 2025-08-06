## CSS3 新特性全面介绍

1、增强了很多选择器
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

2、盒模型与布局：（1）弹性盒模型 (Flexbox)，（2）网格布局 (Grid)；（3）多列布局

3、视觉增强：边框增强，背景增强等：
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
```





