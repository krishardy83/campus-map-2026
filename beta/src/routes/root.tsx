import { Outlet } from "react-router-dom";
import clsx from "clsx";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import GoogleMap from "../components/google-map";
import SearchForm from "../components/search-form";
import { getBaseUrl } from "../lib/utils";
import TopNavigation from "../components/top-navigation";
import usePageContext from "../hooks/use-page-context";

export default function Root() {
  const { isNavigationExpanded, toggleNavigation } = usePageContext();

  return (
    <main>
      <TopNavigation />

      <div
        className={clsx(
          "fixed bg-white z-10 w-full max-w-md h-dvh before:h-3 before:bg-gradient-to-r before:from-calypso-800 before:to-victoria-800 before:top-0 flex flex-col transition-transform duration-300 ease-in-out",
          { "-translate-x-full": !isNavigationExpanded }
        )}
      >
        <img
          src={getBaseUrl("logo.svg")}
          alt="Messiah Univerity Logo"
          width="236px"
          height="63px"
          className="sm:w-64 mx-6 mt-6 mb-4 w-1/2"
        />

        <p className="font-serif text-3xl text-calypso-800 mx-6">Campus Map</p>

        <button
          type="button"
          className={clsx(
            "absolute sm:-right-12 text-gray-600 bg-white sm:shadow-sm p-2 cursor-pointer sm:top-2.5 rounded-sm transition-transform duration-300 ease-in-out",
            { "right-2 top-6": isNavigationExpanded, "top-2.5 -right-12": !isNavigationExpanded }
          )}
          title={`${isNavigationExpanded ? "Hide" : "Show"} navigation`}
          onClick={toggleNavigation}
        >
          {isNavigationExpanded ? (
            <EyeIcon className="w-6 h-6" />
          ) : (
            <EyeSlashIcon className="w-6 h-6" />
          )}
        </button>

        <SearchForm />

        <Outlet />
      </div>

      <GoogleMap />
    </main>
  );
}
