import React from "react";

export const Todo = ({
  todoItem,
  todo,
  tags,
  addTagsIntoTags,
  completedTodoList,
}) => {
  const todoValue = todoItem?.map((value) => {
    if (value[0] === "#" && value.length > 0) {
      return (
        <span
          onClick={(e) => addTagsIntoTags(e, value)}
          className={tags.includes(value) ? "selected tag" : "tag"}>
          {value}{" "}
        </span>
      );
    } else {
      return value + " ";
    }
  });

  return (
    <div
      className={todo.completed ? "completed todo-card " : "todo-card"}
      onClick={() => {
        todo.completed ?? completedTodoList(todo);
      }}>
      {todo.completed && <p className='todo-completed'>completed</p>}
      {todoValue}
    </div>
  );
};
