import TodoItem from "./TodoItem"
import { Todo } from "./types"
interface TodoListProps {
    todos: Array<Todo>;
    toggleTodo: (id: number) => void;
    deleteTodo: (id: number) => void;
}

export default function TodoList({todos, toggleTodo, deleteTodo}: TodoListProps) {
    return (
        <ul className="itemListWrapper">
            {todos.map(todo => (
                <TodoItem key={todo.id} todo={todo} toggleTodo={toggleTodo} deleteTodo={deleteTodo}></TodoItem>
            ))}
        </ul>
    )
}