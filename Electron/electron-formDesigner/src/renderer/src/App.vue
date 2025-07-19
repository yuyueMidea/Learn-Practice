<template>
  <div class="app-container">
    <!-- 顶部状态栏 -->
    <header class="app-header">
      <div class="header_wrapper">
        <span>welcome</span>
      </div>
    </header>

    <!-- 主体区域 -->
    <div class="app-body">
      <!-- 左侧菜单 -->
      <aside class="app-sidebar">
        <nav class="nav">
          <router-link
            v-for="item in menuItems"
            :key="item.path"
            :to="item.path"
            class="nav-item"
          >
            {{ item.icon }} {{ item.name }}
          </router-link>
        </nav>
      </aside>

      <!-- 右侧页面内容 -->
      <main class="app-main">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script setup>
import { menuItems } from './menus.js';

</script>

<style>
/* 全局布局 */
html, body, #app {
  margin: 0;
  padding: 0;
  height: 100%;
  font-family: 'Segoe UI', sans-serif;
  background-color: #f5f5f5;
}

.app-container {
  display: flex;
  flex-direction: column;
  height: 100%;
}

/* 顶部状态栏 */
.app-header {
  height: 50px;
  background-color: lightskyblue;
  color: #fff;
  display: flex;
  align-items: center;
  padding: 0 20px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  flex-shrink: 0;
}
.app-header .header_wrapper {
  width: 100%;
  display: flex;
  justify-content: space-between;
}

/* 主体区域：侧边栏 + 内容区 */
.app-body {
  display: flex;
  flex: 1;
  height: 0; /* 确保下方区域不会撑开 body */
}

/* 左侧菜单 */
.app-sidebar {
  width: 180px;
  background-color: #2c3e50;
  color: white;
  padding: 20px 10px;
  box-sizing: border-box;
  overflow-y: auto;
}

.nav {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.nav-item {
  color: white;
  text-decoration: none;
  padding: 8px 12px;
  border-radius: 4px;
  transition: background 0.2s;
}

.nav-item:hover {
  background-color: #3e5d79;
}

.nav-item.router-link-active {
  background-color: #1abc9c;
  font-weight: bold;
}

/* 右侧页面内容区 */
.app-main {
  flex: 1;
  background-color: #fff;
  padding: 20px;
  box-sizing: border-box;
  overflow-y: auto;
}
</style>
