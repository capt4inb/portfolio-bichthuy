import React, { useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

interface ExpandableTextProps {
  text: string;
  maxChars?: number; // Số ký tự tối đa khi thu gọn
  className?: string;
}

export default function ExpandableText({ text, maxChars = 120, className }: ExpandableTextProps) {
  const isMobile = useIsMobile();
  const [expanded, setExpanded] = useState(false);

  if (!isMobile) {
    return <span className={className}>{text}</span>;
  }

  if (text.length <= maxChars) {
    return <span className={className}>{text}</span>;
  }

  return (
    <span className={className}>
      {expanded ? (
        <>
          {text} <button className="text-indigo-600 underline ml-1 text-sm" onClick={() => setExpanded(false)}>less</button>
        </>
      ) : (
        <>
          {text.slice(0, maxChars).trim()}... <button className="text-indigo-600 underline ml-1 text-sm" onClick={() => setExpanded(true)}>more</button>
        </>
      )}
    </span>
  );
}
