const YinYangIcon = ({ className = "", size = 48 }: { className?: string; size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className}>
    {/* Outer circle */}
    <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="1.5" />
    {/* S-curve */}
    <path
      d="M32 4A28 28 0 0 1 32 60A14 14 0 0 1 32 32A14 14 0 0 0 32 4Z"
      fill="currentColor"
      fillOpacity="0.15"
      stroke="currentColor"
      strokeWidth="1"
    />
    {/* Dots */}
    <circle cx="32" cy="18" r="4" fill="currentColor" fillOpacity="0.8" />
    <circle cx="32" cy="46" r="4" stroke="currentColor" strokeWidth="1.5" fill="none" />
  </svg>
);
export default YinYangIcon;
