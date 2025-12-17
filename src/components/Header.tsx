"use client";

import { motion } from "framer-motion";
import SocialLinks from "@/components/SocialLinks";
import TextLink from "./TextLink";

const ANIMATION_EASE = [0.22, 1, 0.36, 1] as const;

export default function Header() {
  return (
    <header className="flex flex-col items-start mb-12">
      <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-tight">
        <motion.span
          initial={{ opacity: 0, y: 12, filter: "blur(2px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.6, ease: ANIMATION_EASE }}
          exit={{ opacity: 0, y: -4, filter: "blur(2px)" }}
          style={{ display: "inline-block" }}
        >
          Sami Hindi
        </motion.span>
      </h1>
      <motion.p
        className="mt-2 text-lg sm:text-xl md:text-2xl font-bold"
        initial={{ opacity: 0, y: 12, filter: "blur(2px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.6, ease: ANIMATION_EASE, delay: 0.05 }}
        exit={{ opacity: 0, y: -4, filter: "blur(2px)" }}
      >
        Student @ <TextLink href="https://www.zhaw.ch/de/hochschule">ZHAW</TextLink>, Developer.
      </motion.p>
      <motion.div
        className="mt-4"
        initial={{ opacity: 0, y: 12, filter: "blur(2px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.6, ease: ANIMATION_EASE, delay: 0.1 }}
      >
        <SocialLinks />
      </motion.div>
    </header>
  );
}
