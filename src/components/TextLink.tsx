"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface TextLinkProps {
  href: string;
  children: ReactNode;
  external?: boolean;
  showArrow?: boolean;
  className?: string;
}

export default function TextLink({
  href,
  children,
  external = true,
  showArrow = true,
  className = ""
}: TextLinkProps) {
  const shouldShowArrow = external && showArrow;

  return (
    <motion.a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className={`relative inline text-inherit no-underline group mx-1 ${className}`}
      whileHover="hover"
      initial="initial"
    >
      {children}
      {shouldShowArrow && (
        <motion.span
          className="inline-block text-[0.75em] opacity-50 group-hover:opacity-80 transition-opacity"
          variants={{
            initial: { x: 0, y: 0 },
            hover: { x: 1, y: -1 }
          }}
          transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          ↗
        </motion.span>
      )}
      {/* Animated underline */}
      <motion.span
        className="absolute left-0 -bottom-0.5 h-px bg-current origin-left"
        style={{ width: "100%" }}
        variants={{
          initial: { scaleX: 0.3, opacity: 0.4 },
          hover: { scaleX: 1, opacity: 1 }
        }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      />
      {/* Subtle highlight on hover */}
      <motion.span
        className="absolute inset-0 -z-10 rounded-sm pointer-events-none bg-transparent dark:bg-white/[0.08]"
        style={{ margin: "-2px -4px", padding: "2px 4px" }}
        variants={{
          initial: { opacity: 0 },
          hover: { opacity: 1 }
        }}
        transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
      />
    </motion.a>
  );
}
