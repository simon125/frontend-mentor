import React from "react";
import { Checkbox } from "components";
import styled from "styled-components";
import { useAddTodo } from "./useAddTodo";

const Form = styled.form`
  width: 100%;
  display: flex;
  align-items: center;
  background: ${({ theme }) => theme.backgroundList};
  border-radius: 5px;
  margin-bottom: 3vh;
  padding: 15px 20px;
  -webkit-box-shadow: ${({ theme }) => theme.boxShadow};
  box-shadow: ${({ theme }) => theme.boxShadow};
`;

const TextInput = styled.input`
  border: none;
  outline: none;
  background: transparent;

  color: ${({ theme }) => theme.fontColor};
`;

export const AddTodo: React.FC = () => {
  const {
    active,
    task,
    handleSubmit,
    handleActiveChange,
    handleContentChange,
  } = useAddTodo();

  return (
    <Form onSubmit={handleSubmit}>
      <Checkbox checked={active} onChange={handleActiveChange} />
      <TextInput
        placeholder="Create a new todo..."
        value={task}
        onChange={handleContentChange}
      />
    </Form>
  );
};
