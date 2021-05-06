import { useState } from 'react';

export function InputTodo({addTodo}) {

    const [ newTodo, setNewTodo ] = useState('');
    const changeTodo = (e) => {
        setNewTodo((e.currentTarget.value))
    }

    const handleSubmit = (e) => {
        if (e.key === "Enter" && newTodo.trim()!=="") {
            e.preventDefault();
            addTodo(newTodo);
            setNewTodo("");
        }
    }

    return <input
        className="new-todo"
        placeholder="What needs to be done?"
        value={newTodo}
        onChange = {changeTodo}
        onKeyPress={handleSubmit}
    />;
}
