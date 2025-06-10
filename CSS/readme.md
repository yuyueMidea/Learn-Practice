flex/grid 实现常用的响应式布局

基本flex布局
```
.flex-container {
  display: flex;
  flex-direction: row; /* 或 column, row-reverse, column-reverse */
  justify-content: center; /* 主轴对齐方式：flex-start, flex-end, center, space-between, space-around */
  align-items: center; /* 交叉轴对齐方式：flex-start, flex-end, center, baseline, stretch */
  flex-wrap: wrap; /* 是否换行：nowrap, wrap, wrap-reverse */
  gap: 10px; /* 项目之间的间距 */
}
```
flex项目属性
```
.flex-item {
  flex-grow: 1; /* 放大比例 */
  flex-shrink: 1; /* 缩小比例 */
  flex-basis: 100px; /* 初始大小 */
  /* 简写形式 */
  flex: 1 1 100px;
  
  align-self: flex-start; /* 单个项目的对齐方式 */
  order: 1; /* 排列顺序 */
}
```

基本Grid容器
```
.grid-container {
  display: grid;
  grid-template-columns: 100px 1fr 2fr; /* 定义列 */
  grid-template-rows: 50px 1fr 50px; /* 定义行 */
  gap: 10px; /* 网格间隙 */
  
  /* 简写方式 */
  grid-template: 
    "header header header" 50px
    "sidebar main main" 1fr
    "footer footer footer" 50px
    / 100px 1fr 2fr;
}
```
Grid项目属性
```
.grid-item {
  grid-column: 1 / 3; /* 跨越列 */
  grid-row: 1; /* 跨越行 */
  
  /* 使用命名区域 */
  grid-area: header;
  
  /* 对齐方式 */
  justify-self: center; /* 水平对齐 */
  align-self: center; /* 垂直对齐 */
}
```
---
##Tailwindcss
