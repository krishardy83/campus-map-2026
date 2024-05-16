import { getCategories } from "../lib/utils";
import data from "../data.json";
import CategoryGroup from "../components/category-group";

const visitorQuickLinks = ["Admissions", "Parking", "College Entrances", "Guest Services"];

export default function Overview() {
  return (
    <div className="overflow-y-auto flex-1 relative">
      <CategoryGroup
        title="Visitor Quick Links"
        categories={getCategories(data).filter((category) => visitorQuickLinks.includes(category))}
      />
      <CategoryGroup
        title="Locations"
        categories={getCategories(data).filter((category) => !visitorQuickLinks.includes(category))}
      />
    </div>
  );
}
