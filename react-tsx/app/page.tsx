'use client'
import { useState } from "react";
import AddTodo from "./components/Addtodo";
import TodoFilter from "./components/TodoFilter";
import TodoItem from "./components/TodoItem";
import TodoList from "./components/Todolist";

import { Todo } from "./components/types";

export default function Home() {
  const [filter, setFilter] = useState('all')     //标记按钮选择的状态的变量【全部，已完成，待办等三种状态】
  const [todos, setTodos] = useState<Todo []>([])
  const addTodo = (inputtext: string)=>{
    const newTodo = {
      id: new Date().getTime(),
      text: inputtext,
      completed: false
    }
    setTodos([...todos, newTodo])
  }
  const deleteTodo = (cid: number)=>{
    const FilterList = todos.filter(v=>v.id !==cid)
    setTodos(FilterList)
  }
  const toggleTodo = (cid: number)=>{
    setTodos(todos.map(v=>{
      if(v.id ==cid) {
        v.completed = !v.completed
      }
      return v
    }))
  }
  const getFilteredTodos = ()=>{
    switch(filter) {
      case 'all':
        return todos
      case 'completed':
        return todos.filter(v=>v.completed)
      case 'active':
        return todos.filter(v=>!v.completed)
      default:
        return todos
    }
  }
  return (
    <div className="wrapper1">
      <h1>TodoList</h1>
      <AddTodo addTodo={addTodo}></AddTodo>
      <TodoList todos={getFilteredTodos()} toggleTodo={toggleTodo} deleteTodo={deleteTodo}></TodoList>
      <TodoFilter setFilter={setFilter}></TodoFilter>
    </div>
  );
}
