import * as Accordion from "@radix-ui/react-accordion";
import { useSearchParams } from "react-router-dom";
import CategorySection from "./category-section";
import { getEntriesForCategory } from "../lib/utils";
import data from "../data.json";

type Props = {
  title: string;
  categories: string[];
};

export default function CategoryGroup({ title, categories }: Props) {
  const [searchParams, setSearchParams] = useSearchParams();

  function handleValueChange(expanded: string[]) {
    const params = Object.fromEntries(searchParams.entries());

    setSearchParams({ ...params, expanded: expanded.join(",") });
  }

  return (
    <>
      <h2 className="bg-gray-100 text-sky-800 text-lg px-6 py-2 sticky top-0">{title}</h2>

      <Accordion.Root
        type="multiple"
        onValueChange={handleValueChange}
        defaultValue={searchParams.get("expanded")?.split(",")}
      >
        {categories.map((category) => (
          <CategorySection
            category={category}
            key={category}
            entries={getEntriesForCategory(category, data)}
          />
        ))}
      </Accordion.Root>
    </>
  );
}
