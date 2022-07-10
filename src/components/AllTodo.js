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
    const completedTodoList = activeTodoList.concat(todo);
    setTodoList(completedTodoList);
  };

  return (
    <div className='todo-container'>
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
    </div>
  );
};
