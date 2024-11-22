import {
  createContext,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { useSearchParams } from "react-router-dom";

export const QueryContext = createContext<
  | {
      query: string;
      setQuery: React.Dispatch<SetStateAction<string>>;
      showSidebar: boolean;
      setShowSidebar: React.Dispatch<SetStateAction<boolean>>;
    }
  | undefined
>(undefined);

export const QueryProvider = ({ children }: { children: ReactNode }) => {
  const [searchQuery] = useSearchParams();
  const [query, setQuery] = useState(searchQuery.get("q") || "");
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <QueryContext.Provider
      value={{
        query,
        setQuery,
        setShowSidebar,
        showSidebar,
      }}
    >
      {children}
    </QueryContext.Provider>
  );
};

export const useQueryContext = () => {
  const context = useContext(QueryContext);
  if (!context) {
    throw Error("Context must be used within provider");
  }
  return context;
};
