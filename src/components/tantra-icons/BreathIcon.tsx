const BreathIcon = ({ className = "", size = 48 }: { className?: string; size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className}>
    {/* Infinity / breath wave */}
    <path
      d="M8 32C8 32 16 16 24 16C32 16 32 48 40 48C48 48 56 32 56 32"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      fill="none"
    />
    <path
      d="M8 32C8 32 16 48 24 48C32 48 32 16 40 16C48 16 56 32 56 32"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      fill="none"
      opacity="0.4"
    />
    {/* Center dot */}
    <circle cx="32" cy="32" r="3" fill="currentColor" fillOpacity="0.6" />
    {/* Subtle circles */}
    <circle cx="16" cy="32" r="4" stroke="currentColor" strokeWidth="1" opacity="0.3" />
    <circle cx="48" cy="32" r="4" stroke="currentColor" strokeWidth="1" opacity="0.3" />
  </svg>
);
export default BreathIcon;
