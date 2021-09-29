import { TodoCtxProvider } from "contexts/TodoCtx";
import React from "react";
import styled from "styled-components";
import { AddTodo } from "./components/AddTodo";
import { List } from "./components/List";

const StyledParagraph = styled.p`
  text-align: center;
  margin: 0 auto;
  padding: 80px 0 30px 0px;
  font-size: 1.1rem;
  color: #9f9ea3;

  @media screen and (min-width: 1200px) {
    padding: 30px 0 10px 0;
  }
`;

export const Todo: React.FC = () => {
  try {
  } catch (error) {}
  return (
    <>
      <TodoCtxProvider>
        <AddTodo />
        <List />
        <StyledParagraph>
          Drag and drop to reorder list (only for ALL)
        </StyledParagraph>
      </TodoCtxProvider>
    </>
  );
};
