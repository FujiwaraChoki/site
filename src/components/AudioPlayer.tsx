"use client";

import { useState, useRef } from "react";

// Icons
import PlayIcon from "./icons/Play";
import PreviousIcon from "./icons/Previous";
import NextIcon from "./icons/Next";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Song } from "@/types";

const music: Song[] = [
  {
    title: "おつかれSUMMER — Halcali",
    path: "/music/summer.mp3"
  },
  {
    title: "Romance Sengen — カネコアヤノ / kanekoayano",
    path: "/music/romance.mp3"
  },
  {
    title: "Winnin' — Chief Keef",
    path: "/music/winnin.mp3"
  },
  {
    title: "What You Know — Ken Carson ft. Lancey Foux",
    path: "/music/what-yk.mp3"
  },
  {
    title: "41 — NBA YoungBoy",
    path: "/music/41.mp3"
  }
];

export default function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  const handlePlay = () => {
    setIsPlaying(true);
    if (audioRef.current) {
      audioRef.current.play();
    }
  };

  const handlePause = () => {
    setIsPlaying(false);
    if (audioRef.current) {
      audioRef.current.pause();
    }
  };

  const handlePrevious = () => {
    const previousIndex = (currentIndex - 1 + music.length) % music.length;
    setCurrentIndex(previousIndex);
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
    }
    if (isPlaying) {
      // Ensure playback continues when navigating tracks while playing
      requestAnimationFrame(() => {
        if (audioRef.current) {
          audioRef.current.play();
        }
      });
    }
  };

  const handleNext = () => {
    const nextIndex = (currentIndex + 1) % music.length;
    setCurrentIndex(nextIndex);
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
    }
    if (isPlaying) {
      // Ensure playback continues when navigating tracks while playing
      requestAnimationFrame(() => {
        if (audioRef.current) {
          audioRef.current.play();
        }
      });
    }
  };

  const handleAudioEnded = () => {
    setIsPlaying(false);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 flex justify-center">
      <audio
        ref={audioRef}
        src={music[currentIndex].path}
        onEnded={handleAudioEnded}
      />
      <div className="flex flex-col items-center gap-4">
        <motion.p
          className="text-sm text-gray-500 dark:text-gray-400"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          exit={{ opacity: 0, y: 10 }}
        >
          {music[currentIndex].title && isPlaying ? music[currentIndex].title : "None playing"}
        </motion.p>
        <motion.div
          className="flex items-center gap-6 px-6 py-3 m-6 bg-gradient-to-br from-gray-100/90 via-white/80 to-gray-200/80 dark:from-gray-900/90 dark:via-gray-800/80 dark:to-gray-950/80 rounded-2xl border border-gray-300 dark:border-gray-800 shadow-xl backdrop-blur-md"
          initial={{ opacity: 0, y: 20, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          exit={{ opacity: 0, y: 20, scale: 0.98 }}
        >
          <motion.button onClick={handlePrevious} whileHover={{ scale: 1.05, transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] } }} whileTap={{ scale: 0.97, transition: { duration: 0.2, ease: [0.22, 1, 0.36, 1] } }}>
            <PreviousIcon className={"transition-all duration-700 ease-in-out size-8 bg-none"} />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05, transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] } }}
            whileTap={{ scale: 0.97, transition: { duration: 0.2, ease: [0.22, 1, 0.36, 1] } }}
            onClick={() => {
              if (isPlaying) {
                handlePause();
              } else {
                handlePlay();
              }
            }}
          >
            <PlayIcon className={cn(isPlaying && "invert" || "", "transition-all duration-700 ease-in-out size-12")} />
          </motion.button>
          <motion.button onClick={handleNext} whileHover={{ scale: 1.05, transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] } }} whileTap={{ scale: 0.97, transition: { duration: 0.2, ease: [0.22, 1, 0.36, 1] } }}>
            <NextIcon className={"transition-all duration-700 ease-in-out size-8 bg-none"} />
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}
