import { Button, Input, message, Modal, notification, Space } from 'antd';
import { useEffect, useState } from 'react';
import BaseList from './BaseList';
const { TextArea } = Input;

export default function BlogList() {
    const API_URL = 'http://localhost:3001/api/blogs';
    const [blogs, setBlogs] = useState([]);
    const fetchBlogList = () => {
        fetch(API_URL)
            .then(res => res.json())
            .then(setBlogs);
    }
    useEffect(() => {
        fetchBlogList();
    }, []);
    const [blogId, setblogId] = useState('')
    const [title, settitle] = useState('');
    const [summary, setsummary] = useState('');
    const [content, setcontent] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const handleAdd = ()=>{
        setblogId('');
        setIsModalOpen(true);
    }
    const handleUpdate = (item)=>{
        setblogId(item.id);
        fetch(`${API_URL}/${item.id}`)
            .then(res => res.json())
            .then(data => {
                settitle(data.title);
                setsummary(data.summary);
                setcontent(data.content);
            }
        );
        setIsModalOpen(true)
    }
    
    const handleDelete = async (item)=>{
        if (window.confirm('确定要删除这条记录吗？' + item.id)) {
            await fetch(`${API_URL}/${item.id}`, { method: 'DELETE' });
            notification.open({ message: '提示', description: 'deleteone' });
            fetchBlogList();
        }
    }
    const handleOk = async()=>{
        if(title==='') return message.warning('请输入!'); 
        const method = blogId ? 'PUT' : 'POST';
        const url = blogId ? `${API_URL}/${blogId}` : API_URL;
        await fetch(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, summary, content}),
        });
        setIsModalOpen(false);
        fetchBlogList();
    }

    return (
        <div className="user-list-wrapper">
            <h2>博客列表管理 <Button type="primary" onClick={handleAdd}>+ 新建博客</Button></h2>
            <Modal title={blogId ? '编辑博客' : '创建新博客'} open={isModalOpen} onOk={handleOk} onCancel={handleCancel} >
                <Space direction="vertical" style={{width: '400px'}}>
                    <Input value={blogId} disabled addonBefore='blogID'/>
                    <Input value={title} onChange={e=>settitle(e.target.value)} id="cname" addonBefore='标题'/>
                    <Input value={summary} onChange={e=>setsummary(e.target.value)} addonBefore='简介'/>
                    <span>正文</span>
                    <TextArea value={content} onChange={e=>setcontent(e.target.value)} autoSize={{ minRows: 4, maxRows: 10 }} />
                </Space>
            </Modal>
            <BaseList items={blogs} renderItem={item =>(
                <div>
                    <div>{item.id}---{item.title}---{item.summary}</div>
                    <div className="btn-list">
                        <Button type="primary" size='small' onClick={()=>handleUpdate(item)}>更新</Button>
                        <Button type="dashed" danger size='small' onClick={()=>handleDelete(item)}>删除</Button>
                    </div>
                </div>
            )}/>

        </div>
    
    );
}
