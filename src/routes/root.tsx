import { Outlet } from "react-router-dom";
import clsx from "clsx";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import GoogleMap from "../components/google-map";
import SearchForm from "../components/search-form";
import TopNavigation from "../components/top-navigation";
import usePageContext from "../hooks/use-page-context";

export default function Root() {
  const { isNavigationExpanded, toggleNavigation } = usePageContext();

  return (
    <main>
      <TopNavigation />

      <div
        className={clsx(
          "fixed bg-white z-10 w-full max-w-md h-dvh before:h-3 before:shrink-0 before:bg-gradient-to-r before:from-calypso-800 before:to-victoria-800 before:top-0 flex flex-col transition-transform duration-300 ease-in-out",
          { "-translate-x-full": !isNavigationExpanded }
        )}
      >
        <button
          type="button"
          className={clsx(
            "absolute sm:-right-12 text-gray-600 bg-white shadow-md sm:shadow-sm p-2 sm:top-2.5 rounded-sm transition-transform duration-300 ease-in-out z-10",
            { "right-2 top-6": isNavigationExpanded, "top-2.5 -right-12": !isNavigationExpanded }
          )}
          title={`${isNavigationExpanded ? "Hide" : "Show"} navigation`}
          onClick={toggleNavigation}
        >
          {isNavigationExpanded ? (
            <EyeSlashIcon className="w-6 h-6" />
          ) : (
            <EyeIcon className="w-6 h-6" />
          )}
        </button>

        <div className="overflow-y-auto">
          <img
            src="/logo.svg"
            alt="Messiah Univerity Logo"
            width="236px"
            height="63px"
            className="sm:w-48 mx-6 mt-6 mb-4 w-1/3"
          />

          <p className="font-serif text-2xl font-bold sm:text-3xl text-calypso-800 mx-6">
            Campus Map
          </p>

          <SearchForm />

          <Outlet />
        </div>
      </div>

      <GoogleMap />
    </main>
  );
}
