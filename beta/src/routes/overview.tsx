import CategorySection from "../components/category-section";
import { getCategories, getEntriesForCategory } from "../lib/utils";
import data from "../data.json";

const visitorQuickLinks = ["Admissions", "Parking", "College Entrances", "Guest Services"];

export default function Overview() {
  return (
    <div className="overflow-y-auto flex-1 relative">
      <h2 className="bg-gray-200 text-sky-800 text-lg px-6 py-1 sticky top-0">
        Visitor Quick Links
      </h2>

      {getCategories(data)
        .filter((category) => visitorQuickLinks.includes(category))
        .map((category) => (
          <CategorySection
            category={category}
            key={category}
            entries={getEntriesForCategory(category, data)}
          />
        ))}

      <h2 className="bg-gray-200 text-sky-800 text-lg px-6 py-1 mt-4 sticky top-0">Locations</h2>

      {getCategories(data)
        .filter((category) => !visitorQuickLinks.includes(category))
        .map((category) => (
          <CategorySection
            category={category}
            key={category}
            entries={getEntriesForCategory(category, data)}
          />
        ))}
    </div>
  );
}
