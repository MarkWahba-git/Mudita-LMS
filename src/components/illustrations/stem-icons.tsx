"use client";

import { cn } from "@/lib/utils";

interface IllustrationProps {
  className?: string;
  size?: number;
  style?: React.CSSProperties;
}

export function RocketIllustration({ className, size = 120 }: IllustrationProps) {
  return (
    <svg
      viewBox="0 0 120 120"
      width={size}
      height={size}
      className={cn("animate-float", className)}
      aria-hidden="true"
    >
      {/* Rocket body */}
      <path
        d="M60 15 C60 15, 45 35, 45 65 L75 65 C75 35, 60 15, 60 15Z"
        fill="#4f46e5"
        stroke="#3730a3"
        strokeWidth="1.5"
      />
      {/* Nose cone highlight */}
      <path
        d="M60 15 C60 15, 52 35, 52 55 L60 50Z"
        fill="#6366f1"
        opacity="0.5"
      />
      {/* Window */}
      <circle cx="60" cy="45" r="7" fill="#06b6d4" stroke="#0891b2" strokeWidth="1.5" />
      <circle cx="58" cy="43" r="2.5" fill="#ffffff" opacity="0.6" />
      {/* Fins */}
      <path d="M45 55 L30 75 L45 65Z" fill="#ec4899" stroke="#db2777" strokeWidth="1" />
      <path d="M75 55 L90 75 L75 65Z" fill="#ec4899" stroke="#db2777" strokeWidth="1" />
      {/* Exhaust base */}
      <rect x="48" y="65" width="24" height="6" rx="2" fill="#3730a3" />
      {/* Flames */}
      <path d="M52 71 Q55 90, 60 85 Q65 90, 68 71Z" fill="#f59e0b" opacity="0.9" />
      <path d="M55 71 Q58 82, 60 80 Q62 82, 65 71Z" fill="#fbbf24" opacity="0.8" />
      <path d="M57 71 Q59 78, 60 76 Q61 78, 63 71Z" fill="#fef3c7" />
      {/* Stars around */}
      <circle cx="25" cy="25" r="2" fill="#f59e0b" className="animate-sparkle" />
      <circle cx="95" cy="35" r="1.5" fill="#f59e0b" className="animate-sparkle" style={{ animationDelay: "0.5s" }} />
      <circle cx="15" cy="55" r="1" fill="#ec4899" className="animate-sparkle" style={{ animationDelay: "1s" }} />
      <circle cx="100" cy="60" r="2" fill="#7c3aed" className="animate-sparkle" style={{ animationDelay: "1.5s" }} />
    </svg>
  );
}

export function RobotIllustration({ className, size = 120 }: IllustrationProps) {
  return (
    <svg
      viewBox="0 0 120 120"
      width={size}
      height={size}
      className={cn("animate-float-slow", className)}
      aria-hidden="true"
    >
      {/* Antenna */}
      <line x1="60" y1="15" x2="60" y2="28" stroke="#7c3aed" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="60" cy="12" r="4" fill="#f59e0b" className="animate-sparkle" />
      {/* Head */}
      <rect x="35" y="28" width="50" height="35" rx="10" fill="#7c3aed" stroke="#6d28d9" strokeWidth="1.5" />
      {/* Eyes */}
      <circle cx="48" cy="45" r="7" fill="#ffffff" />
      <circle cx="72" cy="45" r="7" fill="#ffffff" />
      <circle cx="49" cy="44" r="3.5" fill="#1e1b4b" />
      <circle cx="73" cy="44" r="3.5" fill="#1e1b4b" />
      <circle cx="50" cy="43" r="1.5" fill="#ffffff" />
      <circle cx="74" cy="43" r="1.5" fill="#ffffff" />
      {/* Mouth */}
      <rect x="45" y="54" width="30" height="4" rx="2" fill="#a78bfa" />
      <rect x="49" y="54" width="4" height="4" fill="#7c3aed" />
      <rect x="58" y="54" width="4" height="4" fill="#7c3aed" />
      <rect x="67" y="54" width="4" height="4" fill="#7c3aed" />
      {/* Body */}
      <rect x="38" y="66" width="44" height="30" rx="8" fill="#6366f1" stroke="#4f46e5" strokeWidth="1.5" />
      {/* Chest panel */}
      <rect x="48" y="72" width="24" height="12" rx="4" fill="#06b6d4" opacity="0.4" />
      <circle cx="56" cy="78" r="3" fill="#10b981" className="animate-sparkle" />
      <circle cx="66" cy="78" r="3" fill="#f59e0b" className="animate-sparkle" style={{ animationDelay: "0.7s" }} />
      {/* Arms */}
      <rect x="22" y="70" width="14" height="6" rx="3" fill="#7c3aed" />
      <rect x="84" y="70" width="14" height="6" rx="3" fill="#7c3aed" />
      <circle cx="20" cy="73" r="5" fill="#a78bfa" />
      <circle cx="100" cy="73" r="5" fill="#a78bfa" />
      {/* Feet */}
      <rect x="42" y="96" width="14" height="8" rx="4" fill="#4f46e5" />
      <rect x="64" y="96" width="14" height="8" rx="4" fill="#4f46e5" />
    </svg>
  );
}

