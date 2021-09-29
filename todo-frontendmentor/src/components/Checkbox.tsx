import { CheckIcon } from "assets/Icons";
import React from "react";
import styled from "styled-components";

interface StyledCheckboxProps {
  checked: boolean;
}

const StyledCheckbox = styled.label<StyledCheckboxProps>`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  margin-right: 10px;
  cursor: pointer;
  border: ${({ checked, theme }) =>
    checked ? "none" : `1px solid ${theme.border}`};
  background: ${({ checked }) =>
    checked ? "linear-gradient(#57ddff,#c058f3)" : "transparent"};

  &:hover {
    background: linear-gradient(#57ddff, #c058f3);
    border: none;
  }

  &:hover > span {
    display: ${({ checked }) => (checked ? "none" : "block")};
  }
`;

const Shape = styled.span`
  width: 17px;
  height: 17px;
  position: absolute;
  border-radius: 50%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: ${({ theme }) => theme.backgroundList};
  display: none;
  z-index: 10;
`;

interface CheckboxProps {
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Checkbox: React.FC<CheckboxProps> = ({ checked, onChange }) => {
  return (
    <StyledCheckbox checked={checked}>
      <Shape />
      <input type="checkbox" checked={checked} onChange={onChange} hidden />
      {checked && <CheckIcon />}
    </StyledCheckbox>
  );
};
