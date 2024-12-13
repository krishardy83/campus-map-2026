import clsx from "clsx";
import type { ComponentProps } from "react";

type Props = ComponentProps<"span">;

export default function Skeleton({ className, ...props }: Props) {
  return (
    <span
      {...props}
      aria-hidden="true"
      className={clsx(
        "animate-pulse bg-gray-200 h-5 rounded-sm flex",
        className,
      )}
    />
  );
}
