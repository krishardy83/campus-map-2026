import { useNavigate, useParams, useSearchParams } from "react-router-dom";
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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
              />
            </svg>
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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-8 h-8 mb-1"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
            />
          </svg>
          Overview
        </button>
        <a
          href={getGoogleMapsUrl(entry.location)}
          target="_blank"
          rel="noopener nofollow noreferrer"
          className="inline-flex flex-col items-center focus-visible:outline-offset-0 outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-sky-800 text-sky-800 text-sm transition-colors hover:bg-sky-100 px-4 rounded-md py-1"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-8 h-8 mb-1"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
            />
          </svg>
          Directions
        </a>

        {entry.read_more_link ? (
          <a
            href={entry.read_more_link}
            target="_blank"
            className="inline-flex flex-col items-center focus-visible:outline-offset-0 outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-sky-800 text-sky-800 text-sm transition-colors hover:bg-sky-100 px-4 rounded-md py-1"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-8 h-8 mb-1"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418"
              />
            </svg>
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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
            />
          </svg>
          Back to overview
        </button>
      </div>
    </div>
  );
}
