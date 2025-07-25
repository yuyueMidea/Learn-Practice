有一些问题跳过，题目序号没规则。

1、什么是重绘？什么是回流？如何减少回流？
- 重绘（Repaint）是指当元素样式发生变化，但不影响布局的情况下， 浏览器重新绘制元素的过程，例如修改元素的背景色、字体颜色等；
- 回流（Reflow）是指 元素的布局属性发生变化，需要重新计算元素在界面中的布局和位置，浏览器重新进行布局的过程；
- 回流的成本比重绘高得多，因为它涉及到重新计算元素的几何属性和页面布局；
- 如何减少回流：
   - 使用CSS动画替代JavaScript动画；使用CSS的transform的 opacity属性来创建动画效果，而不是改变元素的布局属性如宽高等。
   - 避免频繁操作影响布局的样式属性：当需要对元素进行多次样式修改时，可以考虑将这些修改合并为一次操作，通过添加或移除CSS类来一次性改变多个样式属性，而不是逐个修改；
   - 使用文档片段（document Fragment）：当需要在向dom插入大量新元素时，可以将这些元素添加到文档片段中，然后讲文档片段一次性插入到dom中，这样可以减少回流次数（虚拟dom vue的方式）。
   - 使用visibility：hidden 替换display：none； visibility不会触发回流，因为元素占据空间，只是不可见；而display：none会将元素从渲染树移除，引起回流；

3、margin塌陷问题如何解决？BFC是什么？怎么触发？
- 在两个div的间隔，取margin重叠部分的较大值；
- BFC：块级格式化上下文，一个独立的渲染区域，有自己的渲染规则，与外部的元素不会互相影响；BFC触发方式有：（1）设置了float属性、设置了position：absolute/fixed属性；设置display：inline-block属性；设置overflow属性；

4、如何隐藏一个元素：
- display：none； opacity：0； visibility：hidden； clip-path：circle（0）；position：absolute，top：-999px；

6、三栏布局的实现方式（圣杯模型）：
- 三栏布局通常是左侧栏，右侧栏固定宽度，中间内容区域自适应宽度；
- 可以使用flex布局：父元素flex，左右给固定宽度，中间flex：1；
- 可以使用Grid布局，给父元素设置：display: grid; grid-template-columns: 200px 1fr 200px;即可；

7、calc（）方法：
- calc（）是CSS中的一个函数，用于动态计算样式属性值，主要解决以下问题：
   - 响应式布局；可以根据不同屏幕的尺寸和视口大小，动态调整元素的尺寸和间距
   - 动态尺寸调整；可以根据其他元素的尺寸来计算元素尺寸，在构建复杂布局时很有用；
   - 优化代码：calc可以减少不必要的CSS代码和硬编码；
 
9、渐进增强和优雅降级：
- 渐进增强是从基本的、核心的功能开始，然后逐渐增强用户体验；首先为用户提供基本的内容和功能，确保网站在所有浏览器和设备上都可以访问和使用；然后逐步添加更复杂更高级的功能和效果；
- 优雅降级是首先构建功能丰富的版本，然后在较低级浏览器上提供一种相对简化的版本；优雅降级是在功能丰富的版本基础上创建简化版本，以适应旧浏览器。

10、前端 iframe有哪些优缺点及使用场景 ？
- iframe是HTML提供的一个标签，用于在当前页面中嵌入另一个HTML页面；使用场景有 嵌入第三方内容、微前端架构中的子应用容器、只读内容或外部文档展示；
- 优点：页面嵌套独立性强：iframe内的页面在一个独立的上下文中运行，不会影响父页面；可以复用现有系统页面，可以直接嵌入第三方页面或已有的子系统（如BI报表系统）；
- 缺点：父子页面通信需要通过postMessage，API不够直观；iframe内容无法被搜索引擎抓取，影响SEO；样式和js隔离，CSS和js无法直接共享，导致UI不一致或需要重复加载资源；

11、CSS盒子模型；
- 用于排列和定位网页上元素的基本概念，它定义了每个元素周围的巨型区域（盒子），这个盒子包括 内容Content、内边距Padding、外边距Margin和外边框Border；

12、HTML5的特性：
- 语义元素：`<header>/ <footer>/ <nav>/ <section>`;用于描述网页结构，提高可读性和可访问性；
- 多媒体支持：`<audio>/ <video>`,使得音频和视频的嵌入更加简单；无需使用第三方插件（如Flash）；
- Canvas：允许通过JavaScript创建和操作图形，用于绘制图表、游戏和应用程序；
- 本地存储：引入了localStorage、sessionStorage、indexDB、允许在客户端存储数据，以提高离线应用程序的性能；
- 新表单元素：`<input type='date'> / , <input type='email'> / <input type='range'>`；使得表单更具有交互性；
- web workers:允许在后台允许JavaScript，以提高web应用程序的响应性，而不会阻塞用户界面；
- webSocket：一种实时通信协议，可用于创建实时聊天和多人游戏；
- 地理位置（Geolocation）：允许网页获取用户的位置信息，如地图和位置服务，代码示例：
   - ```
     navigator.geolocation.getCurrentPosition(
     (pos) => console.log(pos.coords),
     (err) => console.error(err)
     );
     ```
- SVG矢量图：HTML5支持可缩放svg,使得网页可直接嵌入并渲染矢量图形，SVG基于XML描述图形（如圆形、矩形、路径等）；适用于图标、图表、动画等；可直接使用无需插件；
- 拖放：HTML5 拖放（Drag and Drop）是新引入的交互特性，允许用户将一个元素从一个位置拖放到另一个位置，实现可视化的内容排序、文件上传等操作；通过设置元素的`draggable="true"`属性使其可以拖动，并配合JavaScript的`dragstart、dragover、drop`等事件实现拖放逻辑。

13、CSS3的特性：
- 阴影和发光效果：`box-shadow, text-shadow`属性，可以为元素添加阴影和发光效果；
- 渐变背景：`linear-gradient/radial-gradient`属性，可以创建线性和径向的渐变背景；
- 变换：transform属性，可以对元素旋转、缩放、平移；
- 过渡：transition，可以创建元素之间的平滑过渡效果；
- 动画： 如@keyframe ,animation属性可以创建CSS动画，实现复杂的运动和效果；
- 栅格布局：Grid，可以创建复杂的网格布局，用来定位和对齐元素；
- 自定义属性：通过CSS变量var（）来重用自定义属性，可以简化样式表的管理；
- 响应式布局：通过媒体查询和弹性布局，以适应不同的屏幕尺寸和设备。

14、CSS中选择器的优先级，权重计算方式？
- !important具有最高优先级；
- 内联样式 》 ID选择器》类选择器、属性选择器》元素选择器和伪类选择器；

15、HTML5 input元素的type属性有哪些？
- text、 password、radio、checkbox、number、range、date、time、file、color、hidden、submit、reset、button。





