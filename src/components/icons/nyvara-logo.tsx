export default function NyvaraLogo({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 205 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Nyvara Group"
    >
      <text
        x="0"
        y="18"
        fontFamily="'Playfair Display', serif"
        fontSize="22"
        fontWeight="700"
        fill="currentColor"
      >
        NYVARA
      </text>
      <text
        x="120"
        y="18"
        fontFamily="'PT Sans', sans-serif"
        fontSize="20"
        fontWeight="400"
        fill="currentColor"
        opacity="0.8"
      >
        GROUP
      </text>
    </svg>
  );
}
