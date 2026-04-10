const ChakraIcon = ({ className = "", size = 48 }: { className?: string; size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className}>
    {/* Outer ring */}
    <circle cx="32" cy="32" r="26" stroke="currentColor" strokeWidth="1.5" />
    {/* Petal pattern */}
    {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
      <ellipse
        key={angle}
        cx="32"
        cy="16"
        rx="5"
        ry="10"
        stroke="currentColor"
        strokeWidth="1"
        fill="currentColor"
        fillOpacity="0.08"
        transform={`rotate(${angle} 32 32)`}
      />
    ))}
    {/* Center */}
    <circle cx="32" cy="32" r="6" stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity="0.15" />
    <circle cx="32" cy="32" r="2" fill="currentColor" />
  </svg>
);
export default ChakraIcon;
