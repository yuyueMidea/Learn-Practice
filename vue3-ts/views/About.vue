<template>
    <div class="ablout">
      <h2>About</h2>
      <p v-for="i in 20" key="i">关于我们的产品,</p>

    </div>
  </template>
  
  <script lang="ts" setup>
  // 这里可以添加页面逻辑
  </script>
  
  <style scoped>
  .ablout {
    padding: 20px;
  }
  </style>