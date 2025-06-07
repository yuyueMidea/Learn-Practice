"use client"
import { useEffect, useState } from 'react';
import styles from './styles.module.css'
interface Post {
    id: number;
    title: string;
    body: string;
};
// 编写获取数据的方法
const ApiFetchList = ()=> {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string|null>(null);
    useEffect(()=>{
        const fetchPosts = async()=>{
            try {
                const response = await fetch('https://jsonplaceholder.typicode.com/posts');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                // console.log('data_: ', data)
                setPosts(data.slice(0, 5));            //只要取值前面几条
                
            } catch (err) {
                console.error('err: ', err)
                setError(err instanceof Error ? err.message : 'Unknown error');
            } finally {
                setLoading(false)
            }
        }
        fetchPosts();
    }, []);
    if (loading) return <div className="p-4">Loading...</div>;
    if (error) return <div className={styles.redText}>Error: {error}</div>;
    return (
        <div className={styles.postWrapper}>
            <h2>Posts from API</h2>
            <ul className= {styles.postList}>
                {posts.map((post) =>(
                    <li key={post.id}>
                        <h3>{post.title}</h3>
                        <p>{post.body}</p>
                    </li>
                ))}
            </ul>
        </div>
    )
}
export default ApiFetchList;