export function AtomIllustration({ className, size = 120 }: IllustrationProps) {
  return (
    <svg
      viewBox="0 0 120 120"
      width={size}
      height={size}
      className={className}
      aria-hidden="true"
    >
      {/* Electron orbits */}
      <ellipse cx="60" cy="60" rx="50" ry="18" fill="none" stroke="#06b6d4" strokeWidth="2" opacity="0.4" transform="rotate(0 60 60)" />
      <ellipse cx="60" cy="60" rx="50" ry="18" fill="none" stroke="#7c3aed" strokeWidth="2" opacity="0.4" transform="rotate(60 60 60)" />
      <ellipse cx="60" cy="60" rx="50" ry="18" fill="none" stroke="#ec4899" strokeWidth="2" opacity="0.4" transform="rotate(-60 60 60)" />
      {/* Nucleus */}
      <circle cx="60" cy="60" r="10" fill="#4f46e5" />
      <circle cx="58" cy="58" r="4" fill="#6366f1" opacity="0.6" />
      {/* Electrons */}
      <circle cx="110" cy="60" r="5" fill="#06b6d4" className="animate-sparkle" />
      <circle cx="35" cy="17" r="5" fill="#7c3aed" className="animate-sparkle" style={{ animationDelay: "0.7s" }} />
      <circle cx="35" cy="103" r="5" fill="#ec4899" className="animate-sparkle" style={{ animationDelay: "1.4s" }} />
    </svg>
  );
}

export function CodeBracketsIllustration({ className, size = 120 }: IllustrationProps) {
  return (
    <svg
      viewBox="0 0 120 120"
      width={size}
      height={size}
      className={cn("animate-float-delayed", className)}
      aria-hidden="true"
    >
      {/* Screen / monitor */}
      <rect x="15" y="15" width="90" height="70" rx="10" fill="#1e1b4b" stroke="#4f46e5" strokeWidth="2" />
      <rect x="20" y="20" width="80" height="55" rx="6" fill="#0f0a30" />
      {/* Code lines */}
      <text x="28" y="38" fill="#10b981" fontSize="14" fontFamily="monospace" fontWeight="bold">&lt;</text>
      <rect x="38" y="30" width="30" height="4" rx="2" fill="#06b6d4" opacity="0.7" />
      <text x="70" y="38" fill="#10b981" fontSize="14" fontFamily="monospace" fontWeight="bold">/&gt;</text>
      <rect x="34" y="42" width="50" height="3" rx="1.5" fill="#7c3aed" opacity="0.5" />
      <rect x="34" y="50" width="35" height="3" rx="1.5" fill="#f59e0b" opacity="0.5" />
      <rect x="34" y="58" width="42" height="3" rx="1.5" fill="#ec4899" opacity="0.5" />
      <rect x="28" y="66" width="20" height="3" rx="1.5" fill="#10b981" opacity="0.5" />
      {/* Screen stand */}
      <rect x="50" y="85" width="20" height="8" rx="2" fill="#4f46e5" />
      <rect x="40" y="93" width="40" height="5" rx="2.5" fill="#6366f1" />
      {/* Cursor blink */}
      <rect x="52" y="65" width="2" height="6" fill="#10b981" className="animate-sparkle" />
    </svg>
  );
}

export function PlanetIllustration({ className, size = 120 }: IllustrationProps) {
  return (
    <svg
      viewBox="0 0 120 120"
      width={size}
      height={size}
      className={cn("animate-float-slow", className)}
      aria-hidden="true"
    >
      {/* Planet */}
      <circle cx="60" cy="60" r="30" fill="#7c3aed" />
      <circle cx="50" cy="50" r="12" fill="#8b5cf6" opacity="0.5" />
      <circle cx="70" cy="65" r="8" fill="#6d28d9" opacity="0.4" />
      {/* Ring */}
      <ellipse cx="60" cy="60" rx="50" ry="12" fill="none" stroke="#a78bfa" strokeWidth="3" opacity="0.5" transform="rotate(-20 60 60)" />
      {/* Moon */}
      <circle cx="100" cy="30" r="8" fill="#f59e0b" />
      <circle cx="98" cy="28" r="3" fill="#fbbf24" opacity="0.5" />
      {/* Stars */}
      <circle cx="15" cy="20" r="1.5" fill="#ffffff" className="animate-sparkle" />
      <circle cx="105" cy="95" r="1" fill="#ffffff" className="animate-sparkle" style={{ animationDelay: "0.5s" }} />
      <circle cx="20" cy="90" r="2" fill="#ffffff" className="animate-sparkle" style={{ animationDelay: "1s" }} />
    </svg>
  );
}

