export const filterTags = (todoList, tags) => {
  const allTodo = [...todoList];
  if (tags.length > 0) {
    // eslint-disable-next-line
    return allTodo.filter((todoItem) => {
      for (let index = 0; index < todoItem.tags.length; index++) {
        if (tags.includes(todoItem.tags[index])) {
          return todoItem;
        }
      }
    });
  }
  return allTodo;
};
