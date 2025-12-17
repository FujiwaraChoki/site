"use client";

import { motion } from "framer-motion";
import SectionLabel from "@/components/SectionLabel";
import QuoteList from "@/components/quote/QuoteList";
import type { QuoteList as QuoteListType } from "@/types";

const ANIMATION_EASE = [0.22, 1, 0.36, 1] as const;

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

export default function QuotesSection() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: ANIMATION_EASE, delay: 0.2 }}
    >
      <SectionLabel className="mb-6">Quotes I like</SectionLabel>
      <QuoteList quotes={quotes} />
    </motion.section>
  );
}
