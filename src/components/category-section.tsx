import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { Link, useSearchParams } from "react-router-dom";
import usePageContext from "../hooks/use-page-context";
import type { Entry } from "../types";

type Props = {
  category: string;
  entries: Entry[];
};

const mq = window.matchMedia("(max-width: 640px)");

export default function CategorySection({ category, entries }: Props) {
  const [searchParams, setSearchParams] = useSearchParams();
  const { toggleNavigation } = usePageContext();
  const hasActiveMarker = searchParams
    .get("markers")
    ?.split(",")
    .includes(category);

  function handleToggleAll() {
    const params = Object.fromEntries(searchParams.entries());
    const previous = searchParams.get("markers")?.split(",") || [];

    if (previous.includes(category)) {
      setSearchParams({
        ...params,
        markers: previous.filter(
          (marker) => marker !== category && marker.length > 0,
        ),
      });
    } else {
      if (mq.matches) {
        toggleNavigation();
      }

      setSearchParams({
        ...params,
        markers: [...previous, category].join(","),
      });
    }
  }

  function handleValueChange(category: string, open: boolean) {
    const params = Object.fromEntries(searchParams.entries());
    const expanded = open
      ? params.expanded
          ?.split(",")
          .filter((item) => item !== category)
          .join(",")
      : [...(params.expanded?.split(",") || []), category].join(",");

    setSearchParams({ ...params, expanded });
  }

  return (
    <Disclosure
      as="div"
      className="px-6 border-t border-gray-200"
      defaultOpen={searchParams.get("expanded")?.split(",").includes(category)}
    >
      {({ open }) => (
        <>
          <DisclosureButton
            onClick={() => handleValueChange(category, open)}
            className="group flex w-full items-center justify-between text-calypso-800 cursor-pointer py-3 outline-none focus-visible:outline-2 focus-visible:outline-calypso-800 rounded-md focus-visible:-outline-offset-2"
          >
            {category}

            <ChevronDownIcon className="w-5 h-5 group-data-[open]:rotate-180 transition-transform duration-300" />
          </DisclosureButton>
          <DisclosurePanel
            transition
            className="origin-top transition duration-200 ease-out data-[closed]:-translate-y-6 data-[closed]:opacity-0 overflow-hidden"
          >
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
                    to={`/${entry.shortcut}`}
                  >
                    {entry.entry_title}
                  </Link>
                </li>
              ))}
            </ul>
          </DisclosurePanel>
        </>
      )}
    </Disclosure>
  );
}
