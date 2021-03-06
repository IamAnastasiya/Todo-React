import React, { useState } from 'react';
import {useEffect} from "react";
import "./styles.css"

//components
import { InputTodo } from "./components/InputTodo";
import { ListTodos } from "./components/ListTodos";
import { Footer } from "./components/Footer";
import { ToggleTodos } from "./components/ToggleTodos";

export default function App() {

    const [todos, setTodos] = useState([])
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [filter, setFilter] = useState("all");

    async function fetchTodosHandler ()  {
        const response = await fetch("http://localhost:3000/todosData");
        const data = await response.json();
        setTodos(data);
    }

    useEffect(() => {
        fetchTodosHandler()
            .then(
                () => {
                    setIsLoaded(true);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }, [])

    async function addTodo (newTodo) {
        const response = await fetch('http://localhost:3000/todosData', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({id: Math.random(), text: newTodo, completed: false})
        })
        const data = await response.json();
        const updatedTodos = [...todos]
        updatedTodos.push(data);
        setTodos(updatedTodos)
        if (!response.ok) {
            throw new Error(error.status);
        }
    }

    async function deleteTodo (id) {
        await fetch(`http://localhost:3000/todosData/${id}`, {
            method: 'DELETE',
        })
        setTodos ((todos) => todos.filter(todo => {
            return todo.id !== Number(id)
        })
        )
    }

    async function updateTodo  (id, text) {
        await fetch(`http://localhost:3000/todosData/${id}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({id: id, text: text, completed: false})
        })
        setTodos((todos) =>
                todos.map((todo) => {
                    if (todo.id === id) {
                        return {
                            ...todo,
                            text
                        };
                    }
                    return todo;
                })
            );
    }

    async function  toggleTodo (id, status)  {
        await fetch(`http://localhost:3000/todosData/${id}`, {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({completed: status})
        })
        let toggled = todos.map(todo => {
            return todo.id === +id ? { ...todo, completed: !todo.completed } : { ...todo};
        });
        setTodos(toggled);
    }

    let notCompletedCount = todos.reduce((count, todo) => {
        if (!todo.completed) count++;
        return count;
    }, 0)

    let completedCount = todos.reduce((count, todo) => {
        if (todo.completed) count++;
        return count;
    }, 0)

    const isCompletedAll = todos.length === completedCount;

    let filteredTodos = todos.filter((todo) => {
        if (filter === "active") {
            return !todo.completed
        } else if (filter === "completed") {
            return todo.completed
        } else {
            return todo;
        }
    })

    const deleteCompleted = () =>  {
        let taskToDelete = []
        let nonCompletedTasks = todos.filter(todo => {
            if (todo.completed) {
                taskToDelete.push(todo.id)
            }
            return !todo.completed
        })
        setTodos(nonCompletedTasks);
        taskToDelete.map (async (id) => {
            await fetch(`http://localhost:3000/todosData/${id}`,{
                method: 'DELETE',
            })
        })
    }

    const toggleAllTodos = () => {
        let allToggled = todos.every(todo => todo.completed);
        todos.map  (async (todo) => {
            await fetch(`http://localhost:3000/todosData/${todo.id}`, {
                method: 'PATCH',
                headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
                body: JSON.stringify({completed: !allToggled})
            })
        })
        setTodos(
            todos.map( (todo) => ({
                    ...todo,
                    completed: !allToggled
                })
            ))
    }


    if (error) {
        return <div>????????????: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>????????????????...</div>;
    } else {
        return (
            <section className="todoapp">
                <header className="header">
                    <h1>todos</h1>
                    <InputTodo addTodo={addTodo}/>
                </header>
                <section className="main">
                    {todos.length > 0 && (<ToggleTodos
                        isCompletedAll={isCompletedAll}
                        toggleAllTodos={toggleAllTodos}
                    />)}
                    <ListTodos
                        todos={filteredTodos}
                        toggleTodo={toggleTodo}
                        deleteTodo={deleteTodo}
                        updateTodo={updateTodo}
                    />
                </section>
                {todos.length > 0 &&
                (<Footer
                    notCompletedCount={notCompletedCount}
                    filter={filter}
                    setFilter={setFilter}
                    completedCount={completedCount}
                    deleteCompleted={deleteCompleted}
                />)}
            </section>
        );
    }
}

