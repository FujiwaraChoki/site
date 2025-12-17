"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { Quote as QuoteType } from "@/types";
import TextLink from "@/components/TextLink";

const MAX_HEIGHT = 45; // ~3 lines of text

export default function Quote({
  quote,
  author,
  xLink,
  className,
}: QuoteType & {
  className?: string;
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isTruncated, setIsTruncated] = useState(false);
  const [naturalHeight, setNaturalHeight] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const contentRef = useRef<HTMLQuoteElement>(null);

  useEffect(() => {
    // Check for mobile (no hover capability)
    const checkMobile = () => {
      setIsMobile(window.matchMedia("(hover: none)").matches);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (contentRef.current) {
      const height = contentRef.current.scrollHeight;
      setNaturalHeight(height);
      setIsTruncated(height > MAX_HEIGHT);
    }
  }, [quote]);

  // On mobile, show full quotes (no truncation since hover doesn't work)
  const shouldTruncate = isTruncated && !isMobile;

  return (
    <figure
      className={cn(
        "group relative flex flex-col gap-2 rounded-md font-semibold text-left cursor-default",
        className || ""
      )}
      onMouseEnter={() => shouldTruncate && setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <div className="relative">
        <motion.div
          initial={false}
          animate={{
            height: isExpanded ? naturalHeight : shouldTruncate ? MAX_HEIGHT : "auto",
          }}
          transition={{
            duration: 0.4,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="overflow-hidden"
        >
          <blockquote
            ref={contentRef}
            className={
              "border-l-4 border-foreground/30 pl-4 " +
              "text-base italic text-foreground/70"
            }
          >
            {quote}
          </blockquote>
        </motion.div>

        {/* Gradient fade overlay */}
        <motion.div
          initial={false}
          animate={{
            opacity: shouldTruncate && !isExpanded ? 1 : 0,
          }}
          transition={{
            duration: 0.3,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="absolute bottom-0 left-0 right-0 h-10 pointer-events-none"
          style={{
            background: "linear-gradient(to top, var(--background) 0%, transparent 100%)",
          }}
        />
      </div>

      <figcaption className="pl-4 text-sm text-foreground/80 flex items-center gap-1">
        <span>—</span>
        <TextLink href={xLink}>{author}</TextLink>
      </figcaption>
    </figure>
  );
}
