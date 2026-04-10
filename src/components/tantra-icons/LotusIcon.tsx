const LotusIcon = ({ className = "", size = 48 }: { className?: string; size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className}>
    {/* Center petal */}
    <path d="M32 8C32 8 24 20 24 32C24 44 32 52 32 52C32 52 40 44 40 32C40 20 32 8 32 8Z" stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity="0.1" />
    {/* Left petal */}
    <path d="M32 52C32 52 16 48 12 36C8 24 16 16 16 16C16 16 20 28 24 36C28 44 32 52 32 52Z" stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity="0.05" />
    {/* Right petal */}
    <path d="M32 52C32 52 48 48 52 36C56 24 48 16 48 16C48 16 44 28 40 36C36 44 32 52 32 52Z" stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity="0.05" />
    {/* Far left petal */}
    <path d="M32 52C32 52 8 44 4 32C0 20 8 12 8 12C8 12 14 24 20 34C26 44 32 52 32 52Z" stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity="0.03" />
    {/* Far right petal */}
    <path d="M32 52C32 52 56 44 60 32C64 20 56 12 56 12C56 12 50 24 44 34C38 44 32 52 32 52Z" stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity="0.03" />
    {/* Base */}
    <ellipse cx="32" cy="54" rx="8" ry="3" stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity="0.1" />
  </svg>
);
export default LotusIcon;
