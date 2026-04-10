const FlameIcon = ({ className = "", size = 48 }: { className?: string; size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className}>
    {/* Outer flame */}
    <path
      d="M32 6C32 6 18 22 18 38C18 46 24 54 32 56C40 54 46 46 46 38C46 22 32 6 32 6Z"
      stroke="currentColor"
      strokeWidth="1.5"
      fill="currentColor"
      fillOpacity="0.08"
    />
    {/* Inner flame */}
    <path
      d="M32 18C32 18 24 28 24 38C24 44 28 50 32 52C36 50 40 44 40 38C40 28 32 18 32 18Z"
      stroke="currentColor"
      strokeWidth="1.5"
      fill="currentColor"
      fillOpacity="0.12"
    />
    {/* Core */}
    <path
      d="M32 30C32 30 28 36 28 40C28 44 30 48 32 48C34 48 36 44 36 40C36 36 32 30 32 30Z"
      stroke="currentColor"
      strokeWidth="1"
      fill="currentColor"
      fillOpacity="0.2"
    />
  </svg>
);
export default FlameIcon;
