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
import data from "../data.json";
import { getEntriesFromSearch } from "../lib/utils";

export default function SearchForm() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const results = getEntriesFromSearch(query, data);

  function handleChange(value: string | null) {
    if (value) {
      navigate(`${value}?origin=search`);
    }
  }

  return (
    <search>
      <form className="px-6 pt-0 pb-4 sm:py-4 relative">
        <Combobox onChange={handleChange}>
          <ComboboxInput
            type="search"
            placeholder="Search"
            aria-label="Search campus site"
            className="rounded-md h-12 border-2 px-2 placeholder:text-sky-700 placeholder:uppercase border-sky-800 w-full outline-none focus:shadow-lg focus:shadow-sky-100 transition-shadow"
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
            <ComboboxOptions className="absolute mt-1 bg-gray-50 rounded-md shadow-md left-6 right-6 top-16 z-10 max-h-96 overflow-y-auto">
              {results.length === 0 && query !== "" ? (
                <div className="px-4 py-2">
                  No entries match your search. Please try a different term.
                </div>
              ) : (
                results.map((result) => (
                  <ComboboxOption
                    key={result.entry_id}
                    value={result.entry_id}
                    className={({ focus }) =>
                      clsx(
                        "px-4 py-2 block border-b border-gray-200 transition-colors hover:bg-sky-100 group cursor-pointer",
                        { "bg-sky-100": focus }
                      )
                    }
                  >
                    <span className="font-bold block group-hover:text-sky-800 transition-colors">
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
