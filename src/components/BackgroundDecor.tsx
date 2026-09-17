interface GridBackdropProps {
  className?: string;
  opacity?: number;
  color?: string;
  size?: number;
}

/** Faint dotted/lined grid used behind hero and feature sections. */
export function GridBackdrop({ className = "", opacity = 0.5, color = "#EAF1F4", size = 42 }: GridBackdropProps) {
  return (
    <div
      className={`pointer-events-none absolute inset-0 ${className}`}
      style={{
        backgroundImage: `linear-gradient(${color} 1px, transparent 1px), linear-gradient(90deg, ${color} 1px, transparent 1px)`,
        backgroundSize: `${size}px ${size}px`,
        opacity,
      }}
    />
  );
}

interface CircleDecorProps {
  size?: number;
  style?: React.CSSProperties;
}

/** Subtle outlined circle decoration, kept under 15% opacity per brief. */
export function CircleDecor({ size = 160, style }: CircleDecorProps) {
  return (
    <div
      className="pointer-events-none absolute rounded-full"
      style={{
        width: size,
        height: size,
        border: "1px solid #DCE6EB",
        opacity: 0.7,
        ...style,
      }}
    />
  );
}

/** Small dotted matrix, used as an accent near headlines. */
export function DotMatrix({ style }: { style?: React.CSSProperties }) {
  return (
    <div
      className="pointer-events-none absolute grid grid-cols-4 gap-1.5"
      style={style}
    >
      {Array.from({ length: 16 }).map((_, i) => (
        <span key={i} className="w-1 h-1 rounded-full bg-border" />
      ))}
    </div>
  );
}
