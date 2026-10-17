interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "center" | "left";
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
}: SectionHeadingProps) {
  const alignment = align === "center" ? "items-center text-center" : "items-start text-left";

  return (
    <div className={`flex flex-col gap-2 ${alignment}`}>
      {eyebrow && (
        <p className="text-xs font-bold tracking-[0.18em] text-honda uppercase">{eyebrow}</p>
      )}
      <h2 className="max-w-2xl text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">
        {title}
      </h2>
      {description && (
        <p className="max-w-2xl text-sm leading-relaxed text-charcoal-soft sm:text-base">
          {description}
        </p>
      )}
    </div>
  );
}
