## CSS 属性对重绘(Repaint)和重排(Reflow)的影响

一、重排会重新计算元素的几何属性，影响布局性能；会触发重排的有：

- 盒模型相关属性：width，height，padding，margin，display：none、block等变化；
- 定位和几何属性：position：(absolute/fixed等变化)；top，right，bottom，left；
- 布局相关属性：flex-direction，align-items等；
- 字体和文本相关属性：font-size / font-family / font-weight；line-height / text-align；white-space / overflow (当影响布局时)；
- 其他属性：clientWidth / clientHeight (JS读取时)；offsetWidth / offsetHeight (JS读取时)；scrollTop / scrollLeft (JS修改时)等；

二、重绘只影响视觉效果，不改变布局；会触发重绘但不重排的属性：
- 颜色相关属性：color，background-color等；
- 装饰性属性：border-radius (不改变尺寸时)；box-shadow (不改变尺寸时)，text-shadow等；
- 可见性：visibility (hidden/visible)；opacity (0-1变化)；
- 转换属性：transform (当不影响周围元素布局时)，filter；


三、性能优化建议
- 1、减少重排：
   - 使用 transform 替代 top/left 做动画；
   - 使用 visibility: hidden 替代 display: none 隐藏元素；
   - 批量修改 DOM (使用文档片段或 requestAnimationFrame)；
 
- 2、减少重绘：
   - 避免频繁修改颜色，阴影等视觉属性；
   - 对动画元素使用 will-change 提示浏览器；
   - 使用 opacity 替代 visibility 做淡入淡出；
 
四、现代浏览器的优化

现代浏览器：（1）会批量处理样式变化；（2）对 transform 和 opacity 使用合成层(composite layer)；（3）对连续动画使用硬件加速；通过 Chrome DevTools 的 Performance 面板可以准确分析重绘和重排情况。


