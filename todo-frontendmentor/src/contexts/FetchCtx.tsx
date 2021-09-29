import { createContext, useContext } from "react";
import { useClient } from "api/client";

type IFetchCtx = ReturnType<typeof useClient>;

const FetchCtx = createContext<IFetchCtx | null>(null);

const FetchProvider: React.FC = ({ children }) => {
  /**
   * ADD INTERCEPTORS
   */
  const client = useClient();

  return <FetchCtx.Provider value={client}>{children}</FetchCtx.Provider>;
};

const useFetch = () => {
  const ctx = useContext(FetchCtx);

  if (!ctx) {
    throw new Error("Use context inside FetchProvider");
  }

  return ctx;
};

export { useFetch, FetchProvider };
