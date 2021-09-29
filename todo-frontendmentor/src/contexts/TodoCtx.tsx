import React, { createContext, useContext, useEffect, useState } from "react";
import { Todo, FilterStatus } from "types";
import {
  useCreateTodo,
  useGetTodos,
  useRemoveCompleted,
  useRemoveTodo,
  useUpdateTodo,
  useReorderTodos,
} from "api/Todo";

const TodoCtx = createContext<TodoCtxValue | null>(null);

const TodoCtxProvider: React.FC = ({ children }) => {
  const value = useTodos();

  return <TodoCtx.Provider value={value}>{children}</TodoCtx.Provider>;
};

type TodoCtxValue = ReturnType<typeof useTodos>;

const useTodos = () => {
  const { createTodo } = useCreateTodo();
  const { removeTodo } = useRemoveTodo();
  const { updateTodo: toggleActive } = useUpdateTodo();
  const { reorderTodos: _reorderTodos } = useReorderTodos();

  const { removeCompletedTodos: _removeCompletedTodos } = useRemoveCompleted();

  const [filter, setNewFilter] = useState<FilterStatus>(FilterStatus.ALL);
  const { todos: retrivedTodos, isLoading } = useGetTodos();
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    setTodos(retrivedTodos);
  }, [retrivedTodos]);

  const setFilter = async (filter: FilterStatus) => {
    setNewFilter(filter);
  };

  const addTodo = async (newTodo: Omit<Todo, "_id">) => {
    const to = await createTodo(newTodo);
    // todo naming
    if (to) {
      setTodos((prev) => [...prev, to]);
    }
  };

  const updateTodo = (updatedTodo: Partial<Todo>) => {
    toggleActive(updatedTodo);

    const newState = todos.map((_todo) => {
      if (updatedTodo._id === _todo._id) {
        _todo.active = !_todo.active;
      }
      return _todo;
    });
    setTodos(newState);
  };

  const getReordered = (
    oldIndex: number,
    newIndex: number,
    inc: boolean = true
  ) => {
    const shouldIncrementDecrement = (index: number) => {
      return inc
        ? index >= newIndex && index < oldIndex
        : newIndex >= index && oldIndex < index;
    };

    const incrementer = inc ? 1 : -1;

    const newState = todos.map((todo, index) => {
      if (shouldIncrementDecrement(index)) {
        todo.order = todo.order + incrementer;
      } else if (todo.order === oldIndex) {
        todo.order = newIndex;
      }
      return todo;
    });

    newState.sort((a, b) => a.order - b.order);

    return newState;
  };

  const reorderTodos = async (oldIndex: number, newIndex: number) => {
    const temp = oldIndex > newIndex;
    const newState = getReordered(oldIndex, newIndex, temp);

    setTodos(newState);
    await _reorderTodos(oldIndex, newIndex);
  };

  const deleteTodo = async (id: string) => {
    const resp = await removeTodo(id);

    if (resp) {
      const newState = todos.filter(({ _id }) => id !== _id);
      setTodos(newState);
    }
  };

  const removeCompletedTodos = async () => {
    const resp = await _removeCompletedTodos();

    if (resp) {
      const newState = todos
        .filter(({ active }) => !active)
        .map((todo, index) => {
          todo.order = index;
          return todo;
        });
      setTodos(newState);
    }
  };

  const isListDragable = () => {
    return filter !== FilterStatus.ALL;
  };

  console.log(todos);

  return {
    todos: todos.filter((todo) => {
      if (filter === FilterStatus.ALL) {
        return true;
      }

      if (filter === FilterStatus.ACTIVE) {
        return !todo.active;
      }

      return todo.active;
    }),
    filter,
    isLoading,
    totalAmount: todos.length,
    setFilter,
    addTodo,
    updateTodo,
    deleteTodo,
    removeCompletedTodos,
    reorderTodos,
    isListDragable,
  };
};

const useTodoContext = () => {
  const ctx = useContext(TodoCtx);

  if (!ctx) {
    throw new Error("Issue with todo context");
  }

  return ctx;
};

export { useTodoContext, TodoCtxProvider };
