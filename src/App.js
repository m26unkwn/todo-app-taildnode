import { useRef, useState, useEffect, useCallback } from "react";
import "./App.css";
import { AllTodo } from "./components/AllTodo";
import { v4 as uuidv4 } from "uuid";

const initialTodoList = JSON.parse(localStorage.getItem("todoList")) ?? [];

function App() {
  const [todoList, setTodoList] = useState(initialTodoList);
  const [tags, setTags] = useState([]);

  const todoRef = useRef();

  const addTodoIntoList = useCallback((e) => {
    e.preventDefault();
    const todo = todoRef.current.value;
    if (!todo.trim()) {
      alert("please enter todo");
    } else {
      const splitTheValue = todo.split(" ");
      const tags = splitTheValue.filter((value) => value[0] === "#");
      setTodoList((prev) => [
        {
          todo: splitTheValue,
          tags,
          id: uuidv4(),
        },
        ...prev,
      ]);
      todoRef.current.value = "";
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todoList", JSON.stringify(todoList));
  }, [todoList]);

  const addTagIntoTags = useCallback(
    (e, tag) => {
      e.stopPropagation();
      if (tags.includes(tag)) {
        const filterTag = tags.filter((tagValue) => tagValue !== tag);
        setTags(filterTag);
      } else {
        setTags((prev) => [...prev, tag]);
      }
    },
    [tags],
  );

  return (
    <div className='app'>
      <header className='app-header'>
        <h1>Todo App</h1>
      </header>
      <form onSubmit={addTodoIntoList} className='input-container'>
        <input ref={todoRef} type='text' placeholder='Enter Todo' />
        <button type='submit' onClick={addTodoIntoList}>
          Add Todo
        </button>
      </form>
      <div className='todo-container'>
        <AllTodo
          todoList={todoList}
          tags={tags}
          addTagIntoTags={addTagIntoTags}
          setTodoList={setTodoList}
        />
      </div>
    </div>
  );
}

export default App;
