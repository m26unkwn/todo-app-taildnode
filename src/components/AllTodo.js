import { useMemo } from "react";
import { Todo } from "./Todo";
import { filterTags } from "../utils";

export const AllTodo = ({ todoList, addTagIntoTags, tags, setTodoList }) => {
  const filteredTodoList = useMemo(
    () => filterTags(todoList, tags),
    [todoList, tags],
  );

  const completedTodoList = (todo) => {
    todo["completed"] = true;
    const activeTodoList = todoList.filter(
      (currentTodo) => currentTodo.id !== todo.id,
    );

    const compltedTodoList = todoList.filter((todo) => todo.complted);
    const allCompltedTodoList = [todo, compltedTodoList];

    const completedTodoList = activeTodoList.concat(allCompltedTodoList);
    setTodoList(completedTodoList);
  };

  const resetTodoList = () => {
    setTodoList([]);
    localStorage.removeItem("todoList");
  };

  return (
    <div className='todo-container'>
      {filteredTodoList.length > 0 ? (
        <>
          {" "}
          <button className='todo-reset' onClick={resetTodoList}>
            Reset TODO
          </button>
          <div className='active-todo'>
            {filteredTodoList.map((todo) => (
              <Todo
                todo={todo}
                key={todo.id}
                todoItem={todo.todo}
                tags={tags}
                addTagsIntoTags={addTagIntoTags}
                todoList={todoList}
                setTodoList={setTodoList}
                completedTodoList={completedTodoList}
              />
            ))}
          </div>
        </>
      ) : (
        <h1>Please Add Some Todo</h1>
      )}
    </div>
  );
};
