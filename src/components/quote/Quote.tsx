import { cn } from "@/lib/utils";
import type { Quote as QuoteType } from "@/types";

export default function Quote({
  quote,
  author,
  xLink,
  className,
}: QuoteType & {
  className?: string;
}) {
  return (
    <figure
      className={cn(
        "group relative flex flex-col gap-2 rounded-md font-semibold text-left",
        className || ""
      )}
    >
      <blockquote
        className={
          "border-l-4 border-gray-200 dark:border-gray-700 pl-4 " +
          "text-base italic text-gray-700 dark:text-gray-300"
        }
      >
        {quote}
      </blockquote>
      <figcaption className="pl-4 text-sm text-gray-500 before:mr-1 before:content-['—']">
        <a
          href={xLink}
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-3"
          aria-label="View source on X"
        >
          {author}
        </a>
      </figcaption>
    </figure>
  )
}
