import { type ReactNode, useState } from "react";
import pageContext from "../contexts/page-context";
import useData from "../hooks/use-data";
import { SIDEBAR_EXPANDED } from "../constants";
import { Entry } from "../types";

type Props = {
  children: ReactNode;
};

export default function PageContextProvider({ children }: Props) {
  const { data, loading, error } = useData<{ items: Entry[] }>(
    "https://cascade.messiah.edu/campus-map/_data/campus-map.json"
  );
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
        entries: data ? data.items : [],
        loading,
        error,
        toggleNavigation: () => setIsNavigationExpanded((previousState) => !previousState),
      }}
    >
      {children}
    </pageContext.Provider>
  );
}
