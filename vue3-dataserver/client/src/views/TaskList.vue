<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import SkeletonItem from './SkeletonItem.vue';
import { useFetch } from './useFetch';

const newTodo = ref('');

const API_URL = 'http://localhost:3001/api/todos';

// 获取数据
const { data: todoList, loading, error, refresh } = useFetch(API_URL)

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
    // todoList.value.push(data);
    newTodo.value = '';
    refresh()
  } catch (error) {
    console.error('添加失败:', error);
  }
};
// 前端乐观更新
const updateTodo = async (id) => {
  try {
    const { data } = await axios.put(`${API_URL}/${id}`, {
      title: newTodo.value // 新标题
    });
    
    // const index = todoList.value.findIndex(todo => todo.id === id);
    // if (index !== -1) {
    //   todoList.value[index] = data; // 替换为后端返回的更新后数据
    // }
    refresh()
  } catch (error) {
    console.error('更新失败:', error.response?.data);
    // 可选：恢复原有值或提示用户
  }
};
const editingId = ref('')
// 更新数据
const startEdit = (todo) => {
  editingId.value = todo.id;
  newTodo.value = todo.title;
};
const saveEdit = async () => {
  await updateTodo(editingId.value);
  newTodo.value = null;
  editingId.value = null;
};
// 删除数据（新增）
const confirmDelete = (id) => {
  if (confirm('确定删除此条目？' + id)) {
    deleteTodo(id);
  }
};
// 删除数据方法（通过 ID）
const deleteTodo = async (id) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
    
    // 前端立即更新
    // todoList.value = todoList.value.filter(todo => todo.id !== id);
    refresh()
  } catch (error) {
    console.error('删除失败:', error.response?.data);
    // 可选：提示用户操作失败
  }
};

</script>

<template>
  <div class="task_list">
    <p class="task_form">
      <input v-model="newTodo" placeholder="输入任务" id="task_input" />
      <button @click="saveEdit" v-if="editingId">编辑保存</button>
      <button @click="addTodo" v-else>新增保存</button>
    </p>
    <SkeletonItem v-if="loading"/>
    <div v-else-if="error">出错了：{{ error.message }}</div>
    <ul v-else>
      <li v-for="todo in todoList" :key="todo.id">
        <div class="todo_title">{{ todo.title }}</div>
        <div class="todo_btns">
          <button @click="startEdit(todo)" class="edit_btn">编辑</button>
          <button @click="confirmDelete(todo.id)" class="del_btn">删除</button>
        </div>
        
      </li>
    </ul>
  </div>
</template>
<style scoped>
.task_list {
    padding: 11px;
}
.task_list .task_form {
  padding: 3px; margin: 5px;
  margin-left: 50px;
}
.task_list ul li {
    list-style: none;
    padding: 3px;
    margin: 5px 0;
    border-bottom: 1px solid #ccc;
    display: flex;
    justify-content: space-between;
}
.task_list input {
    border: 1px solid #ccc;
    padding: 5px; margin: 5px;
}
.task_list button {
    padding: 3px 8px;
}
.task_list .edit_btn {
  color: green; margin: 0 5px;
}
.task_list .del_btn {
  color: red;
}
</style>