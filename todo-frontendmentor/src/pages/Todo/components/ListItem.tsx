import React from "react";
import styled from "styled-components";
import { Todo } from "types";

import { CrossIcon } from "assets/Icons";
import { Checkbox } from "components/Checkbox";
import { useListItem } from "./useListItem";

export const StyledListItem = styled.li<{ active?: boolean }>`
  padding: 15px 20px;
  display: flex;
  justify-content: flex-start;
  align-items: center;

  & > button {
    opacity: 1;

    @media screen and (min-width: 1200px) {
      opacity: 0;
    }
  }

  &:hover > button {
    opacity: 1;
  }
`;

const Task = styled.p<{ completed: boolean }>`
  font-size: 1.1rem;
  white-space: nowrap;
  width: 100%;
  overflow-x: hidden;
  text-overflow: ellipsis;
  max-width: 190px;
  max-width: 80%;

  text-decoration: ${({ completed }) => (completed ? "line-through" : "none")};
  color: ${({ completed }) => (completed ? "#51526499" : "#515264")};

  @media screen and (min-width: 768px) {
    font-size: 1.4rem;
  }
`;

const DeleteButton = styled.button`
  margin-left: auto;
  border: none;
  background: transparent;
  cursor: pointer;
`;

interface ListItemProps {
  todoItem: Todo;
}

export const ListItem: React.FC<ListItemProps> = ({ todoItem }) => {
  const { active, task, handleChange, handleDeleteClick } = useListItem(
    todoItem
  );

  return (
    <StyledListItem active={active}>
      <Checkbox checked={active} onChange={handleChange} />
      <Task completed={active}>{task}</Task>
      <DeleteButton onClick={handleDeleteClick}>
        <CrossIcon />
      </DeleteButton>
    </StyledListItem>
  );
};
