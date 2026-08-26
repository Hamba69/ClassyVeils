/**
 * The one signature visual device on the site: a soft, asymmetric curve
 * standing in for a section divider, echoing the way a veil actually
 * drapes and folds rather than a straight hairline rule.
 */
export default function FabricFold({
  color = "var(--color-line)",
  className = "",
}: {
  color?: string;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 1200 60"
      preserveAspectRatio="none"
      className={`h-[24px] w-full sm:h-[36px] ${className}`}
      aria-hidden="true"
    >
      <path
        d="M0,20 C220,70 380,-10 600,24 C820,58 900,4 1200,30"
        fill="none"
        stroke={color}
        strokeWidth="1.5"
      />
    </svg>
  );
}
