"use client";
import AnimateOnScroll from "@/components/ui/AnimateOnScroll";

const integrations = [
  {
    name: "Телеграм",
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <circle cx="20" cy="20" r="18" fill="#229ED9" opacity="0.15" />
        <path
          d="M11 20.5l4.5 1.7 1.7 5.5.1.1 2.4-2.4 4.2 3.1L28 13 11 20.5z"
          fill="#229ED9"
        />
        <path
          d="M15.5 22.2l.4 4.3.1.1 2.4-2.4-2.9-2z"
          fill="#1A8BC7"
        />
      </svg>
    ),
  },
  {
    name: "WhatsApp",
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <circle cx="20" cy="20" r="18" fill="#25D366" opacity="0.15" />
        <path
          d="M20 11a9 9 0 00-7.8 13.5L11 29l4.6-1.2A9 9 0 1020 11z"
          stroke="#25D366"
          strokeWidth="1.8"
          fill="none"
        />
        <path
          d="M17.5 16.5c.2-.4.4-.5.6-.5h.5c.2 0 .4 0 .6.4s.7 1.8.8 1.9.1.2 0 .4-.1.2-.2.3l-.4.5c-.1.1-.3.3-.1.5s.7 1.2 1.5 1.9c1 .9 1.5 1 1.8.9.2-.1.6-.6.8-.9.2-.3.3-.3.5-.2l1.6.8c.2.1.4.2.4.3s0 .8-.4 1.4-.9.8-1.7.9c-1 0-2.3-.4-3.9-1.8-2-1.8-3-3.8-3.4-4.5-.3-.5 0-1 .4-1.4z"
          fill="#25D366"
        />
      </svg>
    ),
  },
  {
    name: "Max",
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <circle cx="20" cy="20" r="18" fill="#0077FF" opacity="0.15" />
        <path
          d="M12 26V14l5 8 3-6 3 6 5-8v12"
          stroke="#0077FF"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>
    ),
  },
  {
    name: "YClients",
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <circle cx="20" cy="20" r="18" fill="#FF6600" opacity="0.15" />
        <path
          d="M14 14l6 8v5"
          stroke="#FF6600"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M26 14l-6 8"
          stroke="#FF6600"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    name: "Medesk",
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <circle cx="20" cy="20" r="18" fill="#1E88E5" opacity="0.15" />
        <path
          d="M20 12v16M12 20h16"
          stroke="#1E88E5"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <circle cx="20" cy="20" r="7" stroke="#1E88E5" strokeWidth="1.5" fill="none" />
      </svg>
    ),
  },
  {
    name: "Google Calendar",
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <rect x="10" y="12" width="20" height="18" rx="2" stroke="#4285F4" strokeWidth="1.5" fill="none" />
        <path d="M10 17h20" stroke="#4285F4" strokeWidth="1.5" />
        <rect x="14" y="20" width="4" height="3" rx="0.5" fill="#EA4335" />
        <rect x="22" y="20" width="4" height="3" rx="0.5" fill="#34A853" />
        <rect x="14" y="25" width="4" height="3" rx="0.5" fill="#FBBC04" />
        <rect x="22" y="25" width="4" height="3" rx="0.5" fill="#4285F4" />
        <path d="M16 10v4M24 10v4" stroke="#4285F4" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
];

export default function Integrations() {
  return (
    <section id="integrations" className="py-12 md:py-16 px-6">
      <div className="section-container">
        <AnimateOnScroll>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-sx-cream text-center mb-6">
            Интеграции
          </h2>
        </AnimateOnScroll>
        <AnimateOnScroll delay={0.05}>
          <p className="text-sx-secondary text-center mt-3 mb-10 text-base max-w-xl mx-auto">
            СЕРВЕКС работает как отдельная система или интегрируется с существующими сервисами.
          </p>
        </AnimateOnScroll>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {integrations.map((item, i) => (
            <AnimateOnScroll key={item.name} delay={0.05 * i}>
              <div className="bg-sx-card border border-sx-border rounded-2xl p-4 h-[120px] flex flex-col items-center justify-center gap-3 hover:border-sx-accent/50 transition-colors">
                <div className="w-8 h-8 flex items-center justify-center [&>svg]:w-8 [&>svg]:h-8">
                  {item.icon}
                </div>
                <span className="text-sm font-medium text-sx-secondary">
                  {item.name}
                </span>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
