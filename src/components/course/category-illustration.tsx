// SVG illustration components for each STEAM course category.
// Each illustration is designed for a 280×176 viewBox (16:10 card thumbnail).

const Coding = () => (
  <svg viewBox="0 0 280 176" className="h-full w-full" aria-hidden>
    {/* terminal window */}
    <rect x="52" y="20" width="176" height="136" rx="10" fill="rgba(0,0,0,0.38)" />
    <rect x="52" y="20" width="176" height="28" rx="10" fill="rgba(0,0,0,0.55)" />
    <rect x="52" y="38" width="176" height="10" fill="rgba(0,0,0,0.55)" />
    {/* traffic lights */}
    <circle cx="68" cy="34" r="5.5" fill="#FF5F57" />
    <circle cx="84" cy="34" r="5.5" fill="#FFBD2E" />
    <circle cx="100" cy="34" r="5.5" fill="#28CA41" />
    {/* syntax-highlighted code bars */}
    <rect x="68" y="58" width="30" height="7" rx="3.5" fill="#FF79C6" opacity="0.92" />
    <rect x="104" y="58" width="52" height="7" rx="3.5" fill="#F8F8F2" opacity="0.62" />
    <rect x="76" y="72" width="20" height="7" rx="3.5" fill="#8BE9FD" opacity="0.92" />
    <rect x="102" y="72" width="64" height="7" rx="3.5" fill="#50FA7B" opacity="0.78" />
    <rect x="68" y="86" width="44" height="7" rx="3.5" fill="#F1FA8C" opacity="0.92" />
    <rect x="118" y="86" width="30" height="7" rx="3.5" fill="#BD93F9" opacity="0.78" />
    <rect x="154" y="86" width="18" height="7" rx="3.5" fill="#FF79C6" opacity="0.62" />
    <rect x="76" y="100" width="72" height="7" rx="3.5" fill="#F8F8F2" opacity="0.52" />
    <rect x="68" y="114" width="24" height="7" rx="3.5" fill="#8BE9FD" opacity="0.92" />
    {/* blinking cursor */}
    <rect x="98" y="114" width="10" height="7" rx="2" fill="rgba(255,255,255,0.88)" />
    {/* decorative dots */}
    <circle cx="22" cy="22" r="3.5" fill="white" opacity="0.12" />
    <circle cx="255" cy="158" r="4.5" fill="white" opacity="0.1" />
    <circle cx="240" cy="16" r="2.5" fill="white" opacity="0.12" />
  </svg>
);

const AI = () => (
  <svg viewBox="0 0 280 176" className="h-full w-full" aria-hidden>
    {/* ambient glow rings */}
    <circle cx="140" cy="88" r="68" fill="white" opacity="0.06" />
    <circle cx="140" cy="88" r="46" fill="white" opacity="0.07" />
    {/* spokes to ring-1 nodes */}
    <line x1="140" y1="88" x2="140" y2="42" stroke="white" strokeWidth="1.5" opacity="0.35" />
    <line x1="140" y1="88" x2="178" y2="65" stroke="white" strokeWidth="1.5" opacity="0.35" />
    <line x1="140" y1="88" x2="178" y2="111" stroke="white" strokeWidth="1.5" opacity="0.35" />
    <line x1="140" y1="88" x2="140" y2="134" stroke="white" strokeWidth="1.5" opacity="0.35" />
    <line x1="140" y1="88" x2="102" y2="111" stroke="white" strokeWidth="1.5" opacity="0.35" />
    <line x1="140" y1="88" x2="102" y2="65" stroke="white" strokeWidth="1.5" opacity="0.35" />
    {/* ring-2 spokes (faint) */}
    <line x1="140" y1="42" x2="186" y2="18" stroke="white" strokeWidth="1" opacity="0.2" />
    <line x1="178" y1="65" x2="228" y2="52" stroke="white" strokeWidth="1" opacity="0.2" />
    <line x1="178" y1="111" x2="224" y2="136" stroke="white" strokeWidth="1" opacity="0.2" />
    <line x1="140" y1="134" x2="140" y2="164" stroke="white" strokeWidth="1" opacity="0.2" />
    <line x1="102" y1="111" x2="56" y2="136" stroke="white" strokeWidth="1" opacity="0.2" />
    <line x1="102" y1="65" x2="52" y2="52" stroke="white" strokeWidth="1" opacity="0.2" />
    {/* ring-2 nodes */}
    <circle cx="186" cy="18" r="5" fill="white" opacity="0.42" />
    <circle cx="228" cy="52" r="5" fill="white" opacity="0.42" />
    <circle cx="224" cy="136" r="5" fill="white" opacity="0.42" />
    <circle cx="56" cy="136" r="5" fill="white" opacity="0.42" />
    <circle cx="52" cy="52" r="5" fill="white" opacity="0.42" />
    {/* ring-1 nodes */}
    <circle cx="140" cy="42" r="9" fill="white" opacity="0.72" /><circle cx="140" cy="42" r="4.5" fill="rgba(99,102,241,0.95)" />
    <circle cx="178" cy="65" r="9" fill="white" opacity="0.72" /><circle cx="178" cy="65" r="4.5" fill="rgba(99,102,241,0.95)" />
    <circle cx="178" cy="111" r="9" fill="white" opacity="0.72" /><circle cx="178" cy="111" r="4.5" fill="rgba(99,102,241,0.95)" />
    <circle cx="140" cy="134" r="9" fill="white" opacity="0.72" /><circle cx="140" cy="134" r="4.5" fill="rgba(99,102,241,0.95)" />
    <circle cx="102" cy="111" r="9" fill="white" opacity="0.72" /><circle cx="102" cy="111" r="4.5" fill="rgba(99,102,241,0.95)" />
    <circle cx="102" cy="65" r="9" fill="white" opacity="0.72" /><circle cx="102" cy="65" r="4.5" fill="rgba(99,102,241,0.95)" />
    {/* center node */}
    <circle cx="140" cy="88" r="20" fill="white" opacity="0.88" />
    <circle cx="140" cy="88" r="12" fill="rgba(99,102,241,0.85)" />
    <circle cx="140" cy="88" r="5" fill="white" opacity="0.92" />
  </svg>
);

