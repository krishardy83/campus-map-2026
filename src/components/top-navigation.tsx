export default function TopNavigation() {
  return (
    <nav className="fixed top-0 right-14 md:right-48 flex gap-2 z-10">
      <a
        href="https://www.messiah.edu/request-info/"
        target="_blank"
        rel="noopener nofollow noreferrer"
        className="bg-calypso-800 text-white px-3 text-sm py-1 rounded-b-sm hover:underline focus-visible:underline outline-hidden"
      >
        Request Info
      </a>
      <a
        href="https://www.messiah.edu/visit"
        target="_blank"
        rel="noopener nofollow noreferrer"
        className="bg-victoria-800 text-white px-3 text-sm py-1 rounded-b-sm hover:underline focus-visible:underline outline-hidden"
      >
        Visit Campus
      </a>
    </nav>
  );
}
