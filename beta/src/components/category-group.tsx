import * as Accordion from "@radix-ui/react-accordion";
import { useSearchParams } from "react-router-dom";
import CategorySection from "./category-section";
import { getEntriesForCategory } from "../lib/utils";
import usePageContext from "../hooks/use-page-context";
import Skeleton from "./skeleton";

type Props = {
  title: string;
  categories: string[];
};

export default function CategoryGroup({ title, categories }: Props) {
  const [searchParams, setSearchParams] = useSearchParams();
  const { entries, loading } = usePageContext();

  function handleValueChange(expanded: string[]) {
    const params = Object.fromEntries(searchParams.entries());

    setSearchParams({ ...params, expanded: expanded.join(",") });
  }

  return (
    <>
      <h2 className="text-lg font-bold bg-gray-200 text-calypso-800 px-6 py-2 sticky top-0">
        {title}
      </h2>

      {loading ? (
        <div role="alert" aria-busy="true" aria-live="polite">
          <p className="sr-only">loading</p>

          <div className="flex justify-between px-6 py-3.5 border-b border-gray-200">
            <Skeleton className="w-1/3" />
            <Skeleton className="w-5" />
          </div>
          <div className="flex justify-between px-6 py-3.5 border-b border-gray-200">
            <Skeleton className="w-1/2" />
            <Skeleton className="w-5" />
          </div>
          <div className="flex justify-between px-6 py-3.5 border-b border-gray-200">
            <Skeleton className="w-2/5" />
            <Skeleton className="w-5" />
          </div>
        </div>
      ) : (
        <Accordion.Root
          type="multiple"
          onValueChange={handleValueChange}
          defaultValue={searchParams.get("expanded")?.split(",")}
        >
          {categories.map((category) => (
            <CategorySection
              category={category}
              key={category}
              entries={getEntriesForCategory(category, entries)}
            />
          ))}
        </Accordion.Root>
      )}
    </>
  );
}
