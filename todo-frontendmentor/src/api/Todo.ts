import { useFetch } from "contexts/FetchCtx";
import { useState, useEffect } from "react";
import { Todo } from "types";

const useGetTodos = (omitInitialRequest: boolean = false) => {
  const [isLoading, setIsLoading] = useState(true);
  const [todos, setTodos] = useState<Todo[]>([]);

  const { get } = useFetch();

  useEffect(() => {
    if (omitInitialRequest) {
      return;
    }
    getTodo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getTodo = async () => {
    setIsLoading(true);
    try {
      const { data } = await get<Todo[]>("todos");
      console.log(data);
      setTodos(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, todos };
};

const useCreateTodo = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { post } = useFetch();

  const createTodo = async (todo: Omit<Todo, "_id">) => {
    const data = todo;
    setIsLoading(true);
    try {
      const response = await post<Todo>("todos", { data });
      return response.data;
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, createTodo };
};

const useUpdateTodo = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { put } = useFetch();

  const updateTodo = async (todo: Partial<Todo>) => {
    const data = todo;
    setIsLoading(true);
    try {
      const { data: response } = await put<Todo>("todos", { data });
      return response;
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, updateTodo };
};

const useReorderTodos = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { patch } = useFetch();

  const reorderTodos = async (oldIndex: number, newIndex: number) => {
    const data = { oldIndex, newIndex };
    setIsLoading(true);
    try {
      const { data: response } = await patch<Todo>("todos", { data });
      return response;
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, reorderTodos };
};

const useRemoveTodo = () => {
  const { remove } = useFetch();

  const removeTodo = async (id: string) => {
    try {
      const { data: response } = await remove<Todo>(`todos/${id}`);
      return response;
    } catch (error) {
      console.error(error);
    }
  };

  return { removeTodo };
};

const useRemoveCompleted = () => {
  const { remove } = useFetch();

  const removeCompletedTodos = async () => {
    try {
      const { data: response } = await remove<Todo>(`todos`);
      return response;
    } catch (error) {
      console.error(error);
    }
  };

  return { removeCompletedTodos };
};

export {
  useGetTodos,
  useCreateTodo,
  useUpdateTodo,
  useRemoveTodo,
  useRemoveCompleted,
  useReorderTodos,
};