const Robotics = () => (
  <svg viewBox="0 0 280 176" className="h-full w-full" aria-hidden>
    {/* antenna */}
    <line x1="140" y1="32" x2="140" y2="16" stroke="white" strokeWidth="2.5" opacity="0.8" />
    <circle cx="140" cy="12" r="6" fill="white" opacity="0.88" />
    <circle cx="140" cy="12" r="3" fill="rgba(139,233,253,0.9)" />
    {/* head */}
    <rect x="104" y="32" width="72" height="52" rx="10" fill="rgba(255,255,255,0.2)" stroke="white" strokeWidth="2" opacity="0.82" />
    {/* eyes */}
    <circle cx="126" cy="52" r="12" fill="rgba(0,0,0,0.28)" />
    <circle cx="154" cy="52" r="12" fill="rgba(0,0,0,0.28)" />
    <circle cx="126" cy="52" r="7" fill="rgba(139,233,253,0.95)" />
    <circle cx="154" cy="52" r="7" fill="rgba(139,233,253,0.95)" />
    <circle cx="128" cy="50" r="2.5" fill="white" opacity="0.85" />
    <circle cx="156" cy="50" r="2.5" fill="white" opacity="0.85" />
    {/* mouth */}
    <rect x="118" y="70" width="44" height="8" rx="4" fill="rgba(255,255,255,0.45)" />
    {/* neck */}
    <rect x="132" y="84" width="16" height="8" rx="3" fill="rgba(255,255,255,0.3)" />
    {/* body */}
    <rect x="96" y="92" width="88" height="62" rx="10" fill="rgba(255,255,255,0.18)" stroke="white" strokeWidth="2" opacity="0.72" />
    {/* chest screen */}
    <rect x="112" y="102" width="56" height="36" rx="5" fill="rgba(0,0,0,0.25)" />
    <rect x="118" y="108" width="20" height="5" rx="2.5" fill="rgba(139,233,253,0.85)" />
    <rect x="118" y="117" width="32" height="5" rx="2.5" fill="rgba(80,250,123,0.85)" />
    <rect x="118" y="126" width="26" height="5" rx="2.5" fill="rgba(255,121,198,0.85)" />
    {/* arms */}
    <rect x="66" y="96" width="30" height="13" rx="6.5" fill="rgba(255,255,255,0.18)" stroke="white" strokeWidth="1.5" opacity="0.72" />
    <rect x="184" y="96" width="30" height="13" rx="6.5" fill="rgba(255,255,255,0.18)" stroke="white" strokeWidth="1.5" opacity="0.72" />
    {/* legs */}
    <rect x="110" y="154" width="22" height="18" rx="5" fill="rgba(255,255,255,0.18)" stroke="white" strokeWidth="1.5" opacity="0.72" />
    <rect x="148" y="154" width="22" height="18" rx="5" fill="rgba(255,255,255,0.18)" stroke="white" strokeWidth="1.5" opacity="0.72" />
  </svg>
);

const Math = () => (
  <svg viewBox="0 0 280 176" className="h-full w-full" aria-hidden>
    {/* grid */}
    {([44, 88, 132, 176, 220] as number[]).map((x) => (
      <line key={`v${x}`} x1={x} y1="10" x2={x} y2="164" stroke="white" strokeWidth="0.5" opacity="0.14" />
    ))}
    {([32, 64, 96, 128, 152] as number[]).map((y) => (
      <line key={`h${y}`} x1="22" y1={y} x2="258" y2={y} stroke="white" strokeWidth="0.5" opacity="0.14" />
    ))}
    {/* axes */}
    <line x1="44" y1="12" x2="44" y2="158" stroke="white" strokeWidth="2" opacity="0.65" />
    <line x1="22" y1="152" x2="262" y2="152" stroke="white" strokeWidth="2" opacity="0.65" />
    <polygon points="44,10 39,18 49,18" fill="white" opacity="0.65" />
    <polygon points="264,152 256,147 256,157" fill="white" opacity="0.65" />
    {/* parabola y = -(x-140)^2 / 1100 + 152 capped to axes */}
    <path d="M 52,150 C 76,92 110,24 140,16 C 170,24 204,92 232,150"
      stroke="rgba(255,240,100,0.92)" strokeWidth="3" fill="none" strokeLinecap="round" />
    {/* sine wave */}
    <path d="M 52,152 C 74,108 90,196 112,152 C 134,108 150,196 172,152 C 194,108 210,196 232,152"
      stroke="rgba(189,147,249,0.82)" strokeWidth="2.5" fill="none" strokeLinecap="round" />
    {/* intersection dots */}
    <circle cx="56" cy="150" r="5" fill="white" opacity="0.85" />
    <circle cx="226" cy="150" r="5" fill="white" opacity="0.85" />
    {/* math symbols */}
    <text x="216" y="46" fontSize="38" fill="white" fillOpacity="0.68" fontFamily="Georgia, serif">Σ</text>
    <text x="18" y="36" fontSize="28" fill="white" fillOpacity="0.5" fontFamily="Georgia, serif">π</text>
  </svg>
);

