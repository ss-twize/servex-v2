"use client";
import { motion, AnimatePresence } from "framer-motion";
import Button from "@/components/ui/Button";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const navItems = [
  { label: "Продукт", href: "#solution" },
  { label: "Калькулятор", href: "#calculator" },
  { label: "Возможности", href: "#features" },
  { label: "Тарифы", href: "#pricing" },
  { label: "Контакты", href: "#contacts" },
];

export default function MobileMenu({ isOpen, onClose }: Props) {
  const handleNavClick = (href: string) => {
    onClose();
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex flex-col bg-sx-deep/95 backdrop-blur-xl"
          initial={{ opacity: 0, x: "100%" }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: "100%" }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Close button */}
          <div className="flex justify-end p-6">
            <button
              onClick={onClose}
              className="text-sx-cream hover:text-sx-accent transition-colors"
              aria-label="Закрыть меню"
            >
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          {/* Nav links */}
          <nav className="flex flex-col items-center gap-8 flex-1 justify-center">
            {navItems.map((item, i) => (
              <motion.button
                key={item.href}
                onClick={() => handleNavClick(item.href)}
                className="font-heading text-2xl text-sx-cream hover:text-sx-accent transition-colors"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.05 }}
              >
                {item.label}
              </motion.button>
            ))}

            <div className="flex flex-col gap-4 mt-8">
              <Button
                href="#contacts"
                variant="primary"
                size="lg"
                onClick={() => {
                  onClose();
                }}
              >
                Записаться на демо
              </Button>
            </div>
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
