import React, { createContext, useContext, useState } from "react";
import { ThemeProvider as StyledThemeProvider } from "styled-components";

type IThemeCtx = ReturnType<typeof useTheme>;

const ThemeCtx = createContext<IThemeCtx | null>(null);

const LightTheme = {
  pageBackground: "#fafafa",
  fontColor: "#555",
  border: "#00000030",
  boxShadow: "0px 0px 25px 3px rgba(170, 170, 170, 0.5)",
  backgroundList: "#ffffff",
};

const DarkTheme = {
  pageBackground: "#181824",
  fontColor: "#ddd",
  border: "#37394E",
  boxShadow: "0px 0px 25px 3px rgba(37, 39, 60, 0.3)",
  backgroundList: "#25273C",
};

enum Theme {
  LIGHT,
  DARK,
}

const themes = [LightTheme, DarkTheme];

const ThemeProvider: React.FC = ({ children }) => {
  const { theme, isDarkTheme, toggleTheme } = useTheme();

  const value = {
    theme,
    isDarkTheme,
    toggleTheme,
  };

  return (
    <ThemeCtx.Provider value={value}>
      <StyledThemeProvider theme={themes[theme]}>
        {children}
      </StyledThemeProvider>
    </ThemeCtx.Provider>
  );
};

const useTheme = () => {
  const [theme, setTheme] = useState<Theme>(Theme.LIGHT);
  const toggleTheme = () => {
    setTheme((prevTheme) =>
      prevTheme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT
    );
  };

  const isDarkTheme = () => theme === Theme.DARK;

  return { theme, isDarkTheme, toggleTheme };
};

const useThemeCtx = () => {
  const ctx = useContext(ThemeCtx);

  if (!ctx) {
    throw new Error("Error");
  }

  return ctx;
};

export { useThemeCtx, ThemeProvider };
