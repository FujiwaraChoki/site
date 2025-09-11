"use client";

import QuoteList from "@/components/quote/QuoteList";
import { QuoteList as QuoteListType } from "@/types";
import { AnimatePresence, motion } from "framer-motion";
import AudioPlayer from "@/components/AudioPlayer";
import { useEffect, useRef, useState } from "react";
import Copy from "@/components/icons/Copy";
import { cn } from "@/lib/utils";
import Eye from "@/components/icons/See";
import CircleArrowRight from "@/components/icons/ArrowRight";
import XIcon from "@/components/icons/XIcon";

const quotes: QuoteListType = [
  {
    quote: "The only real test of intelligence is if you get what you want out of life.",
    author: "@naval",
    xLink: "https://x.com/naval/status/1259593847580946432"
  },
  {
    quote: "say it with me now. experts are fake, smart generalists rule the world, everything is designed by people no smarter than you, and courage is in shorter supply than genius",
    author: "@tszzl",
    xLink: "https://x.com/tszzl/status/1577059345883283456"
  },
  {
    quote: "You can skip all the parties, all the conferences, all the press, all the tweets. Build a great product and get users and win.",
    author: "@sama",
    xLink: "https://x.com/sama/status/630869612536725504"
  },
  {
    quote: "As you become an adult, you realize that things around you weren't jsut always there; people made them happen. But only recently have I started to internalize how much tenacity *everything* requires. That hotel, that park, that railway. The world is a museum of passion projects.",
    author: "@collision",
    xLink: "https://x.com/collision/status/1529452415346302976"
  }
];

export default function HomePage() {
  const [isEmailOpen, setIsEmailOpen] = useState(false);
  const emailPopoverRef = useRef<HTMLDivElement | null>(null);
  const [copied, setCopied] = useState(false);
  const copyTimeoutRef = useRef<number | null>(null);
  const [xLinkHovered, setXLinkHovered] = useState(false);

  useEffect(() => {
    function handleDocumentClick(event: MouseEvent) {
      if (!isEmailOpen) return;
      const target = event.target as Node | null;
      if (emailPopoverRef.current && target && !emailPopoverRef.current.contains(target)) {
        setIsEmailOpen(false);
      }
    }
    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setIsEmailOpen(false);
    }
    document.addEventListener("mousedown", handleDocumentClick);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleDocumentClick);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isEmailOpen]);

  function handleCopyEmail() {
    const email = "sami@samihindi.com";
    navigator.clipboard.writeText(email).then(() => {
      setCopied(true);
      if (copyTimeoutRef.current) window.clearTimeout(copyTimeoutRef.current);
      copyTimeoutRef.current = window.setTimeout(() => setCopied(false), 1500);
    });
  }

  return (
    <AnimatePresence>
      <div className="container mx-auto w-full max-w-3xl md:max-w-4xl min-h-screen px-4 flex flex-col items-start justify-center font-sans text-left">
        <div className="flex flex-col items-start mb-8">
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-tight">
            <motion.span
              initial={{
                opacity: 0,
                y: 12,
                filter: "blur(2px)",
              }}
              animate={{
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
              }}
              transition={{
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1],
              }}
              exit={{
                opacity: 0,
                y: -4,
                filter: "blur(2px)",
              }}
              style={{ display: "inline-block" }}
            >
              Sami Hindi
            </motion.span>
          </h1>
          <motion.p
            className="mt-2 text-lg sm:text-xl md:text-2xl font-bold"
            initial={{ opacity: 0, y: 12, filter: "blur(2px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
            exit={{ opacity: 0, y: -4, filter: "blur(2px)" }}
          >
            Developer, Student & Founder (+ Investor?)
          </motion.p>
          <motion.a
            href="https://x.com/devbysami"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-gray-500 dark:text-gray-400 my-2 flex items-center gap-1"
            onMouseEnter={() => setXLinkHovered(true)}
            onMouseLeave={() => setXLinkHovered(false)}
            initial={{ opacity: 0, y: 12, filter: "blur(2px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            exit={{ opacity: 0, y: -4, filter: "blur(2px)" }}
          >
            <motion.span initial={false} className="relative inline-flex items-center">
              <span className="relative inline-block" style={{ width: 24, height: 24 }}>
                <motion.span
                  key="x-icon"
                  initial={false}
                  animate={{ opacity: xLinkHovered ? 0 : 1, rotate: 0 }}
                  transition={{ duration: 0.50, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0"
                >
                  <XIcon className="size-6" />
                </motion.span>
                <motion.span
                  key="arrow-icon"
                  initial={false}
                  animate={{ opacity: xLinkHovered ? 1 : 0, rotate: xLinkHovered ? -45 : 0 }}
                  transition={{ duration: 0.50, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0"
                >
                  <CircleArrowRight className="size-6" />
                </motion.span>
              </span>
            </motion.span>
            @devbysami
          </motion.a>
        </div>
        <QuoteList quotes={quotes} />
        <div className="my-6 w-full" ref={emailPopoverRef}>
          <div className="relative inline-block">
            <motion.button
              type="button"
              aria-haspopup="dialog"
              aria-expanded={isEmailOpen}
              aria-controls="email-popover"
              onClick={() => setIsEmailOpen((prev) => !prev)}
              initial={{ opacity: 0, y: 12, filter: "blur(2px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.98 }}
              className="cursor-pointer flex items-center text-base font-medium text-gray-700 dark:text-gray-200 select-none py-2 px-3 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition gap-2"
            >
              <Eye className={cn(isEmailOpen && "invert" || "", "size-6 transition-all duration-700 ease-in-out")} />
              Reveal Email
            </motion.button>
            <AnimatePresence>
              {isEmailOpen ? (
                <motion.div
                  id="email-popover"
                  role="dialog"
                  aria-label="Contact email"
                  initial={{ opacity: 0, y: -4, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -4, scale: 0.98 }}
                  transition={{ duration: 0.16, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute left-0 mt-4 z-20 w-100 rounded-md border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-lg"
                >
                  <div className="px-3 py-2 text-gray-800 dark:text-gray-100 flex items-center justify-between gap-1">
                    <div>
                      Email: {" "}
                      <a href="mailto:sami@samihindi.com" className="underline hover:text-blue-600">
                        sami@samihindi.com
                      </a>
                    </div>
                    <button
                      type="button"
                      onClick={handleCopyEmail}
                      className="text-sm px-2 py-1 rounded transition"
                    >
                      <Copy className={cn(copied && "invert" || "", "size-6 transition-all duration-700 ease-in-out")} />
                    </button>
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        </div>
        <AudioPlayer />
      </div>
    </AnimatePresence>
  )
}
