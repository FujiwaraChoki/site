"use client";

import { AnimatePresence } from "framer-motion";
import Header from "@/components/Header";
import ThingsIDo from "@/components/ThingsIDo";
import TechIUse from "@/components/TechIUse";
import QuotesSection from "@/components/QuotesSection";
import AudioPlayer from "@/components/AudioPlayer";
import ThemeToggle from "@/components/ThemeToggle";

export default function HomePage() {
  return (
    <AnimatePresence>
      <div className="container mx-auto w-full max-w-3xl md:max-w-5xl min-h-screen px-4 pt-16 md:pt-0 flex flex-col items-start justify-center font-sans text-left">
        <Header />

        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
          <div className="flex flex-col gap-10">
            <ThingsIDo />
            <TechIUse />
          </div>
          <QuotesSection />
        </div>

        <AudioPlayer />
        <ThemeToggle />
      </div>
    </AnimatePresence>
  );
}
