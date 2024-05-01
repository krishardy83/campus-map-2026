import { useState } from "react";
import { Combobox } from "@headlessui/react";
import clsx from "clsx";
import data from "../data.json";
import { getEntriesFromSearch } from "../lib/utils";

export default function SearchForm() {
  const [query, setQuery] = useState("");
  const results = getEntriesFromSearch(query, data);

  return (
    <search>
      <form className="px-6 py-4 relative">
        <Combobox>
          <Combobox.Input
            type="search"
            placeholder="Search"
            aria-label="Search campus site"
            className="rounded-md h-12 border-2 px-2 placeholder:text-sky-700 placeholder:uppercase border-sky-800 w-full outline-none focus:shadow-lg focus:shadow-sky-100 transition-shadow"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
          <Combobox.Options className="absolute mt-1 bg-gray-50 rounded-md shadow-md left-6 right-6 top-16 z-10 max-h-96 overflow-y-auto">
            {results.length === 0 && query !== "" ? (
              <div className="px-4 py-2">
                No entries match your search. Please try a different term.
              </div>
            ) : (
              results.map((result) => (
                <Combobox.Option
                  key={result.entry_id}
                  value={result.entry_id}
                  className={({ active }) =>
                    clsx(
                      "px-4 py-2 block border-b border-gray-200 transition-colors hover:bg-sky-100 group cursor-pointer",
                      { "ring-2 ring-sky-800 bg-sky-100": active }
                    )
                  }
                >
                  <span className="font-bold block group-hover:text-sky-800 transition-colors">
                    {result.entry_title}
                  </span>
                  <span className="text-sm text-gray-500">{result.category_name}</span>
                </Combobox.Option>
              ))
            )}
          </Combobox.Options>
        </Combobox>
      </form>
    </search>
  );
}
