export default function Marquee() {
  const items = [
    "САЛОНЫ КРАСОТЫ",
    "БАРБЕРШОПЫ",
    "СПА",
    "СТОМАТОЛОГИИ",
    "МАССАЖНЫЕ САЛОНЫ",
    "ПСИХОЛОГИЧЕСКИЕ ЦЕНТРЫ",
    "МЕДИЦИНСКИЕ КЛИНИКИ",
    "СЕРВИСНЫЕ БИЗНЕСЫ",
  ];

  return (
    <div className="py-6 border-y border-sx-border/50 overflow-hidden">
      <div className="animate-marquee whitespace-nowrap flex gap-8">
        {[...items, ...items].map((item, i) => (
          <span key={i} className="font-heading text-sm tracking-[0.3em] text-sx-muted uppercase flex items-center gap-8">
            {item}
            <span className="w-2 h-2 rounded-full bg-sx-accent/40" />
          </span>
        ))}
      </div>
    </div>
  );
}
