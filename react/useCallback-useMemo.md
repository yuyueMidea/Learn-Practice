**useCallback,useMemo具体的使用场景**
- useCallback记忆的是：函数本身的引用；返回一个“引用稳定”的函数；只要deps不变，返回的函数引用旧不变。
- useMemo记忆的是：某次计算得到的值；返回一个“引用稳定”的值（对象、数组或计算结果等），只要deps不变，就复用上一次的计算结果，不重新计算。

 react中很多“避免重复渲染”的手段，都依赖于“浅比较”：
 - React.memo(Component)：比较 props 是否变化（浅比较）
 - useEffect(..., deps)：比较依赖项是否变化（Object.is）
 - useMemo/useCallback：比较依赖项是否变化（Object.is）
 - 而在JavaScript中：
    - {} !== {}（每次新建对象引用都变）
    - () => {} !== () => {}（每次新建函数引用都变）
  
 - useMemo/useCallback 的价值，本质就是：在需要浅比较的地方，避免“引用变化”造成的额外工作。
