import { useState } from "react";
import clsx from "clsx";
import CategorySection from "./category-section";
import Icon from "./icon";
import SearchForm from "./search-form";
import { getCategories, getEntriesForCategory } from "../lib/utils";
import data from "../data.json";
import { SIDEBAR_EXPANDED } from "../constants";

export default function MainNavigation() {
  const [expanded, setExpanded] = useState(() => {
    const state = localStorage.getItem(SIDEBAR_EXPANDED);

    if (!state) return true;

    return state === "true";
  });

  localStorage.setItem(SIDEBAR_EXPANDED, String(expanded));

  return (
    <div
      className={clsx(
        "w-full max-w-md h-dvh border-t-8 border-sky-800 py-6 flex flex-col relative transition-transform duration-300 ease-in-out",
        { "-translate-x-full": !expanded }
      )}
    >
      <img
        src="/campus-map-dev/logo.svg"
        alt="Messiah Univerity Logo"
        width="236px"
        height="63px"
        className="ml-6 mb-6"
      />

      <button
        type="button"
        className={clsx(
          "absolute right-0 text-sky-800 border border-gray-300 shadow-sm p-2 cursor-pointer top-6 transition-transform duration-300 ease-in-out",
          { "translate-x-full rounded-r-md": !expanded },
          { "rounded-l-md": expanded }
        )}
        title={`${expanded ? "Hide" : "Show"} navigation`}
        onClick={() => setExpanded(!expanded)}
      >
        <Icon name={expanded ? "arrow-left" : "arrow-right"} />
      </button>

      <SearchForm />

      <div className="overflow-y-auto flex-1 relative">
        <h2 className="bg-gray-200 text-sky-800 text-lg px-6 py-1 sticky top-0">
          Visitor Quick Links
        </h2>
        <CategorySection title="Admissions" entries={getEntriesForCategory("Admissions", data)} />
        <CategorySection title="Parking" entries={getEntriesForCategory("Parking", data)} />
        <CategorySection
          title="College Entrances"
          entries={getEntriesForCategory("College Entrances", data)}
        />
        <CategorySection
          title="Guest Services"
          entries={getEntriesForCategory("Guest Services", data)}
        />

        <h2 className="bg-gray-200 text-sky-800 text-lg px-6 py-1 mt-4 sticky top-0">Locations</h2>
        {getCategories(data).map((category) => (
          <CategorySection
            title={category}
            key={category}
            entries={getEntriesForCategory(category, data)}
          />
        ))}
      </div>
    </div>
  );
}
