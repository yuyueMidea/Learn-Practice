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
          case '1':
            input1Ref.current.focus();
            break;
          case '2':
            input2Ref.current.focus();
            break;
          case '3':
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

  return (
    <form>
      <div>
        <label>字段1 (Alt+1):</label>
        <input ref={input1Ref} type="text" className='w-[200px] px-2 py-1 rounded border bg-white border-gray-300 text-gray-900'/>
      </div>
      <div>
        <label>字段2 (Alt+2):</label>
        <input ref={input2Ref} type="text" className='w-[200px] px-2 py-1 rounded border bg-white border-gray-300 text-gray-900' />
      </div>
      <div>
        <label>字段3 (Alt+3):</label>
        <input ref={input3Ref} type="text" className='w-[200px] px-2 py-1 rounded border bg-white border-gray-300 text-gray-900' />
      </div>
    </form>
  );
}