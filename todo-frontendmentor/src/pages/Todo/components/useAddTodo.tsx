import { useTodoContext } from "contexts/TodoCtx";
import { useState } from "react";

export const useAddTodo = () => {
  const { todos, totalAmount, addTodo } = useTodoContext();

  const [task, setTask] = useState<string>("");
  const [active, setActive] = useState<boolean>(false);
  const [validationError, setValidationError] = useState<{ task: boolean }>({
    task: false,
  });

  const handleContentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (validationError.task) {
      setValidationError({ ...validationError, task: false });
    }
    setTask(e.target.value);
  };

  const handleActiveChange = () => {
    setActive((prev) => !prev);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (task.trim() === "") {
      setValidationError({ ...validationError, task: true });
      return;
    }

    const todoToCreate = {
      task: task,
      active,
      order: totalAmount,
    };

    addTodo(todoToCreate);

    setTask("");
    setActive(false);
  };

  return {
    handleContentChange,
    handleActiveChange,
    handleSubmit,
    task,
    active,
    validationError,
  } as const;
};
