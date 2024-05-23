import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { ArrowLeftIcon, MapPinIcon, GlobeAltIcon } from "@heroicons/react/24/outline";
import { getCoverImageUrl, getEntryById, getGalleryImages, getGoogleMapsUrl } from "../lib/utils";
import data from "../data.json";
import Gallery from "../components/gallery";

export default function Entry() {
  const { entryId } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const entry = getEntryById(data, entryId);
  const fromSearch = searchParams.get("origin") === "search";

  function handleNavigateBack() {
    if (fromSearch) {
      navigate("/");
    } else {
      navigate(-1);
    }
  }

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
          <h1 className="text-2xl text-sky-800 font-bold mb-2">Not Found</h1>
          <p>The entry you are looking for doesn't exist.</p>

          <button
            onClick={handleNavigateBack}
            className="text-sky-800 uppercase font-bold text-sm mt-6 inline-flex items-center gap-2"
          >
            <ArrowLeftIcon className="w-5 h-5" />
            Back to overview
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-y-auto">
      <img
        src={getCoverImageUrl(entry.image_1_required)}
        alt={entry.entry_title}
        width="448"
        height="298"
        className="aspect-video object-cover bg-gray-50"
      />

      <nav className="border-b border-gray-200 py-4 px-6 flex justify-center">
        <button
          onClick={handleNavigateBack}
          className="inline-flex flex-col items-center focus-visible:outline-offset-0 outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-sky-800 text-sky-800 text-sm transition-colors hover:bg-sky-100 px-4 rounded-md py-1"
        >
          <ArrowLeftIcon className="w-8 h-8 mb-1" />
          Overview
        </button>
        <a
          href={getGoogleMapsUrl(entry.location)}
          target="_blank"
          rel="noopener nofollow noreferrer"
          className="inline-flex flex-col items-center focus-visible:outline-offset-0 outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-sky-800 text-sky-800 text-sm transition-colors hover:bg-sky-100 px-4 rounded-md py-1"
        >
          <MapPinIcon className="w-8 h-8 mb-1" />
          Directions
        </a>

        {entry.read_more_link ? (
          <a
            href={entry.read_more_link}
            target="_blank"
            className="inline-flex flex-col items-center focus-visible:outline-offset-0 outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-sky-800 text-sky-800 text-sm transition-colors hover:bg-sky-100 px-4 rounded-md py-1"
          >
            <GlobeAltIcon className="w-8 h-8 mb-1" />
            Website
          </a>
        ) : null}

        {entry.image_2_optional ? (
          <Gallery title={entry.entry_title} images={getGalleryImages(entry)} />
        ) : null}
      </nav>

      <div className="px-6 py-4">
        <h1 className="text-2xl text-sky-800 font-bold mb-2">{entry.entry_title}</h1>
        <p dangerouslySetInnerHTML={{ __html: entry.description }} />

        <button
          onClick={handleNavigateBack}
          className="text-sky-800 uppercase font-bold text-sm mt-6 inline-flex items-center gap-2"
        >
          <ArrowLeftIcon className="w-5 h-5" />
          Back to overview
        </button>
      </div>
    </div>
  );
}
