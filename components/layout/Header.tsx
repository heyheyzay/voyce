"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

interface HeaderProps {
  ctaLabel?: string;
  ctaHref?: string;
  ctaVariant?: "teal" | "lime";
}

export const Header: React.FC<HeaderProps> = ({
  ctaLabel,
  ctaHref,
  ctaVariant,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isSuppliers = pathname === "/suppliers";

  const resolvedCtaLabel   = ctaLabel   ?? (isSuppliers ? "Record Invoice" : "Add invoice");
  const resolvedCtaHref    = ctaHref    ?? "/invoice/new";
  const resolvedCtaVariant = ctaVariant ?? (isSuppliers ? "lime" : "teal");

  const ctaClass =
    resolvedCtaVariant === "lime"
      ? "h-[52px] px-6 rounded-full bg-[#CDFF00] text-[#121926] text-base font-semibold hover:bg-[#b8e600] active:scale-95 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-[#CDFF00] focus:ring-offset-2"
      : "h-[52px] px-6 rounded-full bg-[#2CA08F] text-white text-base font-semibold hover:bg-[#1D8A79] active:scale-95 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-[#2CA08F] focus:ring-offset-2";

  return (
    <header
      className={`sticky top-0 z-40 h-[64px] transition-colors duration-200 ${
        scrolled
          ? "bg-white/80 backdrop-blur-md border-b border-gray-200/60 shadow-sm"
          : "bg-white border-b border-gray-200"
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-8 h-full flex items-center justify-between">

        {/* Left: logo + nav */}
        <div className="flex items-center gap-8">
          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <svg width="28" height="22" viewBox="0 0 36 29" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 0H12L18 14.5L24 0H36L18 29L0 0Z" fill="#2CA08F"/>
              <path d="M12 0H24L18 14.5L12 0Z" fill="#1D645C"/>
            </svg>
            <span className="text-base font-semibold text-[#111827]">
              Voyce
            </span>
          </div>

          {/* Nav links */}
          <nav className="hidden md:flex items-center gap-1">
            <a
              href="/"
              className={`text-sm font-medium px-3 py-1.5 rounded-md transition-colors duration-150 ${
                pathname === "/"
                  ? "text-[#111827] bg-gray-100"
                  : "text-[#6B7280] hover:text-[#111827] hover:bg-gray-50"
              }`}
            >
              Invoices
            </a>
            <a
              href="/suppliers"
              className={`text-sm font-medium px-3 py-1.5 rounded-md transition-colors duration-150 ${
                isSuppliers
                  ? "text-[#111827] bg-gray-100"
                  : "text-[#6B7280] hover:text-[#111827] hover:bg-gray-50"
              }`}
            >
              Suppliers
            </a>
          </nav>
        </div>

        {/* Right: CTA + avatar */}
        <div className="flex items-center gap-3">
          <a href={resolvedCtaHref}>
            <button className={ctaClass}>
              {resolvedCtaLabel}
            </button>
          </a>
          {/* Avatar */}
          <div className="flex items-center gap-1 cursor-pointer group">
            <div className="size-8 rounded-full bg-[#364152] flex items-center justify-center text-white text-xs font-semibold group-hover:ring-2 group-hover:ring-[#2CA08F] group-hover:ring-offset-2 transition-shadow">
              S
            </div>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 9l6 6 6-6" />
            </svg>
          </div>
        </div>
      </div>
    </header>
  );
};
