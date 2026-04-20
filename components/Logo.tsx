export default function Logo({ className = "h-8" }: { className?: string }) {
  // Gebaseerd op het echte logo: vier letters "NINA" met overlappende kleurvlakken
  // Vervang public/logo.svg met het echte logo wanneer beschikbaar
  return (
    <svg viewBox="0 0 320 120" className={className} aria-label="Nina Passenier Fotografie">
      <g>
        {/* N */}
        <rect x="0" y="0" width="20" height="80" fill="#E8913A" />
        <polygon points="0,0 20,0 60,80 40,80" fill="#E8B544" opacity="0.85" />
        <rect x="40" y="0" width="20" height="80" fill="#E8913A" />

        {/* I */}
        <rect x="80" y="0" width="20" height="80" fill="#E8B544" />
        <circle cx="90" cy="40" r="28" fill="#8FA368" opacity="0.85" />

        {/* N */}
        <rect x="130" y="0" width="20" height="80" fill="#8FA368" />
        <polygon points="130,0 150,0 190,80 170,80" fill="#3E6773" opacity="0.85" />
        <rect x="170" y="0" width="20" height="80" fill="#3E6773" />

        {/* A */}
        <polygon points="210,80 240,0 260,0 290,80 270,80 250,30 230,80" fill="#C9A988" />
        <polygon points="240,0 260,0 290,80 270,80" fill="#3E6773" opacity="0.85" />
        <rect x="235" y="50" width="30" height="8" fill="#C9A988" />
      </g>
      <text x="0" y="112" fontFamily="sans-serif" fontWeight="400" fontSize="20" letterSpacing="8" fill="#1A1A1A">
        FOTOGRAFIE
      </text>
    </svg>
  );
}
