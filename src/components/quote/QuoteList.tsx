"use client";

import Quote from "./Quote";
import { QuoteList as QuoteListType } from "@/types";
import { motion, AnimatePresence } from "framer-motion";

export default function QuoteList({ quotes }: { quotes: QuoteListType }) {
  return (
    <motion.div
      className="flex flex-col gap-4"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <AnimatePresence>
        {quotes.map((quote, i) => (
          <motion.div
            key={quote.quote}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{
              duration: 0.3,
              ease: "easeOut",
              delay: i * 0.1,
            }}
          >
            <Quote {...quote} />
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  );
}
