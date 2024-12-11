import { useContext } from "react";
import pageContext from "../contexts/page-context";

export default function usePageContext() {
  const context = useContext(pageContext);

  if (!context) {
    throw new Error("PageContext can only be used inside the provider.");
  }

  return context;
}
