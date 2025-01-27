import { useState } from "react";
import "./Todo.css";

function Todo() {
    const [input, setInput] = useState('');
    const [todos, setTodos] = useState([]);

    function getInput(e) {
        setInput(e.target.value);
    }

    function handleTodoAdd() {
        if (input.trim()) {
            setTodos([...todos, { task: input, id: Date.now(), completed: false }]);
            setInput('');
        }
    }

    function handleTodoDelete(id) {
        setTodos(todos.filter(todo => todo.id !== id));
    }

    function handleTodoEdit(id) {
        const newTask = prompt("Edit your task:", todos.find(todo => todo.id === id).task);
        if (newTask !== null) {
            setTodos(todos.map(todo => todo.id === id ? { ...todo, task: newTask } : todo));
        }
    }

    function handleTodoComplete(id) {
        setTodos(todos.map(todo => todo.id === id ? { ...todo, completed: true } : todo));
    }

    return (
        <div className="todo-container">
            <div className="todo-input">
                <input type="text" placeholder="Enter your Task" onChange={getInput} value={input} />
                <button onClick={handleTodoAdd}>Add</button>
            </div>

            <section className="tasks">
                <h1>Tasks</h1>
                <ul>
                    {todos.filter(item => !item.completed).map((item) => (
                        <li key={item.id}>
                            {item.task}
                            <button onClick={() => handleTodoComplete(item.id)} className="com">Complete</button>
                            <button onClick={() => handleTodoEdit(item.id)}>Edit</button>
                            <button onClick={() => handleTodoDelete(item.id)}>Delete</button>
                        </li>
                    ))}
                </ul>
            </section>
            
            <section className="completed-tasks">
                <h1>Completed</h1>
                <ul>
                    {todos.filter(item => item.completed).map((item) => (
                        <li key={item.id} className="completed">{item.task}</li>
                    ))}
                </ul>
            </section>
        </div>
    );
}

export default Todo;
