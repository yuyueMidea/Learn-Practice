//==========B) 更推荐的写法：把“每行”存成对象行（更好更新 & 更贴近后端）===========
你现在 UI 结构是 cell[]，但你的后端结构其实是： { page: 1, idNo: 'x', dde1: 'x1', dde2: 'x2' }
推荐前端 store 也用：
```
type RowObj = { page: number; _rid: string; [k: string]: any };
type GroupData2 = Record<number, RowObj[]>;
```

更新会简单很多：
```
const updateCell2 = (page: number, rowIndex: number, key: string, value: any) => {
  setGroupdata(prev => {
    const pageRows = prev[page];
    if (!pageRows?.[rowIndex]) return prev;

    const nextRow = { ...pageRows[rowIndex], [key]: value };
    const nextPageRows = pageRows.slice();
    nextPageRows[rowIndex] = nextRow;

    return { ...prev, [page]: nextPageRows };
  });
};
```
渲染时再把 RowObj 映射成你的 cell 列表即可（用 columns 定义）：
```
const columns = [
  { key: "idNo", type: "input" },
  { key: "dde1", type: "input" },
  { key: "dde2", type: "input" },
];

const rowToCells = (rowObj) =>
  columns.map(col => ({ key: col.key, type: col.type, value: rowObj[col.key] }));
```

为什么更推荐？
- 更新不需要 findIndex，O(1) 直接改字段
- 保存/提交不需要再“反序列化”，直接 flatten
- 更容易做 footer 汇总（直接对 row.dde1 求和）
