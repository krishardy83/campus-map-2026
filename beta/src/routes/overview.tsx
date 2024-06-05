import { getCategories, setPageTitle } from "../lib/utils";
import CategoryGroup from "../components/category-group";
import usePageContext from "../hooks/use-page-context";

const visitorQuickLinks = ["Admissions", "Parking", "College Entrances", "Guest Services"];

export default function Overview() {
  const { entries, error } = usePageContext();

  setPageTitle();

  if (error) {
    return (
      <div
        role="alert"
        className="mx-6 bg-red-50 border text-red-900 border-red-200 rounded-md py-2 px-4"
      >
        <h2 className="font-serif font-bold text-2xl">Yikes, something went wrong...</h2>
        <p>
          We're sorry for the inconvenience, but the campus data could not be loaded. Please try
          again later.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-y-auto flex-1 relative">
      <CategoryGroup
        title="Visitor Quick Links"
        categories={getCategories(entries).filter((category) =>
          visitorQuickLinks.includes(category)
        )}
      />
      <CategoryGroup
        title="Locations"
        categories={getCategories(entries).filter(
          (category) => !visitorQuickLinks.includes(category)
        )}
      />
    </div>
  );
}
