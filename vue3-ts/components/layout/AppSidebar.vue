<template>
    <aside class="app-sidebar" :class="{ collapsed: !sidebarOpened }">
      <div class="menu">
        <router-link
          v-for="route in menuRoutes"
          :key="route.path"
          :to="route.path"
          active-class="active"
        >
          <i :class="`icon-${route.meta?.icon}`"></i>
          <span v-show="sidebarOpened">{{ route.meta?.title }}</span>
        </router-link>
      </div>
    </aside>
  </template>
  
  <script lang="ts" setup>
  import { computed } from 'vue'
  import { useRouter } from 'vue-router'
  import { useAppStore } from '../../stores/app'
  
  const router = useRouter()
  const appStore = useAppStore()
  
  const sidebarOpened = computed(() => appStore.sidebarOpened)
  
  const menuRoutes = computed(() => {
    return router.options.routes.filter(
      (route) => !route.meta?.hidden
    )
  })
  </script>
  
  <style scoped>
  .app-sidebar {
    width: 200px;
    height: 100vh;
    background-color: #34495e;
    transition: width 0.3s;
  }
  
  .app-sidebar.collapsed {
    width: 64px;
  }
  
  .menu a {
    display: flex;
    align-items: center;
    padding: 12px 20px;
    color: white;
    text-decoration: none;
  }
  
  .menu a:hover {
    background-color: #2c3e50;
  }
  
  .menu a.active {
    background-color: #42b983;
  }
  
  .menu i {
    margin-right: 8px;
    font-size: 18px;
  }
  </style>