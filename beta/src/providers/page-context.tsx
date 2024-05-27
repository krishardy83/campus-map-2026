import { type ReactNode, useState } from "react";
import pageContext from "../contexts/page-context";
import { SIDEBAR_EXPANDED } from "../constants";

type Props = {
  children: ReactNode;
};

export default function PageContextProvider({ children }: Props) {
  const [isNavigationExpanded, setIsNavigationExpanded] = useState(() => {
    const state = localStorage.getItem(SIDEBAR_EXPANDED);

    if (!state) return true;

    return state === "true";
  });

  localStorage.setItem(SIDEBAR_EXPANDED, String(isNavigationExpanded));

  return (
    <pageContext.Provider
      value={{
        isNavigationExpanded,
        toggleNavigation: () => setIsNavigationExpanded((previousState) => !previousState),
      }}
    >
      {children}
    </pageContext.Provider>
  );
}
