import * as Dialog from "@radix-ui/react-dialog";
import { useState } from "react";

type Props = {
  title: string;
  images: string[];
};

export default function Gallery({ images, title }: Props) {
  // const [open, setOpen] = useState(false);
  const [activeImage, setActiveImage] = useState(() => images[0]);

  return (
    <Dialog.Root>
      <Dialog.Trigger className="inline-flex flex-col items-center focus-visible:outline-offset-0 outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-sky-800 text-sky-800 text-sm transition-colors hover:bg-sky-100 px-4 rounded-md py-1">
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
            d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
          />
        </svg>
        Photo Gallery
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="bg-black/30 data-[state=open]:animate-overlay-show fixed inset-0 z-30" />
        <Dialog.Content className="data-[state=open]:animate-content-show fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] p-4 shadow-xl translate-x-[-50%] translate-y-[-50%] rounded-sm bg-white focus:outline-none z-40">
          <div className="flex items-center justify-between mb-4">
            <Dialog.Title className="font-bold text-sky-800 text-2xl">{title}</Dialog.Title>
            <Dialog.Close className="text-sky-800 rounded-sm hover:bg-sky-100 p-1 transition-colors outline-none focus-visible:outline-2 focus-visible:outline-sky-800 focus-visible:outline-offset-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-8 h-8"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </Dialog.Close>
          </div>

          <figure className="mb-4">
            <img
              src={`https://messiah.edu/images/${activeImage}`}
              alt={`image of ${title}`}
              width="1400"
              height="830"
              className="bg-gray-100 w-full max-h-[50vh] object-cover"
            />
          </figure>

          <div className="flex gap-4">
            {images.map((image, index) => (
              <button
                key={image}
                type="button"
                onClick={() => setActiveImage(image)}
                aria-label={`show image ${index + 1}`}
                className="w-1/4 outline-none hover:opacity-90 transition-opacity focus-visible:outline-2 focus-visible:outline-sky-800 focus-visible:opacity-90"
              >
                <img
                  src={`https://messiah.edu/images/${image}`}
                  alt={`image ${index + 1} of ${images.length}`}
                  width="360"
                  height="200"
                  className="bg-gray-100 w-full object-cover"
                />
              </button>
            ))}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