const Engineering = () => (
  <svg viewBox="0 0 280 176" className="h-full w-full" aria-hidden>
    {/* blueprint dot grid */}
    {([40, 80, 120, 160, 200, 240] as number[]).map((x) =>
      ([22, 55, 88, 121, 154] as number[]).map((y) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r="1.5" fill="white" opacity="0.12" />
      ))
    )}
    {/* large gear — 10 teeth using rotated rectangles + base circle */}
    <circle cx="116" cy="92" r="52" fill="rgba(255,255,255,0.16)" stroke="white" strokeWidth="2" opacity="0.72" />
    <circle cx="116" cy="92" r="36" fill="rgba(255,255,255,0.12)" stroke="white" strokeWidth="1.5" opacity="0.6" />
    <circle cx="116" cy="92" r="14" fill="rgba(255,255,255,0.28)" stroke="white" strokeWidth="2" opacity="0.8" />
    {([0, 36, 72, 108, 144, 180, 216, 252, 288, 324] as number[]).map((deg) => (
      <rect
        key={deg}
        x="110" y="36" width="12" height="18" rx="3"
        fill="white" opacity="0.65"
        transform={`rotate(${deg} 116 92)`}
      />
    ))}
    {/* small gear — 7 teeth */}
    <circle cx="196" cy="56" r="32" fill="rgba(255,255,255,0.14)" stroke="white" strokeWidth="1.5" opacity="0.65" />
    <circle cx="196" cy="56" r="22" fill="rgba(255,255,255,0.1)" stroke="white" strokeWidth="1" opacity="0.55" />
    <circle cx="196" cy="56" r="9" fill="rgba(255,255,255,0.25)" stroke="white" strokeWidth="1.5" opacity="0.72" />
    {([0, 51, 102, 154, 205, 256, 308] as number[]).map((deg) => (
      <rect
        key={deg}
        x="192" y="22" width="8" height="12" rx="2"
        fill="white" opacity="0.6"
        transform={`rotate(${deg} 196 56)`}
      />
    ))}
    {/* wrench handle */}
    <rect x="188" y="98" width="10" height="52" rx="5" fill="rgba(255,255,255,0.22)" stroke="white" strokeWidth="1.5" opacity="0.65" transform="rotate(-20 193 124)" />
  </svg>
);

const Biology = () => (
  <svg viewBox="0 0 280 176" className="h-full w-full" aria-hidden>
    {/* DNA double helix — strand A */}
    <path d="M 100,10 C 130,30 150,50 140,68 C 130,86 110,90 120,108 C 130,126 150,130 140,148 C 130,166 110,170 120,186"
      stroke="white" strokeWidth="3" fill="none" opacity="0.82" strokeLinecap="round" />
    {/* DNA double helix — strand B */}
    <path d="M 180,10 C 150,30 130,50 140,68 C 150,86 170,90 160,108 C 150,126 130,130 140,148 C 150,166 170,170 160,186"
      stroke="white" strokeWidth="3" fill="none" opacity="0.82" strokeLinecap="round" />
    {/* rungs */}
    <line x1="115" y1="22" x2="165" y2="22" stroke="white" strokeWidth="2.5" opacity="0.6" />
    <line x1="106" y1="40" x2="174" y2="40" stroke="white" strokeWidth="2.5" opacity="0.6" />
    <line x1="124" y1="58" x2="156" y2="58" stroke="white" strokeWidth="2.5" opacity="0.6" />
    <line x1="134" y1="76" x2="146" y2="76" stroke="white" strokeWidth="2.5" opacity="0.52" />
    <line x1="124" y1="94" x2="156" y2="94" stroke="white" strokeWidth="2.5" opacity="0.6" />
    <line x1="112" y1="112" x2="168" y2="112" stroke="white" strokeWidth="2.5" opacity="0.6" />
    <line x1="124" y1="130" x2="156" y2="130" stroke="white" strokeWidth="2.5" opacity="0.6" />
    <line x1="134" y1="148" x2="146" y2="148" stroke="white" strokeWidth="2.5" opacity="0.52" />
    {/* base pair dots */}
    <circle cx="115" cy="22" r="5" fill="rgba(80,250,123,0.9)" />
    <circle cx="165" cy="22" r="5" fill="rgba(255,121,198,0.9)" />
    <circle cx="106" cy="40" r="5" fill="rgba(255,121,198,0.9)" />
    <circle cx="174" cy="40" r="5" fill="rgba(80,250,123,0.9)" />
    <circle cx="124" cy="58" r="5" fill="rgba(139,233,253,0.9)" />
    <circle cx="156" cy="58" r="5" fill="rgba(241,250,140,0.9)" />
    <circle cx="124" cy="94" r="5" fill="rgba(139,233,253,0.9)" />
    <circle cx="156" cy="94" r="5" fill="rgba(241,250,140,0.9)" />
    <circle cx="112" cy="112" r="5" fill="rgba(80,250,123,0.9)" />
    <circle cx="168" cy="112" r="5" fill="rgba(255,121,198,0.9)" />
    <circle cx="124" cy="130" r="5" fill="rgba(255,121,198,0.9)" />
    <circle cx="156" cy="130" r="5" fill="rgba(80,250,123,0.9)" />
    {/* decorative particles */}
    <circle cx="50" cy="60" r="4" fill="white" opacity="0.3" />
    <circle cx="230" cy="100" r="3.5" fill="white" opacity="0.28" />
    <circle cx="44" cy="130" r="3" fill="white" opacity="0.25" />
  </svg>
);

