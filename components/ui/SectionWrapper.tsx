type Props = {
  id?: string;
  children: React.ReactNode;
  className?: string;
};

export default function SectionWrapper({
  id,
  children,
  className = "",
}: Props) {
  return (
    <section id={id} className={`py-24 md:py-32 px-6 ${className}`}>
      <div className="max-w-7xl mx-auto">{children}</div>
    </section>
  );
}
