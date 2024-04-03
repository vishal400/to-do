import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import TodoList from './components/TodoList';

const API_URL = 'https://jsonplaceholder.typicode.com/todos';

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Fetch todos from the API
    axios.get(API_URL)
      .then(response => setTodos(response.data))
      .catch(error => console.error('Error fetching todos:', error));
  }, []);

  const addTodo = () => {
    // Dummy POST request to add a new todo
    axios.post(API_URL, { title: newTodo, completed: false })
      .then(response => setTodos([response.data, ...todos]))
      .catch(error => console.error('Error adding todo:', error));

    setNewTodo('');
  };

  const updateTodo = (id, completed) => {
    // Dummy PUT request to update a todo
    axios.put(`${API_URL}/${id}`, { completed })
      .then(response => {
        const updatedTodos = todos.map(todo =>
          todo.id === id ? { ...todo, completed: response.data.completed } : todo
        );
        setTodos(updatedTodos);
      })
      .catch(error => console.error('Error updating todo:', error));
  };

  const deleteTodo = (id) => {
    // Dummy DELETE request to delete a todo
    axios.delete(`${API_URL}/${id}`)
      .then(() => setTodos(todos.filter(todo => todo.id !== id)))
      .catch(error => console.error('Error deleting todo:', error));
  };

  const toggleDarkMode = () => {
    // Toggle dark mode state
    setDarkMode(!darkMode);

    // Toggle dark-mode class on body
    const body = document.querySelector('body');
    body.classList.toggle('dark-mode');
  };

  return (
    <div className="App">
      <h1>ToDo List</h1>
      <div className="add-todo-section">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="New Todo"
        />
        <button onClick={addTodo}>Add</button>
      </div>
      <div className="todo-container">
        <TodoList todos={todos} onToggle={updateTodo} onDelete={deleteTodo} />
      </div>
      <div className="dark-mode-toggle">
        <label>Dark Mode</label>
        <input type="checkbox" checked={darkMode} onChange={toggleDarkMode} />
      </div>
    </div>
  );
}

export default App;