const Chemistry = () => (
  <svg viewBox="0 0 280 176" className="h-full w-full" aria-hidden>
    {/* benzene hex ring */}
    <polygon points="140,32 178,54 178,98 140,120 102,98 102,54"
      stroke="white" strokeWidth="2.5" fill="rgba(255,255,255,0.12)" opacity="0.82" />
    {/* alternating double bonds inside */}
    <line x1="140" y1="38" x2="173" y2="57" stroke="white" strokeWidth="1.5" opacity="0.45" />
    <line x1="173" y1="62" x2="173" y2="93" stroke="white" strokeWidth="1.5" opacity="0.45" />
    <line x1="107" y1="57" x2="107" y2="93" stroke="white" strokeWidth="1.5" opacity="0.45" />
    {/* corner atoms */}
    <circle cx="140" cy="32" r="8" fill="white" opacity="0.82" /><circle cx="140" cy="32" r="4" fill="rgba(244,114,182,0.9)" />
    <circle cx="178" cy="54" r="8" fill="white" opacity="0.82" /><circle cx="178" cy="54" r="4" fill="rgba(244,114,182,0.9)" />
    <circle cx="178" cy="98" r="8" fill="white" opacity="0.82" /><circle cx="178" cy="98" r="4" fill="rgba(244,114,182,0.9)" />
    <circle cx="140" cy="120" r="8" fill="white" opacity="0.82" /><circle cx="140" cy="120" r="4" fill="rgba(244,114,182,0.9)" />
    <circle cx="102" cy="98" r="8" fill="white" opacity="0.82" /><circle cx="102" cy="98" r="4" fill="rgba(244,114,182,0.9)" />
    <circle cx="102" cy="54" r="8" fill="white" opacity="0.82" /><circle cx="102" cy="54" r="4" fill="rgba(244,114,182,0.9)" />
    {/* side chains */}
    <line x1="140" y1="32" x2="140" y2="14" stroke="white" strokeWidth="2" opacity="0.6" />
    <circle cx="140" cy="10" r="6" fill="white" opacity="0.7" /><circle cx="140" cy="10" r="3" fill="rgba(244,114,182,0.9)" />
    <line x1="178" y1="54" x2="198" y2="42" stroke="white" strokeWidth="2" opacity="0.6" />
    <circle cx="204" cy="38" r="6" fill="white" opacity="0.7" />
    <line x1="178" y1="98" x2="200" y2="112" stroke="white" strokeWidth="2" opacity="0.6" />
    <circle cx="206" cy="116" r="6" fill="white" opacity="0.65" />
    <line x1="102" y1="54" x2="82" y2="42" stroke="white" strokeWidth="2" opacity="0.6" />
    <circle cx="76" cy="38" r="6" fill="white" opacity="0.7" />
    {/* flask outline (background) */}
    <path d="M 220,92 L 236,140 Q 240,152 230,156 L 196,156 Q 186,152 190,140 Z"
      stroke="white" strokeWidth="1.5" fill="rgba(255,255,255,0.1)" opacity="0.55" />
    <rect x="224" y="76" width="12" height="18" rx="3" fill="rgba(255,255,255,0.15)" stroke="white" strokeWidth="1.5" opacity="0.55" />
    {/* bubbles in flask */}
    <circle cx="210" cy="140" r="4" fill="white" opacity="0.4" />
    <circle cx="220" cy="128" r="3" fill="white" opacity="0.35" />
    <circle cx="230" cy="142" r="2.5" fill="white" opacity="0.3" />
  </svg>
);

const Electronics = () => (
  <svg viewBox="0 0 280 176" className="h-full w-full" aria-hidden>
    {/* circuit board traces */}
    <path d="M 20,30 L 80,30 L 80,60 L 200,60 L 200,30 L 260,30" stroke="white" strokeWidth="2" opacity="0.5" fill="none" />
    <path d="M 20,88 L 60,88 L 60,120 L 220,120 L 220,88 L 260,88" stroke="white" strokeWidth="2" opacity="0.5" fill="none" />
    <path d="M 80,60 L 80,88" stroke="white" strokeWidth="2" opacity="0.4" fill="none" />
    <path d="M 200,60 L 200,88" stroke="white" strokeWidth="2" opacity="0.4" fill="none" />
    <path d="M 60,120 L 60,148 L 220,148 L 220,120" stroke="white" strokeWidth="2" opacity="0.4" fill="none" />
    <path d="M 140,88 L 140,120" stroke="white" strokeWidth="2" opacity="0.4" fill="none" />
    {/* solder pads */}
    {([20, 80, 200, 260] as number[]).map((x) => (
      <circle key={`p30-${x}`} cx={x} cy={30} r="6" fill="white" opacity="0.65" />
    ))}
    {([20, 60, 140, 220, 260] as number[]).map((x) => (
      <circle key={`p88-${x}`} cx={x} cy={88} r="6" fill="white" opacity="0.65" />
    ))}
    {([60, 220] as number[]).map((x) => (
      <circle key={`p148-${x}`} cx={x} cy={148} r="6" fill="white" opacity="0.65" />
    ))}
    {/* IC chip */}
    <rect x="108" y="64" width="64" height="48" rx="4" fill="rgba(0,0,0,0.35)" stroke="white" strokeWidth="2" opacity="0.75" />
    <rect x="116" y="72" width="48" height="32" rx="2" fill="rgba(255,255,255,0.08)" />
    {/* chip pins */}
    {([72, 84, 96, 108] as number[]).map((y) => (<line key={`lpin${y}`} x1="100" y1={y} x2="108" y2={y} stroke="white" strokeWidth="2" opacity="0.6" />))}
    {([72, 84, 96, 108] as number[]).map((y) => (<line key={`rpin${y}`} x1="172" y1={y} x2="180" y2={y} stroke="white" strokeWidth="2" opacity="0.6" />))}
    {/* lightning bolt */}
    <polygon points="152,74 144,92 150,92 138,110 150,94 144,94 152,74" fill="rgba(255,240,100,0.9)" />
  </svg>
);

