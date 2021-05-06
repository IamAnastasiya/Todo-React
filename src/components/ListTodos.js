import { TodoItem } from "./TodoItem";

export function ListTodos ({todos, toggleTodo, deleteTodo, updateTodo}) {
    return (
        <ul className="todo-list">
            {todos.map(todo => {
                return (
                    <TodoItem
                        key={todo.id}
                        todo={todo}
                        toggleTodo={toggleTodo}
                        deleteTodo={deleteTodo}
                        updateTodo={updateTodo}
                    />
                )
            })}
        </ul>
    );
}



