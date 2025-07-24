<template>
    <div class="home">
      <h1>欢迎来到首页</h1>
      <p>这是我们的主页内容。</p>
      <div class="com_wrapper">
        <p>
          <BaseButton @click="btn1click" :loading="loading1">基础按钮</BaseButton>
          <span>basebutton</span>
          <BaseButton @click="btn2click">打开弹窗</BaseButton>
        </p>
        <BaseModal v-model="showModal">
          <p v-for="item in 15" :key="item">content_content_content_content_content_content_{{ item }}</p>
        </BaseModal>
        <p>基础表格组件应用
          <BaseButton @click="btn3click">增加数据</BaseButton>
        </p>
        <BaseTable :columns="tablecolumns" :data="tabledata"></BaseTable>
      </div>
    </div>
  </template>
  
<script setup>
import { BaseButton, BaseModal, BaseTable } from '@/components';

import { ref } from 'vue';

const loading1 = ref(false);
const btn1click = ()=>{
  loading1.value = true
  setTimeout(() => {
    loading1.value = false   
  }, 2000);
}

const showModal = ref(false)
const btn2click = ()=>{
  showModal.value = true;
  console.log('===btn2click---')
}

const tablecolumns = [{title: '编号', key: 'idx'},{title: '姓名', key: 'name'},{title: '年龄', key: 'age'}];
const tabledata = ref([{idx: 1, name:'zhangsan', age:33}, {idx: 2, name:'lisi', age: 44}, {idx: 3, name:'wangwu', age:55}]);
const btn3click = ()=>{
  const dataLen = tabledata.value.length;
  const names = ['Alice', 'Bob', 'Charlie', 'David', 'Eva', 'Frank', 'Grace', 'Helen'];
  const name = names[Math.floor(Math.random() * names.length)] + '_' + dataLen;
  const age = Math.floor(Math.random() * 60) + 18; // 年龄18~77
  tabledata.value.push({idx: dataLen+1, name: name, age: age})
}
</script>

<style scoped>
.home {
  padding: 20px;
}
.com_wrapper {
  border: 1px solid #ccc; padding: 11px; border-radius: 5px;
  min-height: 500px;
}
</style>