const Arts = () => (
  <svg viewBox="0 0 280 176" className="h-full w-full" aria-hidden>
    {/* paint blobs background */}
    <circle cx="60" cy="50" r="32" fill="rgba(255,100,100,0.22)" />
    <circle cx="220" cy="48" r="28" fill="rgba(100,150,255,0.22)" />
    <circle cx="140" cy="140" r="34" fill="rgba(100,255,180,0.18)" />
    {/* palette body */}
    <path d="M 90,60 C 70,48 60,72 68,92 C 76,110 96,118 116,112 C 124,128 136,132 148,126 C 160,120 168,108 162,94 C 174,86 178,72 168,62 C 154,48 122,40 102,52 Z"
      fill="rgba(255,255,255,0.82)" stroke="white" strokeWidth="0" />
    {/* thumb hole */}
    <circle cx="138" cy="100" r="14" fill="rgba(0,0,0,0)" stroke="rgba(200,180,160,0.5)" strokeWidth="2" />
    <ellipse cx="138" cy="100" rx="10" ry="10" fill="rgba(255,220,180,0.5)" />
    {/* color dots on palette */}
    <circle cx="96" cy="68" r="9" fill="#FF5252" />
    <circle cx="118" cy="58" r="9" fill="#FFAB40" />
    <circle cx="142" cy="56" r="9" fill="#FFEE58" />
    <circle cx="162" cy="64" r="9" fill="#66BB6A" />
    <circle cx="168" cy="86" r="9" fill="#42A5F5" />
    <circle cx="156" cy="106" r="9" fill="#AB47BC" />
    {/* brush */}
    <rect x="172" y="88" width="10" height="64" rx="5" fill="rgba(255,255,255,0.6)" transform="rotate(30 177 120)" />
    <rect x="173" y="90" width="8" height="18" rx="2" fill="rgba(180,120,60,0.8)" transform="rotate(30 177 120)" />
    <ellipse cx="177" cy="91" rx="4" ry="10" fill="rgba(100,180,100,0.85)" transform="rotate(30 177 120)" />
    {/* sparkles */}
    <path d="M 58,130 L 60,120 L 62,130 L 72,132 L 62,134 L 60,144 L 58,134 L 48,132 Z" fill="white" opacity="0.7" />
    <path d="M 220,130 L 221,124 L 222,130 L 228,131 L 222,132 L 221,138 L 220,132 L 214,131 Z" fill="white" opacity="0.55" />
  </svg>
);

const Language = () => (
  <svg viewBox="0 0 280 176" className="h-full w-full" aria-hidden>
    {/* large speech bubble */}
    <path d="M 46,30 Q 46,18 58,18 L 190,18 Q 202,18 202,30 L 202,94 Q 202,106 190,106 L 90,106 L 70,126 L 72,106 L 58,106 Q 46,106 46,94 Z"
      fill="rgba(255,255,255,0.82)" stroke="white" strokeWidth="0" />
    {/* text lines in bubble */}
    <text x="68" y="50" fontSize="38" fill="rgba(99,102,241,0.9)" fontFamily="Georgia, serif" fontWeight="bold">Aa</text>
    <rect x="68" y="68" width="88" height="7" rx="3.5" fill="rgba(99,102,241,0.25)" />
    <rect x="68" y="80" width="64" height="7" rx="3.5" fill="rgba(99,102,241,0.18)" />
    {/* small reply bubble */}
    <path d="M 152,120 Q 152,110 162,110 L 232,110 Q 242,110 242,120 L 242,156 Q 242,166 232,166 L 170,166 L 154,176 L 156,166 L 162,166 Q 152,166 152,156 Z"
      fill="rgba(255,255,255,0.55)" stroke="white" strokeWidth="2" opacity="0.72" />
    <rect x="166" y="126" width="60" height="6" rx="3" fill="white" opacity="0.65" />
    <rect x="166" y="138" width="44" height="6" rx="3" fill="white" opacity="0.5" />
    <rect x="166" y="150" width="52" height="6" rx="3" fill="white" opacity="0.4" />
    {/* floating letters */}
    <text x="22" y="80" fontSize="22" fill="white" fillOpacity="0.25" fontFamily="Georgia, serif">学</text>
    <text x="244" y="44" fontSize="22" fill="white" fillOpacity="0.22" fontFamily="Georgia, serif">Ä</text>
    <text x="26" y="148" fontSize="18" fill="white" fillOpacity="0.2" fontFamily="Georgia, serif">abc</text>
  </svg>
);

