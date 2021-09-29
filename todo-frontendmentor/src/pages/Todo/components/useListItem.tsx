import { useTodoContext } from "contexts/TodoCtx";
import { Todo } from "types";

export const useListItem = (todoItem: Todo) => {
  const { updateTodo, deleteTodo } = useTodoContext();

  const { active, task } = todoItem;

  const handleChange = () => {
    const todoToUpdate = { _id: todoItem._id, active: !active };
    updateTodo(todoToUpdate);
  };

  const handleDeleteClick = () => {
    deleteTodo(todoItem._id);
  };

  return { active, task, handleChange, handleDeleteClick } as const;
};
