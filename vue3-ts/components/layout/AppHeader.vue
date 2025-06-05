<template>
    <header class="app-header">
      <button @click="toggleSidebar">
        <i class="icon-menu"></i>
      </button>
      <h1>{{ title }}</h1>
    </header>
  </template>
  
  <script lang="ts" setup>
  import { computed } from 'vue'
  import { useRoute } from 'vue-router'
  import { useAppStore } from '../../stores/app'
  
  const route = useRoute()
  const appStore = useAppStore()
  
  const title = computed(() => route.meta.title as string)
  
  const toggleSidebar = () => {
    appStore.toggleSidebar()
  }
  </script>
  
  <style scoped>
  .app-header {
    display: flex;
    align-items: center;
    padding: 0 20px;
    height: 60px;
    background-color: #2c3e50;
    color: white;
  }
  </style>