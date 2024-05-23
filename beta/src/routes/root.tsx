import { useState } from "react";
import { Outlet } from "react-router-dom";
import clsx from "clsx";
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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            {expanded ? (
              <>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
              </>
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
              />
            )}
          </svg>
        </button>

        <SearchForm />

        <Outlet />
      </div>

      <GoogleMap />
    </main>
  );
}
