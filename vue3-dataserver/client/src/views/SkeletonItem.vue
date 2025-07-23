<template>
    <div class="skeleton-loader">
        <!-- 加载中的骨架屏 -->
        <div class="skeleton-item" v-for="i in 3" :key="i"></div>
    </div>
</template>
  
  
  <style>
  /* 骨架屏动画样式 */
  .skeleton-loader {
    width: 100%;
    box-sizing: border-box;
  }
  
  .skeleton-item {
    height: 50px;
    background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
    background-size: 200% 100%;
    border-radius: 4px;
    margin-bottom: 15px;
    animation: shimmer 1.5s infinite;
  }
  
  @keyframes shimmer {
    0% {
      background-position: 200% 0;
    }
    100% {
      background-position: -200% 0;
    }
  }

  </style>