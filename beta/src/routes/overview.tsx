import CategorySection from "../components/category-section";
import { getCategories, getEntriesForCategory } from "../lib/utils";
import data from "../data.json";

export default function Overview() {
  return (
    <div className="overflow-y-auto flex-1 relative">
      <h2 className="bg-gray-200 text-sky-800 text-lg px-6 py-1 sticky top-0">
        Visitor Quick Links
      </h2>
      <CategorySection category="Admissions" entries={getEntriesForCategory("Admissions", data)} />
      <CategorySection category="Parking" entries={getEntriesForCategory("Parking", data)} />
      <CategorySection
        category="College Entrances"
        entries={getEntriesForCategory("College Entrances", data)}
      />
      <CategorySection
        category="Guest Services"
        entries={getEntriesForCategory("Guest Services", data)}
      />

      <h2 className="bg-gray-200 text-sky-800 text-lg px-6 py-1 mt-4 sticky top-0">Locations</h2>
      {getCategories(data).map((category) => (
        <CategorySection
          category={category}
          key={category}
          entries={getEntriesForCategory(category, data)}
        />
      ))}
    </div>
  );
}
