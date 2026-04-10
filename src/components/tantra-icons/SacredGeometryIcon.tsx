const SacredGeometryIcon = ({ className = "", size = 48 }: { className?: string; size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className}>
    {/* Outer circle */}
    <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="1" opacity="0.4" />
    {/* Inner circle */}
    <circle cx="32" cy="32" r="18" stroke="currentColor" strokeWidth="1" opacity="0.6" />
    {/* Innermost circle */}
    <circle cx="32" cy="32" r="8" stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity="0.1" />
    {/* Triangle up */}
    <path d="M32 10L50 42H14Z" stroke="currentColor" strokeWidth="1.5" fill="none" />
    {/* Triangle down */}
    <path d="M32 54L14 22H50Z" stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity="0.05" />
    {/* Center dot */}
    <circle cx="32" cy="32" r="2" fill="currentColor" />
  </svg>
);
export default SacredGeometryIcon;
