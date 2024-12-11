import { createContext } from "react";
import { Entry } from "../types";

type ContextState = {
  isNavigationExpanded: boolean;
  loading: boolean;
  error: boolean;
  entries: Entry[];
  toggleNavigation(): void;
};

const pageContext = createContext<ContextState>({
  isNavigationExpanded: true,
  loading: true,
  error: false,
  entries: [],
  toggleNavigation: () => {},
});

export default pageContext;
