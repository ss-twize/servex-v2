"use client";
import { motion } from "framer-motion";
import Link from "next/link";

type ButtonProps = {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  href?: string;
  onClick?: () => void;
  className?: string;
  size?: "default" | "lg";
  disabled?: boolean;
};

export default function Button({
  children,
  variant = "primary",
  href,
  onClick,
  className = "",
  size = "default",
  disabled = false,
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center font-heading font-medium rounded-lg transition-all duration-200 cursor-pointer";
  const sizes = {
    default: "px-6 py-3 text-sm",
    lg: "px-8 py-4 text-base",
  };
  const variants = {
    primary:
      "bg-sx-accent text-sx-deep hover:bg-sx-accent-hover shadow-[0_0_20px_rgba(0,240,144,0.15)] hover:shadow-[0_0_30px_rgba(0,240,144,0.25)] glitch-hover",
    secondary:
      "border border-sx-border text-sx-cream hover:border-sx-accent hover:text-sx-accent",
  };
  const disabledCls = disabled ? "opacity-50 cursor-not-allowed pointer-events-none" : "";
  const cls = `${base} ${sizes[size]} ${variants[variant]} ${disabledCls} ${className}`;

  const MotionComp = motion.span;

  if (href) {
    const isExternal = href.startsWith("http") || href.startsWith("tg:");
    if (isExternal) {
      return (
        <motion.a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={cls}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {children}
        </motion.a>
      );
    }
    return (
      <Link href={href}>
        <MotionComp
          className={cls}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {children}
        </MotionComp>
      </Link>
    );
  }

  return (
    <motion.button
      onClick={onClick}
      className={cls}
      disabled={disabled}
      whileHover={disabled ? undefined : { scale: 1.02 }}
      whileTap={disabled ? undefined : { scale: 0.98 }}
    >
      {children}
    </motion.button>
  );
}
