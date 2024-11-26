import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Combobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
  Transition,
} from "@headlessui/react";
import clsx from "clsx";
import { getEntriesFromSearch, getEntryByShortcut } from "../lib/utils";
import usePageContext from "../hooks/use-page-context";

export default function SearchForm() {
  const { entries } = usePageContext();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const results = getEntriesFromSearch(query, entries);

  function handleChange(shortcut: string | null) {
    if (shortcut) {
      const entry = getEntryByShortcut(entries, shortcut);

      if (entry) {
        navigate(entry.shortcut);
      }
    }
  }

  return (
    <search>
      <form className="mx-6 mb-4 mt-2 relative">
        <Combobox onChange={handleChange}>
          <ComboboxInput
            type="search"
            placeholder="Search"
            aria-label="Search campus site"
            className="rounded-md h-12 border px-4 placeholder:text-calypso-800 placeholder:uppercase border-gray-200 focus-visible:border-calypso-800 w-full outline-none focus:shadow-lg focus:shadow-calypso-800/10 transition-all"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
          <Transition
            enter="duration-200 ease-out"
            enterFrom="scale-95 opacity-0"
            enterTo="scale-100 opacity-100"
            leave="duration-300 ease-out"
            leaveFrom="scale-100 opacity-100"
            leaveTo="scale-95 opacity-0"
            afterLeave={() => setQuery("")}
          >
            <ComboboxOptions className="absolute mt-1 bg-gray-50 rounded-md shadow-md left-0 right-0 top-12 z-10 max-h-96 overflow-y-auto">
              {results.length === 0 && query !== "" ? (
                <div className="px-4 py-2">
                  No entries match your search. Please try a different term.
                </div>
              ) : (
                results.map((result) => (
                  <ComboboxOption
                    key={result.entry_id}
                    value={result.shortcut}
                    className={({ focus }) =>
                      clsx(
                        "px-4 py-2 block border-b border-gray-200 transition-colors hover:bg-calypso-800/10 group cursor-pointer",
                        { "bg-calypso-800/10": focus }
                      )
                    }
                  >
                    <span className="font-bold block group-hover:text-calypso-800 transition-colors">
                      {result.entry_title}
                    </span>
                    <span className="text-sm text-gray-500">{result.category_name}</span>
                  </ComboboxOption>
                ))
              )}
            </ComboboxOptions>
          </Transition>
        </Combobox>
      </form>
    </search>
  );
}
