<template>
  <div class="base-table-wrapper">
    <!-- 表头 -->
    <table class="base-table">
      <thead>
        <tr>
          <th v-for="col in columns" :key="col.key">{{ col.title }}</th>
        </tr>
      </thead>
    </table>

    <!-- 表体滚动区域 -->
    <div class="table-body-scroll">
      <table class="base-table">
        <tbody>
          <tr v-for="row in data" :key="row.id">
            <td v-for="col in columns" :key="col.key">
              {{ row[col.key] }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
defineProps({
  columns: Array,
  data: Array
})
</script>

<style scoped>
.base-table-wrapper {
  border: 1px solid #ccc;
  overflow: hidden;
}

/* 所有 table 保持样式一致 */
.base-table {
  width: 100%;
  table-layout: fixed;
  border-collapse: collapse;
}

.base-table th,
.base-table td {
  padding: 4px 11px;
  border: 1px solid #eee;
  text-align: left;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.table-body-scroll {
  max-height: 330px;
  overflow-y: auto;
}
</style>
