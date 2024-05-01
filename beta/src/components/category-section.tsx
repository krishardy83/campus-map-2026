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
      className="px-6 border-t border-gray-200 transition-all ease-in-out duration-300 overflow-hidden h-[--height]"
    >
      <summary
        className="list-none text-sky-800 cursor-pointer py-3 outline-none focus-visible:outline-2 focus-visible:outline-sky-800 rounded-md focus-visible:-outline-offset-2"
        onClick={handleClick}
      >
        {category}
      </summary>

      <div className="pl-2">
        <button
          type="button"
          onClick={() => setSearchParams(searchParams.get("markers") ? {} : { markers: category })}
          className="uppercase font-bold text-sm text-sky-800 px-2 mb-2 outline-none focus-visible:outline-2 focus-visible:outline-sky-800 rounded-sm"
        >
          {searchParams.get("markers") ? "Hide" : "Show"} all
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
