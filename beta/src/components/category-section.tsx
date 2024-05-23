import * as Accordion from "@radix-ui/react-accordion";
import { Link, useSearchParams } from "react-router-dom";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import type { Entry } from "../types";

type Props = {
  category: string;
  entries: Entry[];
};

export default function CategorySection({ category, entries }: Props) {
  const [searchParams, setSearchParams] = useSearchParams();
  const hasActiveMarker = searchParams.get("markers")?.split(",").includes(category);

  function handleToggleAll() {
    const params = Object.fromEntries(searchParams.entries());
    const previous = searchParams.get("markers")?.split(",") || [];

    if (previous.includes(category)) {
      setSearchParams({
        ...params,
        markers: previous.filter((marker) => marker !== category && marker.length > 0),
      });
    } else {
      setSearchParams({ ...params, markers: [...previous, category].join(",") });
    }
  }

  return (
    <Accordion.Item
      value={category}
      className="px-6 border-t border-gray-200 transition-all ease-in-out duration-300"
    >
      <Accordion.Header>
        <Accordion.Trigger className="group flex w-full items-center justify-between text-calypso-800 cursor-pointer py-3 outline-none focus-visible:outline-2 focus-visible:outline-calypso-800 rounded-md focus-visible:-outline-offset-2">
          {category}

          <ChevronDownIcon className="w-5 h-5 group-data-[state=open]:rotate-180 transition-transform duration-300" />
        </Accordion.Trigger>
      </Accordion.Header>
      <Accordion.Content className="data-[state=open]:animate-slide-down data-[state=closed]:animate-slide-up overflow-hidden">
        <button
          type="button"
          onClick={handleToggleAll}
          className="uppercase font-bold text-sm text-calypso-800 px-4 py-2 hover:bg-calypso-800/10 outline-none focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-calypso-800 rounded-md   w-full text-left transition-colors"
        >
          {hasActiveMarker ? "Hide" : "Show"} all
        </button>

        <ul className="mb-4">
          {entries.map((entry) => (
            <li key={entry.entry_id}>
              <Link
                className="text-calypso-800 text-sm block px-4 py-2 hover:bg-calypso-800/10 outline-none focus-visible:outline-2 focus-visible:-outline-offset-2 transition-colors focus-visible:outline-calypso-800 rounded-md  "
                to={`/${entry.entry_id}`}
              >
                {entry.entry_title}
              </Link>
            </li>
          ))}
        </ul>
      </Accordion.Content>
    </Accordion.Item>
  );
}
