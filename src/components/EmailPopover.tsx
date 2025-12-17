"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Copy from "@/components/icons/Copy";
import SocialLink from "@/components/SocialLink";
import { cn } from "@/lib/utils";

// Obfuscated email - decoded only at runtime when user interacts
const ENCODED_EMAIL = [115, 97, 109, 105, 64, 115, 97, 109, 105, 104, 105, 110, 100, 105, 46, 99, 111, 109];
const decodeEmail = () => ENCODED_EMAIL.map(c => String.fromCharCode(c)).join('');

export default function EmailPopover() {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const popoverRef = useRef<HTMLDivElement | null>(null);
  const copyTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node | null;
      if (popoverRef.current && target && !popoverRef.current.contains(target)) {
        setIsOpen(false);
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setIsOpen(false);
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  const handleToggle = useCallback(() => {
    if (!email) setEmail(decodeEmail());
    setIsOpen(prev => !prev);
  }, [email]);

  const handleCopy = useCallback(() => {
    const decoded = email || decodeEmail();
    navigator.clipboard.writeText(decoded).then(() => {
      setCopied(true);
      if (copyTimeoutRef.current) window.clearTimeout(copyTimeoutRef.current);
      copyTimeoutRef.current = window.setTimeout(() => setCopied(false), 1500);
    });
  }, [email]);

  return (
    <div className="relative inline-block" ref={popoverRef}>
      <SocialLink
        href="#"
        as="button"
        onClick={handleToggle}
        isActive={isOpen}
      >
        email
      </SocialLink>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="email-popover"
            role="dialog"
            aria-label="Contact email"
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.98 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="absolute left-1/2 -translate-x-1/2 mt-3 z-20 whitespace-nowrap"
          >
            <div className="relative bg-gray-900 dark:bg-gray-100 text-gray-100 dark:text-gray-900 px-4 py-2.5 rounded-lg shadow-xl flex items-center gap-3">
              {/* Arrow */}
              <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-gray-900 dark:bg-gray-100 rotate-45" />
              {email && (
                <a
                  href={`mailto:${email}`}
                  className="relative z-10 text-sm font-mono tracking-tight hover:opacity-70 transition-opacity"
                >
                  {email}
                </a>
              )}
              <button
                type="button"
                onClick={handleCopy}
                className="relative z-10 p-1 rounded hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
                aria-label={copied ? "Copied!" : "Copy email"}
              >
                <Copy className={cn(
                  "size-4 transition-all duration-300",
                  copied ? "text-green-400 dark:text-green-600" : "text-gray-400 dark:text-gray-600"
                )} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
