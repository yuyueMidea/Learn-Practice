const { ipcRenderer } = require('electron');

// 全局状态
let currentRoute = 'home';
let products = [];

document.addEventListener('DOMContentLoaded', () => {
    initializeRouter();
    initializeNavigation();
    
    // 初始加载当前路由
    loadPage(currentRoute);
});

// 初始化路由系统
function initializeRouter() {
    // 处理初始路由
    const initialHash = window.location.hash.substring(1);
    if (initialHash) {
        currentRoute = initialHash;
    }
    
    // 监听hash变化
    window.addEventListener('hashchange', () => {
        const newRoute = window.location.hash.substring(1) || 'home';
        if (newRoute !== currentRoute) {
            currentRoute = newRoute;
            loadPage(currentRoute);
            updateActiveMenuItem(currentRoute);
        }
    });
}

// 初始化导航菜单
function initializeNavigation() {
    const menuItems = document.querySelectorAll('[data-route]');
    menuItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const route = e.target.getAttribute('data-route');
            navigateTo(route);
        });
    });
}

// 导航到指定路由
function navigateTo(route) {
    window.location.hash = route;
}

// 更新活动菜单项样式
function updateActiveMenuItem(route) {
    const menuItems = document.querySelectorAll('[data-route]');
    menuItems.forEach(item => {
        item.classList.toggle('active', item.getAttribute('data-route') === route);
    });
}

// 加载页面内容
async function loadPage(route) {
    // 隐藏所有页面
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    
    // 显示当前页面
    const pageElement = document.getElementById(`${route}Page`);
    if (pageElement) {
        pageElement.classList.add('active');
    }
    
    // 特殊页面处理
    switch (route) {
        case 'products':
            await renderProductList();
            break;
        // 其他页面的特殊处理可以在这里添加
    }
}

// 渲染产品列表
async function renderProductList() {
    const productListContainer = document.getElementById('productList');
    if (!productListContainer) return;
    
    // 显示加载状态
    productListContainer.innerHTML = '<div class="loading">加载产品数据中...</div>';
    
    try {
        // 从主进程获取产品数据
        products = await ipcRenderer.invoke('get-products');
        
        // 清空容器
        productListContainer.innerHTML = '';
        
        if (products.length === 0) {
            productListContainer.innerHTML = '<div class="no-data">暂无产品数据</div>';
            return;
        }
        
        // 创建表格
        const table = document.createElement('table');
        table.className = 'product-table';
        
        // 创建表头
        const thead = document.createElement('thead');
        thead.innerHTML = `
            <tr>
                <th>ID</th>
                <th>产品名称</th>
                <th>价格</th>
                <th>库存</th>
                <th>操作</th>
            </tr>
        `;
        table.appendChild(thead);
        
        // 创建表体
        const tbody = document.createElement('tbody');
        
        // 填充数据行
        products.forEach(product => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${product.id}</td>
                <td>${product.name}</td>
                <td>¥${product.price.toFixed(2)}</td>
                <td>${product.stock}</td>
                <td>
                    <button class="btn btn-edit" data-id="${product.id}">编辑</button>
                    <button class="btn btn-delete" data-id="${product.id}">删除</button>
                </td>
            `;
            tbody.appendChild(row);
        });
        
        table.appendChild(tbody);
        productListContainer.appendChild(table);
        
        // 添加事件监听
        setupProductListEvents();
        
    } catch (error) {
        productListContainer.innerHTML = `
            <div class="error">
                加载产品列表失败: ${error.message}
                <button class="btn btn-retry" onclick="location.reload()">刷新重试</button>
            </div>
        `;
        console.error('加载产品列表失败:', error);
    }
}

// 设置产品列表事件
function setupProductListEvents() {
    // 编辑按钮
    document.querySelectorAll('.btn-edit').forEach(btn => {
        btn.addEventListener('click', handleEditProduct);
    });
    
    // 删除按钮
    document.querySelectorAll('.btn-delete').forEach(btn => {
        btn.addEventListener('click', handleDeleteProduct);
    });
}

// 处理编辑产品
function handleEditProduct(event) {
    const productId = parseInt(event.target.getAttribute('data-id'));
    const product = products.find(p => p.id === productId);
    if (product) {
        alert(`准备编辑产品: ${product.name}\nID: ${product.id}`);
        // 实际项目中这里可以打开编辑模态框或跳转到编辑页面
    }
}

// 处理删除产品
async function handleDeleteProduct(event) {
    const productId = parseInt(event.target.getAttribute('data-id'));
    const product = products.find(p => p.id === productId);
    
    if (!product) {
        showToast('产品不存在');
        return;
    }
    
    if (!confirm(`确定要删除产品 "${product.name}" 吗？`)) {
        return;
    }
    
    try {
        // 显示删除中状态
        event.target.textContent = '删除中...';
        event.target.disabled = true;
        
        // 调用主进程删除
        const success = await ipcRenderer.invoke('delete-product', productId);
        
        if (success) {
            showToast('产品删除成功');
            // 重新渲染列表
            await renderProductList();
        } else {
            showToast('删除失败');
        }
        
    } catch (error) {
        console.error('删除产品失败:', error);
        showToast(`删除失败: ${error.message}`);
    } finally {
        event.target.textContent = '删除';
        event.target.disabled = false;
    }
}

// 显示Toast通知
function showToast(message, duration = 3000) {
    // 移除现有的toast
    const existingToast = document.querySelector('.toast');
    if (existingToast) {
        existingToast.remove();
    }
    
    // 创建新的toast
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    document.body.appendChild(toast);
    
    // 显示toast
    setTimeout(() => {
        toast.classList.add('show');
    }, 10);
    
    // 自动隐藏
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            toast.remove();
        }, 300);
    }, duration);
}