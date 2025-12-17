"use client";

import { motion } from "framer-motion";
import SectionLabel from "@/components/SectionLabel";
import TextLink from "@/components/TextLink";

const ANIMATION_EASE = [0.22, 1, 0.36, 1] as const;

export default function ThingsIDo() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: ANIMATION_EASE, delay: 0.15 }}
    >
      <SectionLabel className="mb-4">Things I do</SectionLabel>
      <ul className="space-y-2 text-foreground/70">
        <li>
          Scroll <TextLink href="https://curated.supply">curated.supply</TextLink> for workspace inspiration
        </li>
        <li>
          Keep up with the latest AI news on<TextLink href="https://x.com">X</TextLink>
        </li>
        <li>
          Learning about <TextLink href="https://www.exlibris.ch/de/buecher-buch/english-books/phd-stephen-laberge/exploring-the-world-of-lucid-dreaming/id/9780345374103/">Lucid Dreaming</TextLink>
        </li>
        <li>
          Fix my Attention Span using <TextLink href="https://medito.app/">Medito</TextLink>
        </li>
        <li>
          Use <TextLink href="https://claude.ai/code">Claude Code</TextLink> to prototype ideas
        </li>
        <li>
          Maintain my AI Chat App <TextLink href="https://www.shiori.ai/?ref=samihindi-portfolio">Shiori</TextLink>
        </li>
        <li>
          Build Custom Keyboards
        </li>
      </ul>
    </motion.section>
  );
}
