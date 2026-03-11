"use client";
import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDemoBooking } from "./DemoBookingContext";
import CalendarWidget from "./CalendarWidget";

export default function DemoBooking() {
  const { isOpen, closeBooking } = useDemoBooking();

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
          onClick={(e) => {
            if (e.target === e.currentTarget) closeBooking();
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="bg-sx-card border border-sx-border rounded-2xl max-w-lg w-full mx-4 p-6 sm:p-8 relative"
          >
            {/* Close button */}
            <button
              onClick={closeBooking}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-lg text-sx-muted hover:text-sx-cream hover:bg-sx-deep transition-colors cursor-pointer"
              aria-label="Закрыть"
            >
              <svg
                width="18"
                height="18"
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

            {/* Title */}
            <h2 className="font-heading text-xl sm:text-2xl font-bold text-sx-cream mb-6">
              Запись на демо
            </h2>

            <CalendarWidget onClose={closeBooking} />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
