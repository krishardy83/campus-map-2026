import { useNavigate, useParams } from "react-router-dom";
import { getCoverImageUrl, getEntryById, getGoogleMapsUrl } from "../lib/utils";
import data from "../data.json";
import Icon from "../components/icon";

export default function Entry() {
  const { entryId } = useParams();
  const navigate = useNavigate();
  const entry = getEntryById(data, entryId);

  if (!entry) {
    return <p>Entry not found</p>;
  }

  return (
    <>
      <img
        src={getCoverImageUrl(entry.image_1_required)}
        alt={entry.entry_title}
        width="448"
        height="298"
        className="aspect-video object-cover bg-gray-50"
      />

      <nav className="border-b border-gray-200 py-4 px-6 flex justify-center">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex flex-col items-center focus-visible:outline-offset-0 outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-sky-800 text-sky-800 text-sm transition-colors hover:bg-sky-100 px-4 rounded-md py-1"
        >
          <Icon name="arrow-left" className="w-8 h-8 mb-1" />
          Overview
        </button>
        <a
          href={getGoogleMapsUrl(entry.location)}
          target="_blank"
          rel="noopener nofollow noreferrer"
          className="inline-flex flex-col items-center focus-visible:outline-offset-0 outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-sky-800 text-sky-800 text-sm transition-colors hover:bg-sky-100 px-4 rounded-md py-1"
        >
          <Icon name="marker" className="w-8 h-8 mb-1" />
          Directions
        </a>

        {entry.read_more_link ? (
          <a
            href={entry.read_more_link}
            target="_blank"
            className="inline-flex flex-col items-center focus-visible:outline-offset-0 outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-sky-800 text-sky-800 text-sm transition-colors hover:bg-sky-100 px-4 rounded-md py-1"
          >
            <Icon name="globe" className="w-8 h-8 mb-1" />
            Website
          </a>
        ) : null}

        {entry.image_2_optional ? (
          <button
            type="button"
            className="inline-flex flex-col items-center focus-visible:outline-offset-0 outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-sky-800 text-sky-800 text-sm transition-colors hover:bg-sky-100 px-4 rounded-md py-1"
          >
            <Icon name="images" className="w-8 h-8 mb-1" />
            Photo Gallery
          </button>
        ) : null}
      </nav>

      <div className="px-6 py-4">
        <h1 className="text-2xl text-sky-800 font-bold mb-2">{entry.entry_title}</h1>
        <p dangerouslySetInnerHTML={{ __html: entry.description }} />

        <button
          onClick={() => navigate(-1)}
          className="text-sky-800 uppercase font-bold text-sm mt-6 inline-block"
        >
          &larr; Back to overview
        </button>
      </div>
    </>
  );
}
