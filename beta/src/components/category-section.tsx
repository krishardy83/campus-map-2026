import { useRef } from "react";
import { Link, useSearchParams } from "react-router-dom";
import type { Entry } from "../types";

type Props = {
  category: string;
  entries: Entry[];
};

export default function CategorySection({ category, entries }: Props) {
  const [searchParams, setSearchParams] = useSearchParams();
  const ref = useRef<HTMLDetailsElement>(null);
  const hasActiveMarker = searchParams.getAll("marker").includes(category);

  function handleToggleAll() {
    const markers = searchParams.getAll("marker");

    if (markers.includes(category)) {
      setSearchParams({ marker: markers.filter((marker) => marker !== category) });
    } else {
      setSearchParams({ marker: [...markers, category] });
    }
  }

  function handleClick() {
    if (!ref.current) return;

    if (ref.current.hasAttribute("open")) {
      ref.current.style.setProperty(
        "--height",
        ref.current.getAttribute("data-collapsed-height") + "px"
      );
    } else {
      ref.current.setAttribute("data-collapsed-height", String(ref.current.scrollHeight));
      ref.current.style.setProperty("--height", ref.current.scrollHeight + "px");

      requestAnimationFrame(() => {
        ref.current!.style.setProperty("--height", ref.current!.scrollHeight + "px");
      });
    }
  }

  return (
    <details
      ref={ref}
      className="px-6 border-t group border-gray-200 transition-all ease-in-out duration-300 overflow-hidden h-[--height]"
    >
      <summary
        className="list-none flex items-center justify-between text-sky-800 cursor-pointer py-3 outline-none focus-visible:outline-2 focus-visible:outline-sky-800 rounded-md focus-visible:-outline-offset-2"
        onClick={handleClick}
      >
        {category}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-5 h-5 group-open:rotate-180 transition-transform duration-300"
        >
          <path
            fillRule="evenodd"
            d="M12.53 16.28a.75.75 0 0 1-1.06 0l-7.5-7.5a.75.75 0 0 1 1.06-1.06L12 14.69l6.97-6.97a.75.75 0 1 1 1.06 1.06l-7.5 7.5Z"
            clipRule="evenodd"
          />
        </svg>
      </summary>

      <div className="pl-2">
        <button
          type="button"
          onClick={handleToggleAll}
          className="uppercase font-bold text-sm text-sky-800 px-2 mb-2 outline-none focus-visible:outline-2 focus-visible:outline-sky-800 rounded-sm"
        >
          {hasActiveMarker ? "Hide" : "Show"} all
        </button>

        <ul className="mb-4">
          {entries.map((entry) => (
            <li key={entry.entry_id}>
              <Link
                className="text-sky-800 text-sm block p-2 hover:bg-sky-100 outline-none focus-visible:outline-2 focus-visible:outline-sky-800 rounded-md"
                to={`/${entry.entry_id}`}
              >
                {entry.entry_title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </details>
  );
}
