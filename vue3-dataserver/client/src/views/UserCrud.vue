<template>
    <div class="user_list_wrapper">
  
      <!-- 搜索框 -->
      <input v-model="search" placeholder="搜索姓名" @input="fetchUsers" />
  
      <!-- 添加用户表单 -->
      <form @submit.prevent="handleAdd" class="user_from">
        <input v-model="form.name" placeholder="姓名" />
        <input v-model.number="form.age" type="number" placeholder="年龄" />
        <button type="submit">添加用户</button>
      </form>
      <p v-if="errorMsg" style="color: red">{{ errorMsg }}</p>
  
      <!-- 导出按钮 -->
      <button @click="exportToExcel">导出为 Excel</button>
  
      <!-- 用户列表 -->
      <ul>
        <li class="list_header">
            <div @click="toggleSort">姓名</div>
            <div @click="toggleSort">年龄 ⬍</div>
            <div>操作</div>
        </li>
        <li v-for="user in paginatedUsers" :key="user.id">
            <div>{{ user.name }}</div>
            <div>{{ user.age }}</div>
            <div class="todo_btns">
                <button @click="editUser(user)" class="edit_btn">编辑</button>
                <button @click="deleteUser(user.id)" class="del_btn">删除</button>
            </div>
        </li>
      </ul>
  
      <!-- 分页器 -->
      <div>
        <button @click="prevPage" :disabled="page === 1">上一页</button>
        第 {{ page }} 页
        <button @click="nextPage" :disabled="page >= maxPage">下一页</button>
      </div>
  
      <!-- 编辑区 -->
      <div v-if="editing" class="user_from">
        <h3>编辑用户</h3>
        <input v-model="form.name" placeholder="姓名" />
        <input v-model.number="form.age" type="number" placeholder="年龄" />
        <button @click="handleUpdate">保存修改</button>
        <button @click="cancelEdit">取消</button>
      </div>
    </div>
  </template>
  
  <script>
  import * as XLSX from 'xlsx';
  
  export default {
    data() {
      return {
        users: [],
        form: { name: '', age: null },
        editingId: null,
        search: '',
        sortAsc: true,
        page: 1,
        perPage: 10,
        errorMsg: '',
      };
    },
    computed: {
      editing() {
        return this.editingId !== null;
      },
      filteredUsers() {
        return this.users
          .filter(u => u.name.toLowerCase().includes(this.search.toLowerCase()))
          .sort((a, b) => this.sortAsc ? a.age - b.age : b.age - a.age);
      },
      maxPage() {
        return Math.ceil(this.filteredUsers.length / this.perPage);
      },
      paginatedUsers() {
        const start = (this.page - 1) * this.perPage;
        return this.filteredUsers.slice(start, start + this.perPage);
      }
    },
    methods: {
      async fetchUsers() {
        const res = await fetch('http://localhost:3000/api/users');
        this.users = await res.json();
        console.log(1111111, this.users)
      },
      async handleAdd() {
        if (!this.form.name || !this.form.age || this.form.age <= 0) {
          this.errorMsg = '请填写有效姓名和年龄';
          return;
        }
        this.errorMsg = '';
        await fetch('http://localhost:3000/api/users', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(this.form),
        });
        this.form = { name: '', age: null };
        this.fetchUsers();
      },
      async deleteUser(id) {
        await fetch(`http://localhost:3000/api/users/${id}`, { method: 'DELETE' });
        this.fetchUsers();
      },
      editUser(user) {
        this.editingId = user.id;
        this.form = { name: user.name, age: user.age };
      },
      async handleUpdate() {
        await fetch(`http://localhost:3000/api/users/${this.editingId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(this.form),
        });
        this.cancelEdit();
        this.fetchUsers();
      },
      cancelEdit() {
        this.editingId = null;
        this.form = { name: '', age: null };
      },
      toggleSort() {
        this.sortAsc = !this.sortAsc;
      },
      prevPage() {
        if (this.page > 1) this.page--;
      },
      nextPage() {
        if (this.page < this.maxPage) this.page++;
      },
      exportToExcel() {
        const ws = XLSX.utils.json_to_sheet(this.filteredUsers);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Users");
        XLSX.writeFile(wb, "用户列表.xlsx");
      }
    },
    mounted() {
      this.fetchUsers();
    },
  };
  </script>
<style scoped>
.user_list_wrapper .user_from {
    display: block;
    margin-left: 50px;
    padding: 5px; margin: 3px;
    border: 1px solid #ccc;
}
.user_list_wrapper .user_from input {
    border: 1px solid #ccc;
    padding: 5px; margin: 5px;
}
.user_list_wrapper button {
    padding: 3px 8px; margin-left: 5px;
}
.user_list_wrapper ul li {
    list-style: none;
    padding: 3px;
    margin: 5px 0;
    border-bottom: 1px solid #ccc;
    display: flex;
    justify-content: space-between;
}
.user_list_wrapper .edit_btn {
  color: green; margin: 0 5px;
}
.user_list_wrapper .del_btn {
  color: red;
}
</style>
  