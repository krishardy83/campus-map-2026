import { useState } from "react";
import { Outlet } from "react-router-dom";
import clsx from "clsx";
import GoogleMap from "../components/google-map";
import { SIDEBAR_EXPANDED } from "../constants";
import Icon from "../components/icon";
import SearchForm from "../components/search-form";
import { getBaseUrl } from "../lib/utils";

export default function Root() {
  const [expanded, setExpanded] = useState(() => {
    const state = localStorage.getItem(SIDEBAR_EXPANDED);

    if (!state) return true;

    return state === "true";
  });

  localStorage.setItem(SIDEBAR_EXPANDED, String(expanded));

  return (
    <main>
      <div
        className={clsx(
          "fixed bg-white z-10 w-full max-w-md h-dvh border-t-8 border-sky-800 py-6 flex flex-col transition-transform duration-300 ease-in-out",
          { "-translate-x-full": !expanded }
        )}
      >
        <img
          src={getBaseUrl("logo.svg")}
          alt="Messiah Univerity Logo"
          width="236px"
          height="63px"
          className="ml-6 mb-6"
        />

        <button
          type="button"
          className={clsx(
            "absolute -right-12 text-gray-600 bg-white shadow-sm p-2.5 cursor-pointer top-0.5 rounded-sm transition-transform duration-300 ease-in-out"
          )}
          title={`${expanded ? "Hide" : "Show"} navigation`}
          onClick={() => setExpanded(!expanded)}
        >
          <Icon name={expanded ? "shrink" : "enlarge"} className="w-5 h-5" />
        </button>

        <SearchForm />

        <Outlet />
      </div>

      <GoogleMap />
    </main>
  );
}
