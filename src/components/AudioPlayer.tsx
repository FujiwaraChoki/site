"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Song } from "@/types";

const music: Song[] = [
  { title: "おつかれSUMMER — Halcali", path: "/music/summer.mp3" },
  { title: "Romance Sengen — カネコアヤノ", path: "/music/romance.mp3" },
  { title: "Winnin' — Chief Keef", path: "/music/winnin.mp3" },
  { title: "What You Know — Ken Carson", path: "/music/what-yk.mp3" },
  { title: "41 — NBA YoungBoy", path: "/music/41.mp3" }
];

export default function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  const play = () => {
    setIsPlaying(true);
    audioRef.current?.play();
  };

  const pause = () => {
    setIsPlaying(false);
    audioRef.current?.pause();
  };

  const skip = (direction: 1 | -1) => {
    const nextIndex = (currentIndex + direction + music.length) % music.length;
    setCurrentIndex(nextIndex);
    if (audioRef.current) audioRef.current.currentTime = 0;
    if (isPlaying) {
      requestAnimationFrame(() => audioRef.current?.play());
    }
  };

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
      <audio
        ref={audioRef}
        src={music[currentIndex].path}
        onEnded={() => skip(1)}
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
        className="flex flex-col items-center gap-3"
      >
        {/* Now playing label */}
        <AnimatePresence mode="wait">
          {isPlaying && (
            <motion.p
              key={currentIndex}
              initial={{ opacity: 0, y: 8, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -8, filter: "blur(4px)" }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="text-[11px] tracking-wide text-neutral-500 dark:text-neutral-400"
            >
              Now playing{" "}
              <span className="text-neutral-700 dark:text-neutral-300">
                {music[currentIndex].title}
              </span>
            </motion.p>
          )}
        </AnimatePresence>

        {/* Controls */}
        <div className="flex items-center gap-1">
          {/* Previous */}
          <motion.button
            onClick={() => skip(-1)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
            aria-label="Previous track"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path
                d="M3 2v10M11 2L5 7l6 5V2z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.button>

          {/* Play/Pause */}
          <motion.button
            onClick={() => isPlaying ? pause() : play()}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative w-10 h-10 rounded-full bg-neutral-900 dark:bg-neutral-100 text-neutral-100 dark:text-neutral-900 flex items-center justify-center transition-colors"
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            <AnimatePresence mode="wait">
              {isPlaying ? (
                <motion.svg
                  key="pause"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.15 }}
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="currentColor"
                >
                  <rect x="2" y="1" width="3.5" height="12" rx="1" />
                  <rect x="8.5" y="1" width="3.5" height="12" rx="1" />
                </motion.svg>
              ) : (
                <motion.svg
                  key="play"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.15 }}
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="currentColor"
                  className="ml-0.5"
                >
                  <path d="M3 1.5v11l9-5.5L3 1.5z" />
                </motion.svg>
              )}
            </AnimatePresence>
          </motion.button>

          {/* Next */}
          <motion.button
            onClick={() => skip(1)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
            aria-label="Next track"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path
                d="M11 2v10M3 2l6 5-6 5V2z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
