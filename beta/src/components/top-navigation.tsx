export default function TopNavigation() {
  return (
    <nav className="fixed top-0 right-48 flex gap-2 z-10">
      <a
        href="https://www.messiah.edu/homepage/1553/request_information"
        target="_blank"
        rel="noopener nofollow noreferrer"
        className="bg-primary text-white px-3 text-sm py-1 rounded-b-sm hover:underline focus-visible:underline outline-none"
      >
        Request Info
      </a>
      <a
        href="https://www.messiah.edu/visit"
        target="_blank"
        rel="noopener nofollow noreferrer"
        className="bg-secondary text-white px-3 text-sm py-1 rounded-b-sm hover:underline focus-visible:underline outline-none"
      >
        Visit Campus
      </a>
    </nav>
  );
}
