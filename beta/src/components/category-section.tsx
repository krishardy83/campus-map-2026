import * as Accordion from "@radix-ui/react-accordion";
import { Link, useSearchParams } from "react-router-dom";
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
        <Accordion.Trigger className="group flex w-full items-center justify-between text-sky-800 cursor-pointer py-3 outline-none focus-visible:outline-2 focus-visible:outline-sky-800 rounded-md focus-visible:-outline-offset-2">
          {category}

          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-5 h-5 group-data-[state=open]:rotate-180 transition-transform duration-300"
          >
            <path
              fillRule="evenodd"
              d="M12.53 16.28a.75.75 0 0 1-1.06 0l-7.5-7.5a.75.75 0 0 1 1.06-1.06L12 14.69l6.97-6.97a.75.75 0 1 1 1.06 1.06l-7.5 7.5Z"
              clipRule="evenodd"
            />
          </svg>
        </Accordion.Trigger>
      </Accordion.Header>
      <Accordion.Content className="data-[state=open]:animate-slide-down data-[state=closed]:animate-slide-up overflow-hidden">
        <button
          type="button"
          onClick={handleToggleAll}
          className="uppercase font-bold text-sm text-sky-800 px-4 py-2 hover:bg-sky-100 outline-none focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-sky-800 rounded-sm w-full text-left transition-colors"
        >
          {hasActiveMarker ? "Hide" : "Show"} all
        </button>

        <ul className="mb-4">
          {entries.map((entry) => (
            <li key={entry.entry_id}>
              <Link
                className="text-sky-800 text-sm block px-4 py-2 hover:bg-sky-100 outline-none focus-visible:outline-2 focus-visible:outline-offset-0 transition-colors focus-visible:outline-sky-800 rounded-sm"
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