const STEM = () => (
  <svg viewBox="0 0 280 176" className="h-full w-full" aria-hidden>
    {/* stars */}
    <circle cx="36" cy="28" r="2.5" fill="white" opacity="0.7" />
    <circle cx="244" cy="20" r="2" fill="white" opacity="0.6" />
    <circle cx="254" cy="48" r="3" fill="white" opacity="0.55" />
    <circle cx="22" cy="70" r="2" fill="white" opacity="0.5" />
    <circle cx="258" cy="90" r="2.5" fill="white" opacity="0.55" />
    <circle cx="40" cy="130" r="2" fill="white" opacity="0.45" />
    <circle cx="248" cy="140" r="2.5" fill="white" opacity="0.5" />
    <circle cx="68" cy="22" r="1.5" fill="white" opacity="0.6" />
    <circle cx="196" cy="14" r="1.5" fill="white" opacity="0.55" />
    {/* rocket body */}
    <path d="M 140,16 C 124,30 116,54 116,80 L 164,80 C 164,54 156,30 140,16 Z"
      fill="rgba(255,255,255,0.85)" />
    {/* nose */}
    <path d="M 116,80 L 100,108 L 116,104 L 116,80 Z" fill="rgba(255,255,255,0.62)" />
    <path d="M 164,80 L 180,108 L 164,104 L 164,80 Z" fill="rgba(255,255,255,0.62)" />
    {/* window */}
    <circle cx="140" cy="58" r="16" fill="rgba(139,233,253,0.65)" stroke="white" strokeWidth="2.5" />
    <circle cx="140" cy="58" r="9" fill="rgba(99,102,241,0.75)" />
    <circle cx="136" cy="54" r="3.5" fill="white" opacity="0.65" />
    {/* body center line */}
    <rect x="138" y="74" width="4" height="30" rx="2" fill="rgba(0,0,0,0.18)" />
    {/* engine nozzle */}
    <path d="M 116,108 L 120,130 L 160,130 L 164,108 Z" fill="rgba(255,255,255,0.62)" />
    {/* flame */}
    <path d="M 122,130 C 118,148 128,158 140,162 C 152,158 162,148 158,130 Z"
      fill="rgba(255,160,50,0.82)" />
    <path d="M 128,130 C 126,144 132,152 140,154 C 148,152 154,144 152,130 Z"
      fill="rgba(255,220,50,0.88)" />
    <path d="M 133,130 C 132,140 136,146 140,148 C 144,146 148,140 147,130 Z"
      fill="rgba(255,255,200,0.92)" />
    {/* sparkle */}
    <path d="M 56,60 L 58,50 L 60,60 L 70,62 L 60,64 L 58,74 L 56,64 L 46,62 Z" fill="white" opacity="0.65" />
    <path d="M 218,70 L 220,64 L 222,70 L 228,72 L 222,74 L 220,80 L 218,74 L 212,72 Z" fill="white" opacity="0.55" />
  </svg>
);

// --- unique replacements for previously-duplicated categories ---

// Technology: monitor dashboard with sidebar + bar chart
const Technology = () => (
  <svg viewBox="0 0 280 176" className="h-full w-full" aria-hidden>
    {/* monitor frame */}
    <rect x="52" y="16" width="176" height="122" rx="10" fill="rgba(0,0,0,0.35)" stroke="white" strokeWidth="2" opacity="0.72" />
    <rect x="52" y="16" width="176" height="26" rx="10" fill="rgba(0,0,0,0.5)" />
    <rect x="52" y="32" width="176" height="10" fill="rgba(0,0,0,0.5)" />
    {/* browser circles */}
    <circle cx="67" cy="29" r="4.5" fill="rgba(255,255,255,0.32)" />
    <circle cx="80" cy="29" r="4.5" fill="rgba(255,255,255,0.32)" />
    {/* URL bar */}
    <rect x="94" y="25" width="112" height="8" rx="4" fill="rgba(255,255,255,0.16)" />
    {/* sidebar */}
    <rect x="58" y="42" width="36" height="92" fill="rgba(0,0,0,0.22)" />
    <rect x="63" y="50" width="26" height="5" rx="2.5" fill="rgba(255,255,255,0.42)" />
    <rect x="63" y="62" width="26" height="5" rx="2.5" fill="rgba(99,102,241,0.95)" />
    <rect x="63" y="74" width="26" height="5" rx="2.5" fill="rgba(255,255,255,0.28)" />
    <rect x="63" y="86" width="26" height="5" rx="2.5" fill="rgba(255,255,255,0.28)" />
    <rect x="63" y="98" width="26" height="5" rx="2.5" fill="rgba(255,255,255,0.28)" />
    {/* stat cards row */}
    <rect x="100" y="48" width="40" height="18" rx="4" fill="rgba(255,255,255,0.12)" stroke="white" strokeWidth="1" opacity="0.35" />
    <rect x="146" y="48" width="40" height="18" rx="4" fill="rgba(255,255,255,0.12)" stroke="white" strokeWidth="1" opacity="0.35" />
    <rect x="192" y="48" width="30" height="18" rx="4" fill="rgba(99,102,241,0.38)" stroke="white" strokeWidth="1" opacity="0.52" />
    {/* bar chart */}
    <rect x="102" y="94" width="13" height="36" rx="3" fill="rgba(99,102,241,0.82)" />
    <rect x="120" y="80" width="13" height="50" rx="3" fill="rgba(139,233,253,0.82)" />
    <rect x="138" y="70" width="13" height="60" rx="3" fill="rgba(80,250,123,0.82)" />
    <rect x="156" y="86" width="13" height="44" rx="3" fill="rgba(255,121,198,0.82)" />
    <rect x="174" y="62" width="13" height="68" rx="3" fill="rgba(241,250,140,0.82)" />
    {/* chart baseline */}
    <line x1="98" y1="132" x2="194" y2="132" stroke="white" strokeWidth="1" opacity="0.32" />
    {/* stand */}
    <rect x="126" y="138" width="28" height="12" rx="2" fill="rgba(255,255,255,0.2)" />
    <rect x="112" y="150" width="56" height="7" rx="3.5" fill="rgba(255,255,255,0.3)" />
    {/* floating data points */}
    <circle cx="240" cy="22" r="3" fill="white" opacity="0.2" />
    <circle cx="254" cy="40" r="2" fill="white" opacity="0.18" />
  </svg>
);

