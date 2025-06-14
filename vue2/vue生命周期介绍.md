## vue生命周期介绍

vue2的生命周期是理解组件行为的关键，它描述了组件从创建到销毁的完整过程，以下是详细介绍：
```
beforeCreate
  │
  ├── created
  │     │
  │     ├── beforeMount
  │     │      │
  │     │      ├── mounted
  │     │      │     │
  │     │      │     ├── beforeUpdate
  │     │      │     │      │
  │     │      │     │      ├── updated
  │     │      │     │      │
  │     │      │     ├── beforeDestroy
  │     │      │     │      │
  │     │      │     │      ├── destroyed
  │     │      │     │
  │     │      ├── (当keep-alive缓存时)
  │     │      │     ├── activated
  │     │      │     │
  │     │      │     ├── deactivated
```
