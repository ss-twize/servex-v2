import type { Metadata } from "next";
import { Unbounded, Montserrat } from "next/font/google";
import dynamic from "next/dynamic";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { DemoBookingProvider } from "@/components/ui/DemoBookingContext";
import DemoBooking from "@/components/ui/DemoBooking";

const CustomCursor = dynamic(() => import("@/components/ui/CustomCursor"), {
  ssr: false,
});

const unbounded = Unbounded({
  subsets: ["latin", "latin-ext", "cyrillic"],
  variable: "--font-unbounded",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const montserrat = Montserrat({
  subsets: ["latin", "latin-ext", "cyrillic"],
  variable: "--font-montserrat",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "СЕРВЕКС — цифровой администратор нового поколения",
  description: "Берёт на себя общение с клиентами, запись, переносы и отмены — чтобы бизнес перестал терять выручку на первой линии сервиса. Запуск от 1 дня.",
  keywords: "цифровой администратор, автоматизация записи, чат-бот для салона красоты, автоматизация сервиса, запись клиентов",
  openGraph: {
    title: "СЕРВЕКС — цифровой администратор нового поколения",
    description: "Берёт на себя общение с клиентами, запись, переносы и отмены — чтобы бизнес перестал терять выручку на первой линии сервиса.",
    type: "website",
    locale: "ru_RU",
  },
  twitter: {
    card: "summary_large_image",
    title: "СЕРВЕКС — цифровой администратор нового поколения",
    description: "Цифровой администратор для сервисных бизнесов. Запуск от 1 дня.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className={`${unbounded.variable} ${montserrat.variable} scroll-smooth`}>
      <body className="bg-sx-deep text-sx-cream font-body">
        <DemoBookingProvider>
          <CustomCursor />
          <Header />
          {children}
          <Footer />
          <DemoBooking />
        </DemoBookingProvider>
      </body>
    </html>
  );
}
