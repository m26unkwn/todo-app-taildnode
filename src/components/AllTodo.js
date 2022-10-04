import { useMemo } from "react";
import { Todo } from "./Todo";
import { filterTags } from "../utils";
import { v4 as uuidv4 } from "uuid";

export const AllTodo = ({ todoList, addTagIntoTags, tags, setTodoList }) => {
  const filteredTodoList = useMemo(
    () => filterTags(todoList, tags),
    [todoList, tags]
  );

  const completedTodoList = (todo) => {
    const activeTodoList = todoList.filter(
      (currentTodo) => currentTodo.id !== todo.id
    );
    const compltedTodoList = todoList.filter((todo) => todo.complted);
    todo["completed"] = true;
    todo["id"] = uuidv4();

    const allCompltedTodoList = [...compltedTodoList, todo];
    const completedTodoList = [...activeTodoList, ...allCompltedTodoList];
    setTodoList(completedTodoList);
  };

  const resetTodoList = () => {
    setTodoList([]);
    localStorage.removeItem("todoList");
  };

  return (
    <div className="todo-container">
      {filteredTodoList.length > 0 ? (
        <>
          {" "}
          <button className="todo-reset" onClick={resetTodoList}>
            Reset TODO
          </button>
          <div className="active-todo">
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
