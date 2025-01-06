    import React, { useState, useEffect } from 'react';
    import './App.css';

    function App() {
      const [todos, setTodos] = useState([]);
      const [newTodo, setNewTodo] = useState('');

      useEffect(() => {
        const storedTodos = JSON.parse(localStorage.getItem('todos')) || [];
        setTodos(storedTodos);
      }, []);

      useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
      }, [todos]);

      const addTodo = () => {
        if (newTodo.trim() !== '') {
          setTodos([...todos, { text: newTodo, completed: false }]);
          setNewTodo('');
        }
      };

      const toggleComplete = (index) => {
        const updatedTodos = [...todos];
        updatedTodos[index].completed = !updatedTodos[index].completed;
        setTodos(updatedTodos);
      };

      const deleteTodo = (index) => {
        const updatedTodos = todos.filter((_, i) => i !== index);
        setTodos(updatedTodos);
      };

      const editTodo = (index, newText) => {
        const updatedTodos = [...todos];
        updatedTodos[index].text = newText;
        setTodos(updatedTodos);
      };

      return (
        <div className="app-container">
          <h1>To-Do List</h1>
          <div className="input-container">
            <input
              type="text"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              placeholder="Add a new to-do..."
            />
            <button onClick={addTodo}>Add</button>
          </div>
          <ul className="todo-list">
            {todos.map((todo, index) => (
              <li key={index} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleComplete(index)}
                />
                <span
                  contentEditable="true"
                  onBlur={(e) => editTodo(index, e.target.textContent)}
                >
                  {todo.text}
                </span>
                <button onClick={() => deleteTodo(index)}>Delete</button>
              </li>
            ))}
          </ul>
        </div>
      );
    }

    export default App;
