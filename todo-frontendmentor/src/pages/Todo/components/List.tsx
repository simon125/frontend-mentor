import React from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

import { ListItem } from "./ListItem";
import { ListFooter } from "./ListFooter";
import { useThemeCtx } from "contexts/ThemeCtx";
import { useTodoList } from "./useTodoList";

const StyledList = styled.ul<{ isDarkTheme: boolean }>`
  position: relative;
  border-radius: 5px;
  background: ${({ theme }) => theme.backgroundList};
  -webkit-box-shadow: ${({ theme }) => theme.boxShadow};
  box-shadow: ${({ theme }) => theme.boxShadow};

  .list-item {
    border-radius: 5px;

    background: ${({ theme }) => theme.backgroundList};

    border-bottom: ${({ theme }) => `1px solid ${theme.border}`};
  }
`;

export const List: React.FC = () => {
  const { isDarkTheme } = useThemeCtx();
  const { models, operations } = useTodoList();

  return (
    <StyledList isDarkTheme={isDarkTheme()}>
      <DragDropContext
        onDragEnd={({ destination, source }) => {
          if (!destination) {
            return;
          }

          operations.reorderTodos(source.index, destination.index);
        }}
      >
        <Droppable droppableId="droppable">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {models.todos.map((todoItem, index) => {
                return (
                  <Draggable
                    isDragDisabled={operations.isListDragable()}
                    key={todoItem._id}
                    draggableId={todoItem._id}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        className="list-item"
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <ListItem todoItem={todoItem} />
                      </div>
                    )}
                  </Draggable>
                );
              })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <ListFooter itemsLeft={models.itemsLeft} />
    </StyledList>
  );
};
