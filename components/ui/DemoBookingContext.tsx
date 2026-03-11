"use client";
import { createContext, useContext, useState, useCallback } from "react";

type DemoBookingContextType = {
  isOpen: boolean;
  openBooking: () => void;
  closeBooking: () => void;
};

const DemoBookingContext = createContext<DemoBookingContextType>({
  isOpen: false,
  openBooking: () => {},
  closeBooking: () => {},
});

export function useDemoBooking() {
  return useContext(DemoBookingContext);
}

export function DemoBookingProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const openBooking = useCallback(() => setIsOpen(true), []);
  const closeBooking = useCallback(() => setIsOpen(false), []);

  return (
    <DemoBookingContext.Provider value={{ isOpen, openBooking, closeBooking }}>
      {children}
    </DemoBookingContext.Provider>
  );
}
