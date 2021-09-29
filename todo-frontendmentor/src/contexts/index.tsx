import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider } from "./ThemeCtx";
import { FetchProvider } from "./FetchCtx";
// import {ReactQueryConfigProvider} from 'react-query'

// const queryConfig = {
//     queries: {
//       useErrorBoundary: true,
//       refetchOnWindowFocus: false,
//       retry(failureCount, error) {
//         if (error.status === 404) return false
//         else if (failureCount < 2) return true
//         else return false
//       },
//     },
//   }

const AppProviders: React.FC = ({ children }) => {
  return (
    //   <ReactQueryConfigProvider config={queryConfig}>
    <Router>
      <ThemeProvider>
        <FetchProvider>{children}</FetchProvider>
      </ThemeProvider>
    </Router>
    //   </ReactQueryConfigProvider>
  );
};

export { AppProviders };
