"use client"
import { useState } from 'react'
import styles from './styles.module.css'

interface Task {
    id: string;
    text: string;
    completed: boolean;
}

export default function InteractiveTaskList() {
    const [tasks, setTask] = useState<Task []>([
        {id: '12121', text: 'eattt', completed: false},
        {id: '12122', text: 'sleep', completed: false},
        {id: '12123', text: 'walk', completed: false},
    ]);
    const [inputValue, setInputValue] = useState('');
    const addTask = ()=>{
        if (inputValue.trim()) {
            setTask([
                ...tasks,
                {
                    id: Date.now().toString(),
                    text: inputValue,
                    completed: false
                }
            ])
        }
    }
    const deleteTask = (id: string) =>{
        setTask(tasks.filter(task => task.id !== id))
    }
    const toggleTask = (id: string) => {
        setTask(
            tasks.map((task) =>
                task.id === id ? { ...task, completed: !task.completed } : task
            )
        );
    };
    return (
        <div className= {styles.contentWrapper}>
            <h1>待办事项</h1>
            <div className={styles.inputWrapper}>
                <input type="text" value={inputValue}
                placeholder="Add a new task" className={styles.inputTxt}
                onChange={(e) => setInputValue(e.target.value)}
                />
                <button className={styles.addBtn} onClick={addTask}>Add</button>
            </div>
            <ul className={styles.taskwrapper}>
                {tasks.map(task => (
                    <li key={task.id} className={`${task.completed ? styles.doned: ''}` }>
                        <input type="checkbox" checked={task.completed} onChange={e=>toggleTask(task.id)} id={task.id} />
                        <label className={styles.showTxt} htmlFor={task.id}>{task.text}</label>
                        <button className={styles.deleteBtn} onClick={() => deleteTask(task.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    )
}