// Mathematics: Euclidean geometry — compass, right triangle, labels
const Mathematics = () => (
  <svg viewBox="0 0 280 176" className="h-full w-full" aria-hidden>
    {/* subtle grid */}
    {([44, 88, 132, 176, 220] as number[]).map((x) => (
      <line key={`v${x}`} x1={x} y1="0" x2={x} y2="176" stroke="white" strokeWidth="0.5" opacity="0.1" />
    ))}
    {([36, 72, 108, 144] as number[]).map((y) => (
      <line key={`h${y}`} x1="0" y1={y} x2="280" y2={y} stroke="white" strokeWidth="0.5" opacity="0.1" />
    ))}
    {/* right triangle */}
    <polygon points="52,148 52,48 196,148" stroke="white" strokeWidth="2.5" fill="rgba(255,255,255,0.12)" opacity="0.88" />
    {/* right-angle box */}
    <polyline points="52,128 72,128 72,148" stroke="white" strokeWidth="2" fill="none" opacity="0.72" />
    {/* angle arc at hypotenuse base */}
    <path d="M 172,148 A 24,24 0 0,1 196,126" stroke="white" strokeWidth="1.5" fill="none" opacity="0.62" />
    {/* side labels */}
    <text x="22" y="102" fontSize="18" fill="white" fillOpacity="0.82" fontFamily="Georgia, serif" fontStyle="italic">a</text>
    <text x="112" y="168" fontSize="18" fill="white" fillOpacity="0.82" fontFamily="Georgia, serif" fontStyle="italic">b</text>
    <text x="118" y="88" fontSize="18" fill="white" fillOpacity="0.82" fontFamily="Georgia, serif" fontStyle="italic" transform="rotate(-34 118 88)">c</text>
    {/* theorem label */}
    <text x="172" y="74" fontSize="17" fill="white" fillOpacity="0.72" fontFamily="Georgia, serif">a²+b²=c²</text>
    {/* compass — pivot + two arms + arc */}
    <circle cx="228" cy="110" r="4" fill="white" opacity="0.72" />
    <line x1="228" y1="110" x2="228" y2="80" stroke="white" strokeWidth="2" opacity="0.62" />
    <line x1="228" y1="110" x2="252" y2="126" stroke="white" strokeWidth="2" opacity="0.62" />
    <circle cx="228" cy="80" r="4" fill="white" opacity="0.55" />
    <circle cx="252" cy="126" r="4" fill="white" opacity="0.55" />
    <path d="M 218,80 A 32,32 0 0,1 254,106" stroke="white" strokeWidth="1.5" fill="none" opacity="0.5" strokeDasharray="4 3" />
    {/* floating symbols */}
    <text x="18" y="40" fontSize="30" fill="white" fillOpacity="0.5" fontFamily="Georgia, serif">π</text>
    <text x="230" y="168" fontSize="22" fill="white" fillOpacity="0.4" fontFamily="Georgia, serif">φ</text>
  </svg>
);

