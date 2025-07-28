export default function BaseList({ items, renderItem }) {
    return (
        <ul className="common-list">
            {items.map((item, idx) =>(
                <li key={idx} className="list-item">{ renderItem ? renderItem(item) : item }</li>
            ))}
        </ul>
    )
}