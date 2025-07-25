import { useMemo, useState } from "react"

export default function BaseTable({ columns =[], dataSource =[], onRowClick, onSelectChange }) {
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const handleToggleChecked = (checked)=>{
        const allIds = dataSource.map(v=>v.id);
        setSelectedRowKeys(prev => {
            const newKeys = checked ? allIds : [];
            onSelectChange && onSelectChange(newKeys);
            return newKeys;
        })
    }
    const handleCheckboxChange = (id)=>{
        setSelectedRowKeys(prev => {
            const next = prev.includes(id) ? prev.filter(v=> v!==id) : [...prev, id];
            onSelectChange && onSelectChange(next);
            return next;
        })
    }
    const [sortConfig, setsortConfig] = useState({key: null, direction: null});
    const sortedData = useMemo(()=>{
        if(!sortConfig.key) return dataSource;
        return [...dataSource].sort((a, b) => {
            const valA = a[sortConfig.key];
            const valB = b[sortConfig.key];
            if (valA < valB) return sortConfig.direction === 'asc' ? -1 : 1;
            if (valA > valB) return sortConfig.direction === 'asc' ? 1 : -1;
            return 0;
        });
    }, [dataSource, sortConfig])
    const handleSort = (key)=>{
        setsortConfig(prev => {
            if(prev.key === key) {
                return { key: key, direction: prev.direction === 'asc' ? 'desc' :'asc' }
            }
            return { key: key, direction :'asc'}
        })
    }

    return (
        <table className="table-auto w-full border">
            <thead className="bg-gray-100">
                <tr>
                    <th className="p-2 border w-[40px]">
                        <input type="checkbox" checked={sortedData.every((item) => selectedRowKeys.includes(item.id))} onChange={(e) => handleToggleChecked(e.target.checked)}/>
                    </th>
                    {columns.map(col =>(
                        <th key={col.key} className="p-2 border cursor-pointer" onClick={() => handleSort(col.key)}>
                            { col.title }{sortConfig.key === col.key ? (sortConfig.direction === 'asc' ? ' 🔼' : ' 🔽') : ('')}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {sortedData.map((row, i) =>(
                    <tr key={i} onDoubleClick={() => onRowClick?.(row)} className="hover:bg-blue-100 transition">
                        <td className="border px-4 w-[40px]">
                            <input type="checkbox" checked={selectedRowKeys.includes(row.id)} onChange={() => handleCheckboxChange(row.id)} />
                        </td>
                        {columns.map(col =>(
                            <td key={col.key} className="border px-4 py-1">{row[col.key]}</td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    )
}