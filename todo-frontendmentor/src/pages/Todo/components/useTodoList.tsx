import { useTodoContext } from "contexts/TodoCtx";

export const useTodoList = () => {
  const { todos, reorderTodos, isListDragable } = useTodoContext();

  const itemsLeft = todos.reduce((total, item) => {
    if (!item.active) {
      total += 1;
    }
    return total;
  }, 0);

  return {
    models: {
      todos,
      itemsLeft,
    },
    operations: {
      reorderTodos,
      isListDragable,
    },
  } as const;
};
