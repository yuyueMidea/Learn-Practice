import styles from './styles.module.css'

interface Item {
    id: number;
    name: string;
    price: number;
}
const items: Item[] = [
    { id: 1, name: 'Apple', price: 1.99 },
    { id: 2, name: 'Banana', price: 0.99 },
    { id: 3, name: 'Orange', price: 2.49 },
    { id: 4, name: 'Apple', price: 1.99 },
    { id: 5, name: 'Banana', price: 0.99 },
    { id: 6, name: 'Orange', price: 2.49 },
    { id: 7, name: 'Apple', price: 1.99 },
    { id: 8, name: 'Banana', price: 0.99 },
    { id: 9, name: 'Orange', price: 2.49 },
    { id: 10, name: 'Apple', price: 1.99 },
    { id: 11, name: 'Banana', price: 0.99 },
    { id: 12, name: 'Orange', price: 2.49 },
];
export default function Goods() {
    const arrlist1 = [1,2,3,4,5,6,7,8,9]
    return (
        <div className= {styles.goodsWrapper}>
            <h2>商品列表</h2>
            <ul className={styles.gooddList}>
                {items.map((item) => (
                    <li key={item.id}>
                        <div className="goodItem">
                            <span>{item.name}</span> | 
                            <span>${item.price.toFixed(2)}</span>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}