// Science: telescope pointing at a ringed planet
const Science = () => (
  <svg viewBox="0 0 280 176" className="h-full w-full" aria-hidden>
    {/* stars */}
    <circle cx="44" cy="26" r="2.5" fill="white" opacity="0.7" />
    <circle cx="80" cy="14" r="2" fill="white" opacity="0.6" />
    <circle cx="136" cy="10" r="3" fill="white" opacity="0.65" />
    <circle cx="202" cy="20" r="2" fill="white" opacity="0.6" />
    <circle cx="244" cy="12" r="2.5" fill="white" opacity="0.55" />
    <circle cx="264" cy="38" r="2" fill="white" opacity="0.48" />
    <circle cx="28" cy="58" r="1.5" fill="white" opacity="0.5" />
    <circle cx="260" cy="66" r="2" fill="white" opacity="0.45" />
    {/* ringed planet */}
    <circle cx="82" cy="58" r="30" fill="rgba(255,255,255,0.16)" stroke="white" strokeWidth="1.5" opacity="0.58" />
    <ellipse cx="82" cy="58" rx="50" ry="14" stroke="white" strokeWidth="1.5" fill="none" opacity="0.48" />
    <ellipse cx="76" cy="50" rx="13" ry="8" fill="rgba(255,255,255,0.1)" />
    <circle cx="78" cy="55" r="5" fill="rgba(255,255,255,0.12)" />
    {/* small moon */}
    <circle cx="138" cy="34" r="10" fill="rgba(255,255,255,0.18)" stroke="white" strokeWidth="1" opacity="0.52" />
    <circle cx="134" cy="31" r="3.5" fill="rgba(255,255,255,0.12)" />
    {/* telescope — rotated group, pointing upper-left toward planet */}
    <g transform="rotate(-32 134 128)">
      <rect x="72" y="118" width="124" height="20" rx="10" fill="rgba(255,255,255,0.22)" stroke="white" strokeWidth="2" opacity="0.75" />
      {/* eyepiece */}
      <rect x="62" y="120" width="14" height="16" rx="4" fill="rgba(255,255,255,0.18)" stroke="white" strokeWidth="1.5" opacity="0.65" />
      {/* objective lens */}
      <circle cx="200" cy="128" r="13" fill="rgba(139,233,253,0.28)" stroke="white" strokeWidth="2" opacity="0.72" />
      <circle cx="200" cy="128" r="7" fill="rgba(139,233,253,0.42)" />
    </g>
    {/* tripod legs */}
    <line x1="132" y1="138" x2="108" y2="172" stroke="white" strokeWidth="2.5" opacity="0.62" />
    <line x1="138" y1="140" x2="140" y2="174" stroke="white" strokeWidth="2.5" opacity="0.62" />
    <line x1="144" y1="138" x2="168" y2="168" stroke="white" strokeWidth="2.5" opacity="0.62" />
    {/* sparkle */}
    <path d="M 244,86 L 246,78 L 248,86 L 256,88 L 248,90 L 246,98 L 244,90 L 236,88 Z" fill="white" opacity="0.52" />
    <path d="M 30,100 L 31.5,94 L 33,100 L 39,101.5 L 33,103 L 31.5,109 L 30,103 L 24,101.5 Z" fill="white" opacity="0.45" />
  </svg>
);

// Physics: glass prism splitting white light into a rainbow spectrum
const Physics = () => (
  <svg viewBox="0 0 280 176" className="h-full w-full" aria-hidden>
    {/* prism */}
    <polygon points="120,22 56,152 184,152" stroke="white" strokeWidth="2.5" fill="rgba(255,255,255,0.18)" opacity="0.88" />
    {/* prism inner sheen — left face highlight */}
    <line x1="120" y1="22" x2="56" y2="152" stroke="white" strokeWidth="5" opacity="0.08" />
    <line x1="116" y1="28" x2="72" y2="122" stroke="white" strokeWidth="2" opacity="0.18" />
    {/* incoming white light beam */}
    <line x1="18" y1="78" x2="98" y2="78" stroke="white" strokeWidth="5" opacity="0.85" strokeLinecap="round" />
    {/* refraction inside prism (faint) */}
    <line x1="98" y1="78" x2="152" y2="140" stroke="white" strokeWidth="1.5" opacity="0.22" />
    {/* spectrum rays from exit point on right face */}
    <line x1="152" y1="122" x2="262" y2="76"  stroke="#FF4444" strokeWidth="3.5" opacity="0.88" strokeLinecap="round" />
    <line x1="152" y1="126" x2="262" y2="90"  stroke="#FF8800" strokeWidth="3.5" opacity="0.88" strokeLinecap="round" />
    <line x1="152" y1="130" x2="262" y2="104" stroke="#FFE600" strokeWidth="3.5" opacity="0.88" strokeLinecap="round" />
    <line x1="152" y1="134" x2="262" y2="118" stroke="#44DD44" strokeWidth="3.5" opacity="0.88" strokeLinecap="round" />
    <line x1="152" y1="138" x2="262" y2="132" stroke="#4488FF" strokeWidth="3.5" opacity="0.88" strokeLinecap="round" />
    <line x1="152" y1="142" x2="262" y2="148" stroke="#AA44FF" strokeWidth="3.5" opacity="0.88" strokeLinecap="round" />
    {/* physics equations */}
    <text x="16" y="36" fontSize="15" fill="white" fillOpacity="0.52" fontFamily="Georgia, serif">c = λf</text>
    <text x="16" y="56" fontSize="15" fill="white" fillOpacity="0.42" fontFamily="Georgia, serif">E = hf</text>
    {/* corner particles */}
    <circle cx="48" cy="132" r="2.5" fill="white" opacity="0.38" />
    <circle cx="34" cy="112" r="2" fill="white" opacity="0.3" />
    <circle cx="210" cy="28" r="2.5" fill="white" opacity="0.32" />
  </svg>
);

const illustrationMap: Record<string, React.FC> = {
  coding: Coding,
  technology: Technology,
  ai: AI,
  mathematics: Mathematics,
  math: Math,
  science: Science,
  robotics: Robotics,
  engineering: Engineering,
  biology: Biology,
  chemistry: Chemistry,
  physics: Physics,
  electronics: Electronics,
  arts: Arts,
  language: Language,
  stem: STEM,
};

export function CategoryIllustration({
  category,
  gradient,
}: {
  category: string;
  gradient: string;
}) {
  const key = category.toLowerCase();
  const Illustration = illustrationMap[key] ?? STEM;

  return (
    <div className={`h-full w-full bg-gradient-to-br ${gradient} overflow-hidden`}>
      <Illustration />
    </div>
  );
}
