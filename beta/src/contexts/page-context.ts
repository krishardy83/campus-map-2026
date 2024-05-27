import { createContext } from "react";

const pageContext = createContext({
  isNavigationExpanded: true,
  toggleNavigation: () => {},
});

export default pageContext;
