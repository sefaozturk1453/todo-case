import React, { useState } from 'react';
import './TodoList.css';

export default function TodoList() {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Buy groceries', completed: false },
    { id: 2, text: 'Walk the dog', completed: false },
    { id: 3, text: 'Do laundry', completed: false },
    { id: 4, text: 'Call mom', completed: false },
  ]);
  
  const [newTodo, setNewTodo] = useState('');
  const [search, setSearch] = useState('');
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState('');

  const handleAddTodo = () => {
    if (newTodo.trim() === '') return;
    const newItem = {
      id: Date.now(),
      text: newTodo.trim(),
      completed: false,
    };
    setTodos([...todos, newItem]);
    setNewTodo('');
  };

  const handleDelete = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const handleToggleComplete = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const handleEdit = (id, text) => {
    setEditId(id);
    setEditText(text);
  };

  const handleSaveEdit = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, text: editText } : todo
    ));
    setEditId(null);
    setEditText('');
  };

  const filteredTodos = todos.filter(todo =>
    todo.text.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="todo-container">
      <h2>TO-DO LIST</h2>
      <input
        type="text"
        placeholder="Search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-input"
      />
      <ul>
        {filteredTodos.map(todo => (
          <li key={todo.id} className="todo-item">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => handleToggleComplete(todo.id)}
            />
            {editId === todo.id ? (
              <input
                type="text"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                onBlur={() => handleSaveEdit(todo.id)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSaveEdit(todo.id);
                }}
              />
            ) : (
              <span className={todo.completed ? 'completed' : ''}>
                {todo.text}
              </span>
            )}
            <button onClick={() => handleEdit(todo.id, todo.text)}>✏️</button>
            <button onClick={() => handleDelete(todo.id)}>🗑️</button>
          </li>
        ))}
      </ul>
      <div className="add-todo">
        <input
          type="text"
          placeholder="+ Add to-do"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleAddTodo();
          }}
        />
        <button onClick={handleAddTodo}>➕</button>
      </div>
    </div>
  );
}
