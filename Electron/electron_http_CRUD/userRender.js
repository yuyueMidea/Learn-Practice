// 检查服务器状态
async function checkServerStatus() {
    const statusElement = document.getElementById('serverStatus');
    try {
      const isRunning = await window.electronAPI.getServerStatus();
      statusElement.textContent = isRunning ? 'Server is running on port 3000' : 'Server is not running';
      statusElement.className = isRunning ? 'status online' : 'status offline';
    } catch (error) {
      statusElement.textContent = 'Error checking server status';
      statusElement.className = 'status offline';
    }
  }
  
  // 获取所有用户
  async function fetchUsers() {
    try {
      const response = await fetch('http://localhost:3000/api/users');
      if (!response.ok) throw new Error('Network response was not ok');
      return await response.json();
    } catch (error) {
      console.error('Error fetching users:', error);
      return [];
    }
  }
  
  // 添加新用户
  async function addUser(user) {
    try {
      const response = await fetch('http://localhost:3000/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user)
      });
      return await response.json();
    } catch (error) {
      console.error('Error adding user:', error);
      throw error;
    }
  }
  
  // 更新用户
  async function updateUser(id, user) {
    try {
      const response = await fetch(`http://localhost:3000/api/users/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user)
      });
      return await response.json();
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  }
  
  // 删除用户
  async function deleteUser(id) {
    try {
      const response = await fetch(`http://localhost:3000/api/users/${id}`, {
        method: 'DELETE'
      });
      return await response.json();
    } catch (error) {
      console.error('Error deleting user:', error);
      throw error;
    }
  }
  
  // 渲染用户列表
  async function renderUsers() {
    const users = await fetchUsers();
    const tbody = document.querySelector('#userTable tbody');
    tbody.innerHTML = '';
    
    users.forEach(user => {
      const tr = document.createElement('tr');
      
      tr.innerHTML = `
        <td>${user.id}</td>
        <td><input type="text" value="${user.name}" data-field="name" data-id="${user.id}"></td>
        <td><input type="email" value="${user.email}" data-field="email" data-id="${user.id}"></td>
        <td>
          <button class="update-btn" data-id="${user.id}">Update</button>
          <button class="delete-btn" data-id="${user.id}">Delete</button>
        </td>
      `;
      
      tbody.appendChild(tr);
    });
    
    // 添加更新按钮事件
    document.querySelectorAll('.update-btn').forEach(btn => {
      btn.addEventListener('click', async (e) => {
        const id = parseInt(e.target.dataset.id);
        const row = e.target.closest('tr');
        const name = row.querySelector('[data-field="name"]').value;
        const email = row.querySelector('[data-field="email"]').value;
        
        try {
          await updateUser(id, { name, email });
          await renderUsers();
        } catch (error) {
          alert('Failed to update user');
        }
      });
    });
    
    // 添加删除按钮事件
    document.querySelectorAll('.delete-btn').forEach(btn => {
      btn.addEventListener('click', async (e) => {
        const id = parseInt(e.target.dataset.id);
        if (confirm('Are you sure you want to delete this user?')) {
          try {
            await deleteUser(id);
            await renderUsers();
          } catch (error) {
            alert('Failed to delete user');
          }
        }
      });
    });
  }
  
  // 表单提交处理
  document.getElementById('userForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    
    try {
      await addUser({ name, email });
      document.getElementById('userForm').reset();
      await renderUsers();
    } catch (error) {
      alert('Failed to add user');
    }
  });
  
  // 初始化
  document.addEventListener('DOMContentLoaded', () => {
    checkServerStatus();
    renderUsers();
    
    // 每5秒刷新一次状态和用户列表
    setInterval(() => {
      checkServerStatus();
      renderUsers();
    }, 5000);
});