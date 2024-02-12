import React, { useState, useEffect } from 'react';
import './App.css';
import { FaRegTrashAlt } from "react-icons/fa";
import { MdGridView } from "react-icons/md";
import { BsViewStacked } from "react-icons/bs";

function App() {
  const [todos, setTodos] = useState(() => {
    const saveTodos = localStorage.getItem("todolist");
    if (saveTodos) {
      return JSON.parse(saveTodos);
    } else {
      return [];
    }
  });
  const [todo, setTodo] = useState("");
  const [checkedItems, setCheckedItems] = useState({});
  const [isGridView, setIsGridView] = useState(false); 

  useEffect(() => {
    localStorage.setItem("todolist", JSON.stringify(todos));
  }, [todos]);

  function handleInputChange(e) {
    setTodo(e.target.value);
    // if (e.target.value.length <= 15) {
    //   setTodo(e.target.value);
    // } else {
    //   alert("กรอกข้อความเกินกำหนด (15 ตัว)")
    // }
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (todo.trim() !== "") {
      setTodos([
        ...todos,
        {
          id: todos.length + 1,
          text: todo.trim(),
          updatedAt: new Date().toISOString()
        }
      ]);
      setTodo("");
    } else {
      alert("กรุณากรอกข้อความ");
    }
  }

  function handleRemove(id) {
    const confirmDel = window.confirm("ต้องการจะลบรายการนี้ใช่หรือไม่");
    if (confirmDel) {
      const removeItem = todos.filter((todo) => { return todo.id !== id });
      setTodos(removeItem);
      alert("ลบเสร็จสิ้น");
    } else {
      alert("ยกเลิกการลบ");
    }
  }

  function handleCheckboxChange(id) {
    setCheckedItems({
      ...checkedItems,
      [id]: !checkedItems[id]
    });
  }

  function toggleStackView() {
    setIsGridView(false);
  }
  
  function toggleGridView() {
    setIsGridView(true);
  }

  function formatDate(timestamp) {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString();
    const day = date.getDate().toString();
    const hours = date.getHours().toString();
    const minutes = date.getMinutes().toString().padStart(2, '0');

    return `${day}/${month}/${year}  ${hours}:${minutes}`;
  };

  return (
    <div className="App">
      <h2>Todo list</h2>

      <div className="Add">
        <input
          type="text"
          placeholder="type something..."
          value={todo}
          onChange={handleInputChange}
        />
        <button className="btnAdd" onClick={handleSubmit}>Add</button>
      </div>

      <div className="toggle-view">
        <BsViewStacked className={!isGridView ? "btnstackview active" : "btnstackview"} onClick={toggleStackView} />
        <MdGridView className={isGridView ? "btngridview active" : "btngridview"} onClick={toggleGridView} />
      </div>

      
      <div className={!isGridView ? 'todo-list' : 'todo-list grid'}>
        {todos.map((todoItem) => (
          <div key={todoItem.id} className={`todo-item ${checkedItems[todoItem.id] ? 'completed' : ''}`}>
            <input
              type="checkbox"
              checked={checkedItems[todoItem.id]}
              onChange={() => handleCheckboxChange(todoItem.id)}
            />
            <span className="text">{todoItem.text}</span>
            <span className="date">{formatDate(todoItem.updatedAt)}</span>
            <FaRegTrashAlt className="trashicon" style={{ backgroundColor: "pink" }} onClick={() => handleRemove(todoItem.id)} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
