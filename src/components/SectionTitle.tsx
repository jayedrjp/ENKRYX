interface SectionTitleProps {
  eyebrow?: string;
  title: React.ReactNode;
  description?: string;
  center?: boolean;
  light?: boolean;
}

export default function SectionTitle({
  eyebrow,
  title,
  description,
  center = true,
  light = false,
}: SectionTitleProps) {
  return (
    <div className={`max-w-2xl ${center ? "mx-auto text-center" : ""} mb-14`}>
      {eyebrow && (
        <div
          className="text-xs font-bold tracking-[0.15em] uppercase mb-3"
          style={{ color: light ? "#B9E4EC" : "#006E87" }}
        >
          {eyebrow}
        </div>
      )}
      <h2
        className="text-3xl md:text-4xl font-extrabold italic tracking-tight uppercase text-[#111111] mb-4"
        style={{ color: light ? "#fff" : "#071827" }}
      >
        {title}
      </h2>
      {description && (
        <p
          className="text-xs leading-relaxed"
          style={{ color: light ? "#DDEFF3" : "#5F7285" }}
        >
          {description}
        </p>
      )}
    </div>
  );
}
