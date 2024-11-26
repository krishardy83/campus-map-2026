import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeftIcon, MapPinIcon, GlobeAltIcon, EyeIcon } from "@heroicons/react/24/outline";
import {
  getCoverImageUrl,
  getEntriesInThisBuilding,
  getEntryByShortcut,
  getGalleryImages,
  getGoogleMapsUrl,
  setPageTitle,
} from "../lib/utils";
import Gallery from "../components/gallery";
import usePageContext from "../hooks/use-page-context";

export default function Entry() {
  const { shortcut } = useParams();
  const navigate = useNavigate();
  const { toggleNavigation, entries } = usePageContext();

  const entry = getEntryByShortcut(entries, shortcut);

  setPageTitle(entry ? entry.entry_title : "Not found");

  if (!entry) {
    return (
      <div>
        <img
          src={getCoverImageUrl()}
          alt=""
          width="448"
          height="298"
          className="aspect-video object-cover bg-gray-50"
        />

        <div className="px-6 py-4">
          <h1 className="font-serif leading-tight text-3xl text-calypso-800 font-bold mb-4">
            Not Found
          </h1>
          <p>The entry you are looking for doesn't exist.</p>

          <button
            onClick={() => navigate("/")}
            className="text-calypso-800 uppercase font-bold text-sm mt-6 inline-flex items-center gap-2"
          >
            <ArrowLeftIcon className="w-5 h-5" />
            Back to overview
          </button>
        </div>
      </div>
    );
  }

  const locationsInside = getEntriesInThisBuilding(entry, entries);

  return (
    <div className="overflow-y-auto">
      <img
        src={getCoverImageUrl(entry.image_1_required)}
        alt={entry.entry_title}
        width="448"
        height="298"
        className="aspect-video object-cover bg-gray-50"
      />

      <nav
        className="border-b border-gray-200 py-4 px-6 flex justify-center"
        aria-label="main navigation"
      >
        <button
          onClick={() => navigate("/")}
          className="inline-flex flex-col items-center focus-visible:outline-offset-0 outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-calypso-800 text-calypso-800 text-xs sm:text-sm transition-colors hover:bg-calypso-800/10 px-4 rounded-md py-1"
        >
          <ArrowLeftIcon className="w-8 h-8 mb-1" />
          Overview
        </button>
        <a
          href={getGoogleMapsUrl(entry.location)}
          target="_blank"
          rel="noopener nofollow noreferrer"
          className="inline-flex flex-col items-center focus-visible:outline-offset-0 outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-calypso-800 text-calypso-800 text-xs sm:text-sm transition-colors hover:bg-calypso-800/10 px-4 rounded-md py-1"
        >
          <MapPinIcon className="w-8 h-8 mb-1" />
          Directions
        </a>

        {entry.read_more_link ? (
          <a
            href={entry.read_more_link}
            target="_blank"
            className="inline-flex flex-col items-center focus-visible:outline-offset-0 outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-calypso-800 text-calypso-800 text-xs sm:text-sm transition-colors hover:bg-calypso-800/10 px-4 rounded-md py-1"
          >
            <GlobeAltIcon className="w-8 h-8 mb-1" />
            Website
          </a>
        ) : null}

        {entry.image_2_optional ? (
          <Gallery title={entry.entry_title} images={getGalleryImages(entry)} />
        ) : null}
      </nav>

      <div className="px-6 pt-4 pb-12">
        <h1 className="font-serif leading-none text-3xl text-calypso-800 font-bold mb-4">
          {entry.entry_title}
        </h1>

        <p dangerouslySetInnerHTML={{ __html: entry.description }} />

        {locationsInside.length > 0 ? (
          <>
            <h2 className="font-serif leading-none mt-8 text-2xl text-calypso-800 font-bold mb-2">
              Locations in this building
            </h2>

            <ul className="list-disc pl-6">
              {locationsInside.map((location) => (
                <li key={location.entry_id}>
                  <Link
                    to={`/${location.shortcut}`}
                    className="hover:underline text-calypso-800 focus-visible:outline-offset-0 outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-calypso-800"
                  >
                    {location.entry_title}
                  </Link>
                </li>
              ))}
            </ul>
          </>
        ) : null}

        <div className="flex items-center gap-x-8 gap-y-4 flex-wrap mt-6 ">
          <button
            onClick={() => navigate("/")}
            className="text-calypso-800 uppercase font-bold text-sm inline-flex items-center gap-2"
          >
            <ArrowLeftIcon className="w-5 h-5" />
            Back to overview
          </button>

          <button
            onClick={toggleNavigation}
            className="inline-flex sm:hidden text-calypso-800 uppercase font-bold text-sm items-center gap-2"
          >
            <EyeIcon className="w-5 h-5" />
            View on the map
          </button>
        </div>
      </div>
    </div>
  );
}
