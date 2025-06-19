document.addEventListener('DOMContentLoaded', () => {
    // 当前选中的组件
    let selectedComponent = null;
    
    // 初始化拖拽功能
    initDragAndDrop();
    
    // 绑定按钮事件
    document.getElementById('saveBtn').addEventListener('click', saveForm);
    document.getElementById('loadBtn').addEventListener('click', loadForm);
    document.getElementById('generateBtn').addEventListener('click', generateJson);
    
    // 绑定属性变化事件
    document.getElementById('componentName').addEventListener('input', updateComponentProperty);
    document.getElementById('componentLabel').addEventListener('input', updateComponentProperty);
    document.getElementById('componentOptions').addEventListener('input', updateComponentProperty);
    
    // 初始化拖拽功能
    function initDragAndDrop() {
      const components = document.querySelectorAll('.component-item');
      const designArea = document.getElementById('designArea');
      
      // 为每个组件添加拖拽开始事件
      components.forEach(component => {
        component.addEventListener('dragstart', (e) => {
          e.dataTransfer.setData('componentType', component.dataset.type);
        });
      });
      
      // 设计区域拖拽事件
      designArea.addEventListener('dragover', (e) => {
        e.preventDefault();
      });
      
      designArea.addEventListener('drop', (e) => {
        e.preventDefault();
        const componentType = e.dataTransfer.getData('componentType');
        addComponentToDesignArea(componentType, e.offsetX, e.offsetY);
      });
    }
    
    // 添加组件到设计区域
    function addComponentToDesignArea(type, x, y) {
      const designArea = document.getElementById('designArea');
      const id = 'component-' + Date.now();
      
      let componentHtml = '';
      switch(type) {
        case 'input':
          componentHtml = `
            <div class="form-component" id="${id}" data-type="${type}">
              <button class="delete-btn">×</button>
              <label>文本输入</label>
              <input type="text" placeholder="请输入文本">
            </div>
          `;
          break;
        case 'select':
          componentHtml = `
            <div class="form-component" id="${id}" data-type="${type}">
              <button class="delete-btn">×</button>
              <label>下拉选择</label>
              <select>
                <option>选项1</option>
                <option>选项2</option>
              </select>
            </div>
          `;
          break;
        case 'checkbox':
          componentHtml = `
            <div class="form-component" id="${id}" data-type="${type}">
              <button class="delete-btn">×</button>
              <label><input type="checkbox"> 复选框</label>
            </div>
          `;
          break;
        case 'radio':
          componentHtml = `
            <div class="form-component" id="${id}" data-type="${type}">
              <button class="delete-btn">×</button>
              <label><input type="radio" name="radio-group"> 单选框</label>
            </div>
          `;
          break;
        case 'button':
          componentHtml = `
            <div class="form-component" id="${id}" data-type="${type}">
              <button class="delete-btn">×</button>
              <button type="button">按钮</button>
            </div>
          `;
          break;
      }
      
      // 添加到设计区域
      designArea.insertAdjacentHTML('beforeend', componentHtml);
      
      // 获取新添加的组件
      const newComponent = document.getElementById(id);
      
      // 添加点击事件
      newComponent.addEventListener('click', (e) => {
        if (e.target.classList.contains('delete-btn')) {
          newComponent.remove();
          if (selectedComponent === newComponent) {
            selectedComponent = null;
            clearPropertyPanel();
          }
        } else {
          selectComponent(newComponent);
        }
        e.stopPropagation();
      });
      
      // 选中新添加的组件
      selectComponent(newComponent);
    }
    
    // 选中组件
    function selectComponent(component) {
      // 取消之前选中的组件
      if (selectedComponent) {
        selectedComponent.classList.remove('selected');
      }
      
      // 选中新组件
      selectedComponent = component;
      component.classList.add('selected');
      
      // 更新属性面板
      updatePropertyPanel(component);
    }
    
    // 更新属性面板
    function updatePropertyPanel(component) {
      const type = component.dataset.type;
      document.getElementById('componentType').value = type;
      
      // 设置默认名称和标签
      document.getElementById('componentName').value = component.id;
      document.getElementById('componentLabel').value = component.querySelector('label')?.textContent.trim() || '';
      
      // 处理选项
      const optionsContainer = document.getElementById('optionsContainer');
      if (type === 'select' || type === 'checkbox' || type === 'radio') {
        optionsContainer.style.display = 'block';
        const options = Array.from(component.querySelectorAll('option') || 
                         Array.from(component.querySelectorAll('label'))
                         .map(el => el.textContent.trim())
                         .filter(text => text && !text.startsWith('×')));
        document.getElementById('componentOptions').value = options.join('\n');
      } else {
        optionsContainer.style.display = 'none';
      }
    }
    
    // 清空属性面板
    function clearPropertyPanel() {
      document.getElementById('componentType').value = '';
      document.getElementById('componentName').value = '';
      document.getElementById('componentLabel').value = '';
      document.getElementById('componentOptions').value = '';
      document.getElementById('optionsContainer').style.display = 'none';
    }
    
    // 更新组件属性
    function updateComponentProperty() {
      if (!selectedComponent) return;
      
      const name = document.getElementById('componentName').value;
      const label = document.getElementById('componentLabel').value;
      const options = document.getElementById('componentOptions').value.split('\n');
      
      // 更新组件ID
      selectedComponent.id = name;
      
      // 更新标签
      const labelElement = selectedComponent.querySelector('label');
      if (labelElement) {
        if (selectedComponent.dataset.type === 'checkbox' || selectedComponent.dataset.type === 'radio') {
          const input = labelElement.querySelector('input');
          labelElement.innerHTML = '';
          labelElement.appendChild(input);
          labelElement.appendChild(document.createTextNode(' ' + label));
        } else {
          labelElement.textContent = label;
        }
      }
      
      // 更新选项
      if (selectedComponent.dataset.type === 'select') {
        const select = selectedComponent.querySelector('select');
        select.innerHTML = options.map(opt => `<option>${opt}</option>`).join('');
      } else if (selectedComponent.dataset.type === 'checkbox' || selectedComponent.dataset.type === 'radio') {
        // 对于复选框和单选框，我们可能需要更复杂的处理
        // 这里简化为不处理多个选项
      }
    }
    
    // 生成JSON
    function generateJson() {
      const designArea = document.getElementById('designArea');
      const components = Array.from(designArea.querySelectorAll('.form-component'));
      
      const formData = {
        title: '我的表单',
        description: '这是一个自动生成的表单',
        components: components.map(component => {
          const type = component.dataset.type;
          const componentData = {
            id: component.id,
            type: type,
            label: component.querySelector('label')?.textContent.trim() || ''
          };
          
          if (type === 'select') {
            const options = Array.from(component.querySelectorAll('option'))
                              .map(opt => opt.textContent.trim());
            componentData.options = options;
          }
          
          return componentData;
        })
      };
      
      document.getElementById('jsonOutput').textContent = JSON.stringify(formData, null, 2);
      return formData;
    }
    
    // 保存表单
    async function saveForm() {
      const formData = generateJson();
      try {
        await window.electronAPI.saveForm(formData);
        alert('表单保存成功!');
      } catch (error) {
        alert('保存失败: ' + error.message);
      }
    }
    
    // 加载表单
    async function loadForm() {
      try {
        const formData = await window.electronAPI.loadForm();
        if (formData) {
          // 清空设计区域
          document.getElementById('designArea').innerHTML = '<h3>设计区域</h3>';
          
          // 重新创建组件
          formData.components.forEach(comp => {
            addComponentToDesignArea(comp.type, 0, 0);
            const component = document.getElementById(comp.id);
            if (component) {
              // 这里需要根据保存的数据设置组件属性
              // 简化处理，实际需要更详细的恢复逻辑
            }
          });
          
          document.getElementById('jsonOutput').textContent = JSON.stringify(formData, null, 2);
          alert('表单加载成功!');
        }
      } catch (error) {
        alert('加载失败: ' + error.message);
      }
    }
    
    // 点击设计区域空白处取消选中
    document.getElementById('designArea').addEventListener('click', (e) => {
      if (e.target.id === 'designArea') {
        if (selectedComponent) {
          selectedComponent.classList.remove('selected');
          selectedComponent = null;
          clearPropertyPanel();
        }
      }
    });
  });