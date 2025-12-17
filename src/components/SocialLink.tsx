"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface SocialLinkProps {
  href: string;
  children: ReactNode;
  onClick?: () => void;
  isActive?: boolean;
  as?: "a" | "button";
}

export default function SocialLink({
  href,
  children,
  onClick,
  isActive = false,
  as = "a"
}: SocialLinkProps) {
  const Component = as === "button" ? motion.button : motion.a;

  const linkProps = as === "a" ? {
    href,
    target: "_blank",
    rel: "noopener noreferrer"
  } : {
    type: "button" as const,
    onClick
  };

  return (
    <Component
      {...linkProps}
      className="group relative text-sm text-foreground/80 px-1 py-0.5 cursor-pointer"
      whileHover={{ y: -1 }}
      transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
    >
      <span className="relative z-10">{children}</span>
      <motion.span
        className="absolute inset-0 bg-gray-100 dark:bg-gray-800 rounded-sm -z-0"
        initial={{ scaleX: 0, originX: 0 }}
        whileHover={{ scaleX: 1 }}
        animate={{ scaleX: isActive ? 1 : 0 }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      />
    </Component>
  );
}
