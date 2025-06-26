<template>
    <div class="global-list">
        <div class="list-header">
          <slot name="header1"></slot>
        </div>
        <!-- 列表区域内容 -->
        <ul class="list-content">
          <li v-for="(item, index) in paginatedItems" :key="index" class="list-item">
            <slot>{{ item }}</slot>
          </li>
        </ul>
        <!-- 分页控件 -->
        <div v-if="pagination" class="list-pagination">
          <button @click="prevPage" :disabled="currentPage === 1">上一页</button>
          <span>第 {{ currentPage }} 页 / 共 {{ totalPages }} 页</span>
          <button @click="nextPage" :disabled="currentPage === totalPages">下一页</button>
        </div>
        <div class="list-footer">
          <slot name="footer1"></slot>
        </div>
    </div>
</template>
<script setup>
import { computed, defineProps, ref, watchEffect } from 'vue'
const props = defineProps({
  items: {
    type: Array,
    required: true,
    default: ()=>[]
  },
  pagination: {
    type: Boolean,
    default: false
  },
  pageSize: {
    type: Number,
    default: 10
  }
})

const currentPage = ref(1)

const totalPages = computed(() => {
  return Math.ceil(props.items.length / props.pageSize)
})

const paginatedItems = computed(() => {
  if (!props.pagination) return props.items
  
  const start = (currentPage.value - 1) * props.pageSize
  const end = start + props.pageSize
  return props.items.slice(start, end)
})

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
  }
}
</script>

<style scoped>
.global-list {
  width: 100%;
  border: 1px solid #eee;
  border-radius: 4px;
  overflow: hidden;
  padding: 5px;
}

.list-header {
  padding: 12px 16px;
  background-color: #f5f5f5;
  border-bottom: 1px solid #eee;
}

.list-content {
  list-style: none;
  margin: 0;
  padding: 0;
  max-height: 310px;
  overflow-y: auto;
}

.list-item {
  padding: 3px 11px;
  text-align: left;
  border-bottom: 1px solid #eee;
}
.list-item:hover {
  background: #eee;
}

.list-item:last-child {
  border-bottom: none;
}

.list-footer {
  padding: 12px 16px;
  background-color: #f5f5f5;
  border-top: 1px solid #eee;
}
</style>