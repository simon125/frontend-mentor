import styled from "styled-components";

import { LoginRegister } from "pages/LoginRegister/LoginRegister";
import { NotFound } from "pages/NotFound/NotFound";
import { Todo } from "pages/Todo/Todo";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { AppHeader } from "components";
import { useThemeCtx } from "contexts/ThemeCtx";

const AppContainer = styled.div`
  position: relative;
  padding-top: 5vh;
  margin: 0 auto;
  width: 85%;

  @media screen and (min-width: 768px) {
    width: 55%;
  }

  @media screen and (min-width: 966px) {
    width: 45%;
  }

  @media screen and (min-width: 1200px) {
    width: 35%;
  }
`;

const Box = styled.div`
  background: ${({ theme }) => theme.pageBackground};
  min-height: 100vh;
`;

function App() {
  const { isDarkTheme } = useThemeCtx();

  const img = isDarkTheme() ? "dark" : "light";

  return (
    <Box>
      <picture style={{ position: "absolute", top: 0, left: 0 }}>
        <source
          media="(min-width: 375px)"
          srcSet={`images/bg-desktop-${img}.jpg`}
        />
        <img
          style={{ width: "100vw", minHeight: "30vh", objectFit: "cover" }}
          src={`images/bg-mobile-${img}.jpg`}
          alt="a cute kitten"
        />
      </picture>
      <Router>
        <AppContainer>
          <AppHeader />
          <Switch>
            <Route exact path="/">
              <LoginRegister />
            </Route>
            <Route path="/todo">
              <Todo />
            </Route>
            <Route path="*" component={NotFound} />
          </Switch>
        </AppContainer>
      </Router>
    </Box>
  );
}

export default App;
