export default function PerspectiveGrid({ className = "" }: { className?: string }) {
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`} aria-hidden>
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(1,222,130,0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(1,222,130,0.06) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
          transform: "perspective(600px) rotateX(25deg) scale(1.5)",
          transformOrigin: "50% 0%",
          maskImage: "linear-gradient(to bottom, transparent 0%, black 20%, black 70%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 20%, black 70%, transparent 100%)",
        }}
      />
    </div>
  );
}
