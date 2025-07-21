<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const todos = ref([]);
const newTodo = ref('');

const API_URL = 'http://localhost:3001/api/todos';

// 获取数据
const fetchTodos = async () => {
  try {
    const { data } = await axios.get(API_URL);
    todos.value = data;
  } catch (error) {
    console.error('获取数据失败:', error);
  }
};
// 生成随机ID的方法，入参是位数，比如16位ID
const generateRandomString = (length) => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    return Array.from(crypto.getRandomValues(new Uint8Array(length)))
    .map(byte => chars[byte % chars.length])
    .join('');
}

// 新增数据
const addTodo = async () => {
  if (!newTodo.value.trim()) return;
  try {
    const { data } = await axios.post(API_URL, { id: generateRandomString(16), title: newTodo.value });
    todos.value.push(data);
    newTodo.value = '';
  } catch (error) {
    console.error('添加失败:', error);
  }
};

onMounted(fetchTodos);
</script>

<template>
  <div class="task_list">
    <input v-model="newTodo" @keyup.enter="addTodo" placeholder="输入任务" id="task_input" />
    <button @click="addTodo">add</button>
    <ul>
      <li v-for="todo in todos" :key="todo.id">
        {{ todo.title }}
      </li>
    </ul>
  </div>
</template>
<style scoped>
.task_list {
    padding: 11px;
}
.task_list ul li {
    list-style: none;
    padding: 3px;
    margin: 5px 0;
    border-bottom: 1px solid #ccc;
}
.task_list input {
    border: 1px solid #ccc;
    padding: 5px; margin: 5px;
}
.task_list button {
    padding: 5px; margin: 5px;
}
</style>