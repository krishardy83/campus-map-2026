export default function SearchForm() {
  return (
    <search>
      <form method="GET" className="px-6 py-4">
        <input
          type="search"
          placeholder="Search"
          aria-label="Search campus site"
          name="s"
          className="rounded-md h-12 border-2 px-2 placeholder:text-sky-700 placeholder:uppercase border-sky-800 w-full outline-none focus:shadow-lg focus:shadow-sky-100 transition-shadow"
        />
      </form>
    </search>
  );
}
