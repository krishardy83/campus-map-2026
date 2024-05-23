import { useState } from "react";
import { Outlet } from "react-router-dom";
import clsx from "clsx";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import GoogleMap from "../components/google-map";
import { SIDEBAR_EXPANDED } from "../constants";
import SearchForm from "../components/search-form";
import { getBaseUrl } from "../lib/utils";
import TopNavigation from "../components/top-navigation";

export default function Root() {
  const [expanded, setExpanded] = useState(() => {
    const state = localStorage.getItem(SIDEBAR_EXPANDED);

    if (!state) return true;

    return state === "true";
  });

  localStorage.setItem(SIDEBAR_EXPANDED, String(expanded));

  return (
    <main>
      <TopNavigation />

      <div
        className={clsx(
          "fixed bg-white z-10 w-full max-w-md h-dvh before:h-3 before:bg-gradient-to-r before:from-primary before:to-secondary before:top-0 flex flex-col transition-transform duration-300 ease-in-out",
          { "-translate-x-full": !expanded }
        )}
      >
        <img
          src={getBaseUrl("logo.svg")}
          alt="Messiah Univerity Logo"
          width="236px"
          height="63px"
          className="ml-6 my-4 sm:my-6 h-10 sm:h-auto w-max"
        />

        <button
          type="button"
          className={clsx(
            "absolute sm:-right-12 text-gray-600 bg-white sm:shadow-sm p-2 cursor-pointer sm:top-2.5 rounded-sm transition-transform duration-300 ease-in-out",
            { "right-2 top-6": expanded, "top-2.5 -right-12": !expanded }
          )}
          title={`${expanded ? "Hide" : "Show"} navigation`}
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? <EyeIcon className="w-6 h-6" /> : <EyeSlashIcon className="w-6 h-6" />}
        </button>

        <SearchForm />

        <Outlet />
      </div>

      <GoogleMap />
    </main>
  );
}