export function MathIllustration({ className, size = 120 }: IllustrationProps) {
  return (
    <svg
      viewBox="0 0 120 120"
      width={size}
      height={size}
      className={className}
      aria-hidden="true"
    >
      {/* Background circle */}
      <circle cx="60" cy="60" r="48" fill="#f59e0b" opacity="0.1" />
      {/* Plus */}
      <rect x="18" y="27" width="24" height="6" rx="3" fill="#f59e0b" />
      <rect x="27" y="18" width="6" height="24" rx="3" fill="#f59e0b" />
      {/* Equals */}
      <rect x="78" y="24" width="24" height="5" rx="2.5" fill="#10b981" />
      <rect x="78" y="34" width="24" height="5" rx="2.5" fill="#10b981" />
      {/* Pi symbol */}
      <text x="50" y="68" fontSize="36" fontWeight="bold" fill="#4f46e5" fontFamily="serif">π</text>
      {/* Divide */}
      <circle cx="30" cy="85" r="3.5" fill="#ec4899" />
      <rect x="18" y="91" width="24" height="5" rx="2.5" fill="#ec4899" />
      <circle cx="30" cy="101" r="3.5" fill="#ec4899" />
      {/* Multiply */}
      <text x="80" y="100" fontSize="28" fontWeight="bold" fill="#7c3aed">×</text>
      {/* Floating numbers */}
      <text x="8" y="62" fontSize="12" fill="#06b6d4" opacity="0.6" fontWeight="bold">42</text>
      <text x="96" y="68" fontSize="11" fill="#f59e0b" opacity="0.6" fontWeight="bold">∞</text>
    </svg>
  );
}

export function DnaIllustration({ className, size = 120 }: IllustrationProps) {
  return (
    <svg
      viewBox="0 0 120 120"
      width={size}
      height={size}
      className={cn("animate-float", className)}
      aria-hidden="true"
    >
      {/* DNA double helix - left strand */}
      <path
        d="M35 10 Q65 30, 35 50 Q5 70, 35 90 Q65 110, 35 120"
        fill="none"
        stroke="#06b6d4"
        strokeWidth="3"
        strokeLinecap="round"
      />
      {/* DNA double helix - right strand */}
      <path
        d="M85 10 Q55 30, 85 50 Q115 70, 85 90 Q55 110, 85 120"
        fill="none"
        stroke="#7c3aed"
        strokeWidth="3"
        strokeLinecap="round"
      />
      {/* Rungs */}
      <line x1="42" y1="20" x2="78" y2="20" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="30" y1="35" x2="90" y2="35" stroke="#f59e0b" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="35" y1="50" x2="85" y2="50" stroke="#ec4899" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="22" y1="65" x2="98" y2="65" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="35" y1="80" x2="85" y2="80" stroke="#f59e0b" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="45" y1="95" x2="75" y2="95" stroke="#ec4899" strokeWidth="2.5" strokeLinecap="round" />
      {/* Nucleotide dots */}
      <circle cx="42" cy="20" r="3" fill="#10b981" />
      <circle cx="78" cy="20" r="3" fill="#10b981" />
      <circle cx="30" cy="35" r="3" fill="#f59e0b" />
      <circle cx="90" cy="35" r="3" fill="#f59e0b" />
      <circle cx="35" cy="50" r="3" fill="#ec4899" />
      <circle cx="85" cy="50" r="3" fill="#ec4899" />
    </svg>
  );
}

/* Small decorative elements for scattered backgrounds */
export function FloatingStar({ className, size = 24, style }: IllustrationProps) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} className={className} style={style} aria-hidden="true">
      <path
        d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 16.8l-6.2 4.5 2.4-7.4L2 9.4h7.6z"
        fill="#f59e0b"
        opacity="0.7"
      />
    </svg>
  );
}

export function FloatingGear({ className, size = 24 }: IllustrationProps) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} className={className} aria-hidden="true">
      <path
        d="M12 15a3 3 0 100-6 3 3 0 000 6z"
        fill="none"
        stroke="#7c3aed"
        strokeWidth="1.5"
      />
      <path
        d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 01-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"
        fill="none"
        stroke="#7c3aed"
        strokeWidth="1.5"
        opacity="0.5"
      />
    </svg>
  );
}
