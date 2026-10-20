import { useState } from 'react'
import { motion } from 'framer-motion'
import { Sparkles, Terminal } from 'lucide-react'
import { playSound } from '../utils/sound'

export default function VintageMascot() {
  const [clicked, setClicked] = useState(false)
  const [speechIndex, setSpeechIndex] = useState(0)

  const dialogue = [
    "HELLO WORLD! I'M BYTE-O!",
    "100% BUG-FREE (USUALLY)!",
    "JAVA 21 & AI AGENTS ROCK!",
    "SCROLL DOWN FOR COOL PROJECTS!",
    "CLICK ME FOR RETRO WISDOM!"
  ]

  const handleClick = () => {
    playSound('retro')
    setClicked(true)
    setSpeechIndex((prev) => (prev + 1) % dialogue.length)
    setTimeout(() => setClicked(false), 600)
  }

  return (
    <div 
      onClick={handleClick}
      className="w-full h-[380px] sm:h-[440px] md:h-[480px] relative select-none flex flex-col items-center justify-center p-6 bg-[#fcfaf2] overflow-hidden cursor-pointer group"
    >
      {/* 1930s Vintage Film Background Elements */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px]" />
      
      {/* Retro Halftone Rays / Radial Glow */}
      <div className="absolute w-[360px] h-[360px] rounded-full border border-dashed border-black/15 animate-[spin_60s_linear_infinite] pointer-events-none" />
      <div className="absolute w-[280px] h-[280px] rounded-full border border-black/10 pointer-events-none" />

      {/* Retro Speech / Thought Bubble */}
      <motion.div 
        animate={clicked ? { scale: [0.9, 1.1, 1], y: [-4, -8, -4] } : { y: [0, -4, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="mb-4 z-10"
      >
        <div className="relative bg-white border-2 border-black px-4 py-1.5 shadow-[3px_3px_0px_#000] font-mono text-xs font-black tracking-tight uppercase flex items-center gap-1.5 text-black">
          <Terminal className="w-3.5 h-3.5 text-[#00f0ff]" />
          <span>{dialogue[speechIndex]}</span>
          {/* Bubble Tail */}
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[7px] border-t-black" />
          <div className="absolute -bottom-[5px] left-1/2 -translate-x-1/2 w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[5px] border-t-white" />
        </div>
      </motion.div>

      {/* --- 1930s RUBBER-HOSE RETRO COMPUTER CHARACTER SVG --- */}
      <motion.div
        animate={
          clicked
            ? { scale: [1, 1.12, 0.95, 1], rotate: [0, -6, 6, 0] }
            : { y: [0, -8, 0], scaleY: [1, 1.02, 0.98, 1], scaleX: [1, 0.98, 1.02, 1] }
        }
        transition={
          clicked
            ? { duration: 0.5 }
            : { duration: 2.2, repeat: Infinity, ease: 'easeInOut' }
        }
        className="relative z-10"
      >
        <svg
          viewBox="0 0 260 280"
          className="w-56 h-56 sm:w-64 sm:h-64 drop-shadow-[4px_6px_0px_rgba(0,0,0,0.95)]"
        >
          <defs>
            {/* Vintage CRT screen gradient */}
            <radialGradient id="crtGlow" cx="50%" cy="50%" r="60%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="85%" stopColor="#f4f4f0" />
              <stop offset="100%" stopColor="#e2e2dc" />
            </radialGradient>
            
            {/* Scanline pattern */}
            <pattern id="scanlines" width="100" height="4" patternUnits="userSpaceOnUse">
              <line x1="0" y1="0" x2="100" y2="0" stroke="#000000" strokeWidth="0.35" opacity="0.12" />
            </pattern>
          </defs>

          {/* --- TOP RETRO BOWLER / DERBY HAT --- */}
          <g className="origin-[130px_70px] transition-transform duration-300 group-hover:rotate-6">
            {/* Hat Brim */}
            <ellipse cx="130" cy="54" rx="42" ry="7" fill="#000000" stroke="#000000" strokeWidth="3" />
            {/* Hat Crown */}
            <path
              d="M102,54 C102,28 158,28 158,54 Z"
              fill="#000000"
              stroke="#000000"
              strokeWidth="2"
            />
            {/* Hat Ribbon (Neon Cyan Accent) */}
            <path
              d="M103,50 C110,48 150,48 157,50 L158,54 C150,52 110,52 102,54 Z"
              fill="#00f0ff"
            />
            {/* Hat Highlight */}
            <path
              d="M112,38 C115,34 125,32 130,32"
              stroke="#ffffff"
              strokeWidth="2.5"
              strokeLinecap="round"
              fill="none"
            />
          </g>

          {/* --- RUBBER-HOSE ARMS & WHITE GLOVES --- */}
          {/* Left Arm (Bendy hose arm) */}
          <g>
            <path
              d="M80,135 C42,140 38,175 62,186"
              fill="none"
              stroke="#000000"
              strokeWidth="11"
              strokeLinecap="round"
            />
            {/* Left Glove Cuff */}
            <ellipse cx="64" cy="186" rx="9" ry="5" fill="#ffffff" stroke="#000000" strokeWidth="3" transform="rotate(-15 64 186)" />
            {/* Left White Cartoon Glove with 3 pin-tucks */}
            <g transform="translate(48, 178)">
              <circle cx="16" cy="18" r="14" fill="#ffffff" stroke="#000000" strokeWidth="3.2" />
              {/* Thumb */}
              <ellipse cx="7" cy="13" rx="6" ry="8" fill="#ffffff" stroke="#000000" strokeWidth="3" transform="rotate(-30 7 13)" />
              {/* 3 vintage glove pin-tucks */}
              <line x1="14" y1="13" x2="14" y2="23" stroke="#000000" strokeWidth="2" strokeLinecap="round" />
              <line x1="18" y1="14" x2="19" y2="22" stroke="#000000" strokeWidth="2" strokeLinecap="round" />
              <line x1="22" y1="16" x2="23" y2="21" stroke="#000000" strokeWidth="2" strokeLinecap="round" />
            </g>
          </g>

          {/* Right Arm (Waving or giving peace sign) */}
          <g>
            <path
              d="M180,135 C218,135 228,110 206,95"
              fill="none"
              stroke="#000000"
              strokeWidth="11"
              strokeLinecap="round"
            />
            {/* Right Glove Cuff */}
            <ellipse cx="206" cy="94" rx="9" ry="5" fill="#ffffff" stroke="#000000" strokeWidth="3" transform="rotate(35 206 94)" />
            {/* Right White Cartoon Glove - Waving */}
            <g transform="translate(196, 68)">
              <circle cx="15" cy="18" r="14" fill="#ffffff" stroke="#000000" strokeWidth="3.2" />
              {/* Thumbs up / Wave Fingers */}
              <rect x="7" y="2" width="6" ry="3" height="12" fill="#ffffff" stroke="#000000" strokeWidth="2.8" />
              <rect x="14" y="0" width="6" ry="3" height="14" fill="#ffffff" stroke="#000000" strokeWidth="2.8" />
              <rect x="21" y="4" width="5.5" ry="3" height="11" fill="#ffffff" stroke="#000000" strokeWidth="2.8" />
              {/* 3 vintage glove pin-tucks */}
              <line x1="12" y1="19" x2="12" y2="26" stroke="#000000" strokeWidth="1.8" strokeLinecap="round" />
              <line x1="16" y1="20" x2="16" y2="27" stroke="#000000" strokeWidth="1.8" strokeLinecap="round" />
              <line x1="20" y1="19" x2="20" y2="25" stroke="#000000" strokeWidth="1.8" strokeLinecap="round" />
            </g>
          </g>

          {/* --- RUBBER-HOSE LEGS & OVERSIZED CARTOON SHOES --- */}
          {/* Left Leg */}
          <path
            d="M106,200 C104,222 96,236 94,244"
            fill="none"
            stroke="#000000"
            strokeWidth="11"
            strokeLinecap="round"
          />
          {/* Left Shoe */}
          <g>
            <ellipse cx="88" cy="254" rx="22" ry="12" fill="#000000" stroke="#000000" strokeWidth="3" />
            <ellipse cx="78" cy="252" rx="10" ry="7" fill="#ffffff" opacity="0.25" />
            <ellipse cx="88" cy="257" rx="22" ry="3" fill="#ffffff" stroke="#000000" strokeWidth="2.5" />
          </g>

          {/* Right Leg */}
          <path
            d="M154,200 C156,222 164,236 166,244"
            fill="none"
            stroke="#000000"
            strokeWidth="11"
            strokeLinecap="round"
          />
          {/* Right Shoe */}
          <g>
            <ellipse cx="172" cy="254" rx="22" ry="12" fill="#000000" stroke="#000000" strokeWidth="3" />
            <ellipse cx="162" cy="252" rx="10" ry="7" fill="#ffffff" opacity="0.25" />
            <ellipse cx="172" cy="257" rx="22" ry="3" fill="#ffffff" stroke="#000000" strokeWidth="2.5" />
          </g>

          {/* --- MAIN CRT COMPUTER HEAD & BODY --- */}
          {/* Outer CRT Monitor Chassis (Beige / Off-white Retro Mac Style) */}
          <rect
            x="72"
            y="56"
            width="116"
            height="146"
            rx="18"
            ry="18"
            fill="#ffffff"
            stroke="#000000"
            strokeWidth="5"
          />
          
          {/* Inner Bezel Shadow */}
          <rect
            x="76"
            y="60"
            width="108"
            height="112"
            rx="12"
            fill="#111111"
          />

          {/* CRT Screen Tube (Curved Bulb Face) */}
          <rect
            x="80"
            y="64"
            width="100"
            height="104"
            rx="14"
            fill="url(#crtGlow)"
            stroke="#000000"
            strokeWidth="3.5"
          />

          {/* Screen Scanlines Texture */}
          <rect
            x="80"
            y="64"
            width="100"
            height="104"
            rx="14"
            fill="url(#scanlines)"
            pointerEvents="none"
          />

          {/* Screen Corner Curvature Reflections */}
          <path
            d="M86,72 C86,68 94,68 100,68"
            stroke="#ffffff"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
          />

          {/* --- 1930s CARTOON PIE-EYES (ANIMATED BLINK) --- */}
          <g className="animate-[pulse_3.5s_infinite]">
            {/* Left Eye */}
            <g transform="translate(104, 102)">
              <ellipse cx="0" cy="0" rx="10.5" ry="15" fill="#000000" />
              {/* Vintage Pie-Eye Wedge Cutout */}
              <polygon points="0,0 -8,-7 -12,2" fill="#ffffff" />
              {/* Catchlight sparkle */}
              <circle cx="3" cy="-5" r="2.5" fill="#ffffff" />
            </g>

            {/* Right Eye */}
            <g transform="translate(156, 102)">
              <ellipse cx="0" cy="0" rx="10.5" ry="15" fill="#000000" />
              {/* Vintage Pie-Eye Wedge Cutout */}
              <polygon points="0,0 -8,-7 -12,2" fill="#ffffff" />
              {/* Catchlight sparkle */}
              <circle cx="3" cy="-5" r="2.5" fill="#ffffff" />
            </g>
          </g>

          {/* Rosy Cheek Dimples */}
          <circle cx="94" cy="120" r="5" fill="#ff7675" opacity="0.6" />
          <circle cx="166" cy="120" r="5" fill="#ff7675" opacity="0.6" />

          {/* Cute Vintage 1930s Grin / Smile with Tongue */}
          <g>
            {/* Wide smiling mouth */}
            <path
              d="M106,124 C116,146 144,146 154,124"
              fill="#000000"
              stroke="#000000"
              strokeWidth="3.5"
              strokeLinecap="round"
            />
            {/* Cartoon Tongue */}
            <path
              d="M120,136 C125,130 135,130 140,136 C136,142 124,142 120,136 Z"
              fill="#ff7675"
            />
            {/* Cheek corner smile crease lines */}
            <path d="M103,122 C104,126 107,126 108,124" stroke="#000000" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            <path d="M157,122 C156,126 153,126 152,124" stroke="#000000" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          </g>

          {/* --- LOWER COMPUTER DETAILS (Floppy Drive & Vintage Badge) --- */}
          {/* Floppy 3.5" Drive Slot */}
          <rect
            x="128"
            y="180"
            width="46"
            height="4.5"
            rx="2"
            fill="#000000"
          />
          {/* Floppy LED indicator light (Cyan Neon) */}
          <circle cx="120" cy="182.5" r="2.5" fill="#00f0ff" stroke="#000000" strokeWidth="1" />

          {/* Retro Vintage Apple / Rainbow style cyber badge */}
          <rect
            x="86"
            y="177"
            width="14"
            height="11"
            rx="2"
            fill="#000000"
          />
          <rect x="88" y="179" width="10" height="2" fill="#00f0ff" />
          <rect x="88" y="181" width="10" height="2" fill="#f59e0b" />
          <rect x="88" y="183" width="10" height="2" fill="#ef4444" />

          {/* Retro Sparkles / Starbursts around mascot */}
          <g className="animate-[ping_3s_cubic-bezier(0,0,0.2,1)_infinite]">
            <path d="M48,80 L52,80 M50,78 L50,82" stroke="#000000" strokeWidth="2.5" strokeLinecap="round" />
          </g>
          <g className="animate-[ping_4s_cubic-bezier(0,0,0.2,1)_infinite_1s]">
            <path d="M214,150 L218,150 M216,148 L216,152" stroke="#000000" strokeWidth="2.5" strokeLinecap="round" />
          </g>
        </svg>
      </motion.div>

      {/* Helper Footer Badge */}
      <div className="mt-4 flex items-center gap-2 bg-white border-2 border-black px-3.5 py-1 text-[11px] font-mono font-bold shadow-[2px_2px_0px_#000] text-black z-10">
        <Sparkles className="w-3.5 h-3.5 text-[#00f0ff]" />
        <span>CLICK BYTE-O TO INTERACT</span>
      </div>
    </div>
  )
}
