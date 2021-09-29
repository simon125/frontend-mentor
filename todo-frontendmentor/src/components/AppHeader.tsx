import React from "react";
import styled from "styled-components";

import { SunIcon, MoonIcon } from "assets/Icons";
import { useThemeCtx } from "contexts/ThemeCtx";

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  color: #fff;
  padding-bottom: 5vh;
  letter-spacing: 9px;
`;

const ThemeButton = styled.button`
  background: transparent;
  border: none;
  fill: #eee;
  cursor: pointer;

  &:hover {
    fill: #fff;
  }
`;

export const AppHeader: React.FC = () => {
  const { isDarkTheme, toggleTheme } = useThemeCtx();

  return (
    <Header>
      <h1>TODO</h1>
      <ThemeButton onClick={toggleTheme}>
        {isDarkTheme() ? <SunIcon /> : <MoonIcon />}
      </ThemeButton>
    </Header>
  );
};
