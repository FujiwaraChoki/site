"use client";

import SocialLink from "@/components/SocialLink";
import EmailPopover from "@/components/EmailPopover";

interface SocialLinksProps {
  className?: string;
}

export default function SocialLinks({ className = "" }: SocialLinksProps) {
  return (
    <div className={`flex items-center gap-1 ${className}`}>
      <span className="text-sm text-foreground/50 select-none">
        find me on
      </span>
      <SocialLink href="https://x.com/devbysami">x</SocialLink>
      <span className="text-foreground/30 select-none">/</span>
      <SocialLink href="https://github.com/FujiwaraChoki">github</SocialLink>
      <span className="text-foreground/30 select-none">/</span>
      <EmailPopover />
    </div>
  );
}
