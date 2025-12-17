"use client";

import { motion } from "framer-motion";
import SectionLabel from "@/components/SectionLabel";
import TextLink from "@/components/TextLink";

const ANIMATION_EASE = [0.22, 1, 0.36, 1] as const;

const technologies = [
  { name: "Pro Display XDR", href: "https://www.apple.com/pro-display-xdr/" },
  { name: "Cyberboard R2", href: "https://drop.com/buy/angry-miao-cyberboard-r2-mechanical-keyboard?defaultSelectionIds=987442,987444" },
  { name: "Magic Mouse", href: "https://www.apple.com/ch-de/shop/product/mxk53z/a/magic-mouse-usb%E2%80%91c-wei%C3%9Fe-multi-touch-oberfl%C3%A4che" },
  { name: "iPad M4 Pro 13\"", href: "https://www.digitec.ch/en/s1/product/apple-ipad-pro-13-2024-m4-wlan-only-13-512-gb-silver-tablets-45556638" },
  { name: "Larq Water Bottle", href: "https://www.galaxus.ch/en/s3/product/larq-purevis-074-l-water-bottles-thermos-flasks-15672877" },
  { name: "Claude Code", href: "https://claude.ai/code" },
  { name: "LaTeX", href: "https://latex-project.org/" },
];

export default function TechIUse() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: ANIMATION_EASE, delay: 0.25 }}
    >
      <SectionLabel className="mb-4">Tech I enjoy</SectionLabel>
      <div className="flex flex-wrap gap-x-1 gap-y-1 text-foreground/70 -ml-1">
        {technologies.map((tech, i) => (
          <span key={tech.name} className="inline-flex items-center">
            <TextLink href={tech.href}>{tech.name}</TextLink>
            {i < technologies.length - 1 && (
              <span className="text-foreground/30 ml-1">/</span>
            )}
          </span>
        ))}
      </div>
    </motion.section>
  );
}
