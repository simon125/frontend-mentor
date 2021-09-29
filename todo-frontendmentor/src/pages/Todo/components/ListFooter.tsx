import React from "react";
import styled from "styled-components";
import { StyledListItem } from "./ListItem";
import { FilterStatus } from "types";
import { useTodoContext } from "contexts/TodoCtx";

const Task = styled.p`
  font-size: 1rem;
  color: #9f9ea3;
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: center;
  position: absolute;
  transform: translate(-50%, 65px);
  left: 50%;
  width: 100%;
  background: ${({ theme }) => theme.backgroundList};

  -webkit-box-shadow: ${({ theme }) => theme.boxShadow};
  box-shadow: ${({ theme }) => theme.boxShadow};
  padding: 15px 20px;
  border-radius: 5px;

  button + button {
    margin-left: 20px;
  }

  @media screen and (min-width: 1200px) {
    position: static;
    transform: none;
    box-shadow: none;
    padding: 0;
    width: fit-content;
  }
`;

const StyledFooterContainer = styled(StyledListItem)`
  justify-content: space-between;
`;

const Button = styled.button`
  border: none;
  background: transparent;
  color: #9f9ea3;

  cursor: pointer;

  &:hover {
    color: #626064;
  }
`;

const ClearButton = styled(Button)`
  opacity: 1 !important;
`;

const FilterButton = styled(Button)<{ active: boolean }>`
  color: ${({ active }) => (active ? "#4e77c6" : "")}!important;
`;

interface ListFooterProps {
  itemsLeft: number;
}

export const ListFooter: React.FC<ListFooterProps> = ({ itemsLeft }) => {
  const { removeCompletedTodos } = useTodoContext();

  return (
    <>
      <StyledFooterContainer>
        <Task>
          {itemsLeft} {itemsLeft > 1 ? "items" : "item"} left
        </Task>
        <FilterPanel />
        <ClearButton onClick={removeCompletedTodos}>
          Clear Completed
        </ClearButton>
      </StyledFooterContainer>
    </>
  );
};

const FilterPanel: React.FC = () => {
  const { filter, setFilter } = useTodoContext();

  const handleFilterClick = (newFilter: FilterStatus) => () => {
    setFilter(newFilter);
  };

  return (
    <FilterContainer>
      <FilterButton
        onClick={handleFilterClick(FilterStatus.ALL)}
        active={FilterStatus.ALL === filter}
      >
        All
      </FilterButton>
      <FilterButton
        onClick={handleFilterClick(FilterStatus.ACTIVE)}
        active={FilterStatus.ACTIVE === filter}
      >
        Active
      </FilterButton>
      <FilterButton
        onClick={handleFilterClick(FilterStatus.COMPLETED)}
        active={FilterStatus.COMPLETED === filter}
      >
        Completed
      </FilterButton>
    </FilterContainer>
  );
};
