import { ReactNode } from "react";

interface SectionLabelProps {
  children: ReactNode;
  className?: string;
}

export default function SectionLabel({ children, className = "" }: SectionLabelProps) {
  return (
    <span
      className={`text-[10px] uppercase tracking-[0.3em] text-foreground/50 font-medium block ${className}`}
    >
      {children}
    </span>
  );
}
