import {
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { PhotoIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

type Props = {
  title: string;
  images: string[];
};

export default function Gallery({ images, title }: Props) {
  const [open, setOpen] = useState(false);
  const [activeImage, setActiveImage] = useState(() => images[0]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex flex-col items-center focus-visible:outline-offset-0 outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-calypso-800 text-calypso-800 text-sm transition-colors hover:bg-calypso-800/10 px-4 rounded-md py-1"
      >
        <PhotoIcon className="w-8 h-8 mb-1" />
        Photo Gallery
      </button>
      <Transition show={open}>
        <Dialog onClose={() => setOpen(false)} className="relative z-50">
          <TransitionChild
            enter="duration-200 ease-out"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="duration-300 ease-out"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/50" aria-hidden="true" />
          </TransitionChild>

          <TransitionChild
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
              <DialogPanel className="w-4/5 bg-white p-4 shadow-xl">
                <div className="flex items-center justify-between mb-4">
                  <DialogTitle className="font-serif text-3xl font-bold text-calypso-800 text-2xl">
                    {title}
                  </DialogTitle>
                  <button
                    onClick={() => setOpen(false)}
                    className="text-calypso-800 rounded-sm hover:bg-calypso-800/10 p-1 transition-colors outline-none focus-visible:outline-2 focus-visible:outline-calypso-800 focus-visible:outline-offset-0"
                    aria-label="close gallery"
                  >
                    <XMarkIcon className="w-8 h-8" />
                  </button>
                </div>
                <Description className="sr-only">
                  This will permanently deactivate your account
                </Description>

                <figure className="mb-4">
                  <img
                    src={`https://messiah.edu/images/${activeImage}`}
                    alt={`image of ${title}`}
                    width="1400"
                    height="830"
                    className="w-full aspect-video object-cover bg-gray-100"
                  />
                </figure>

                <div className="flex gap-4">
                  {images.map((image, index) => (
                    <button
                      key={image}
                      type="button"
                      onClick={() => setActiveImage(image)}
                      aria-label={`show image ${index + 1}`}
                      className="w-1/4 outline-none hover:opacity-90 transition-opacity focus-visible:outline-2 focus-visible:outline-calypso-800 focus-visible:opacity-90"
                    >
                      <img
                        src={`https://messiah.edu/images/${image}`}
                        alt={`image ${index + 1} of ${images.length}`}
                        width="360"
                        height="200"
                        className="w-full aspect-video object-cover bg-gray-100"
                      />
                    </button>
                  ))}
                </div>
              </DialogPanel>
            </div>
          </TransitionChild>
        </Dialog>
      </Transition>
    </>
  );
}
