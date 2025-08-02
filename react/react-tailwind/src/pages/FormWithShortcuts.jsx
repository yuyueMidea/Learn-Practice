import React, { useRef, useEffect } from 'react';

export default function FormWithShortcuts() {
  const input1Ref = useRef(null);
  const input2Ref = useRef(null);
  const input3Ref = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      // 检查是否按下了Alt键和数字键
      if (e.altKey) {
        switch (e.key) {
          case '7':
            input1Ref.current.focus();
            break;
          case '8':
            input2Ref.current.focus();
            break;
          case '9':
            input3Ref.current.focus();
            break;
          default:
            break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);
  const fieldList = [
    {id: 4, label: `txt_${1}`, type: 'text'},
    {id: 5, label: `txt_${2}`, type: 'text'},
    {id: 6, label: `txt_${3}`, type: 'text'},
    {id: 7, label: `txt_${4}`, type: 'text'},
  ]

  return (
    <div className="form_wrapper">
      <DynamicForm fields={fieldList}/>
      <hr />
      <form>
        <div>
          <label>字段1 (Alt+7):</label>
          <input ref={input1Ref} type="text" className='w-[200px] p-2 m-2 rounded border bg-white border-gray-300 text-gray-900'/>
        </div>
        <div>
          <label>字段2 (Alt+8):</label>
          <input ref={input2Ref} type="text" className='w-[200px] p-2 m-2 rounded border bg-white border-gray-300 text-gray-900' />
        </div>
        <div>
          <label>字段3 (Alt+9):</label>
          <input ref={input3Ref} type="text" className='w-[200px] p-2 m-2 rounded border bg-white border-gray-300 text-gray-900' />
        </div>
      </form>
    </div>
  );
}

//对于动态生成的表单，你可以创建一个通用的快捷键处理方案
function DynamicForm({ fields }) {
  const inputRefs = useRef([]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.altKey && e.key >= '1' && e.key <= '9') {
        const index = parseInt(e.key) - 1;
        if (index < inputRefs.current.length) {
          inputRefs.current[index].focus();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <form>
      {fields.map((field, index) => (
        <div key={field.id}>
          <label>
            {field.label} (Alt+{index + 1}):
            <input
              ref={(el) => (inputRefs.current[index] = el)}
              type={field.type || 'text'}
              className='w-[200px] p-2 m-2 rounded border bg-white border-gray-300 text-gray-900'
            />
          </label>
        </div>
      ))}
    </form>
  );
}