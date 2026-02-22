"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ─── Asset URLs from Figma ────────────────────────────────────────────────────
const HERO_IMAGE = "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80";
const HERO_BG_GRADIENT = "linear-gradient(120.521deg, rgb(255,255,255) 6.41%, rgba(235,253,57,0.2) 42.06%, rgb(214,249,215) 73.8%)";
const GREEN_GRADIENT = "linear-gradient(180deg, #dafad9 0%, #b8eec8 50%, #e0f7e4 100%)";

// ─── Noise overlay ────────────────────────────────────────────────────────────
function NoiseOverlay() {
  return (
    <svg className="pointer-events-none fixed inset-0 z-[999] opacity-[0.035]" width="100%" height="100%">
      <filter id="noise">
        <feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="4" stitchTiles="stitch" />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect width="100%" height="100%" filter="url(#noise)" />
    </svg>
  );
}

// ─── Magnetic Button ──────────────────────────────────────────────────────────
function MagneticButton({
  children,
  className = "",
  onClick,
  href,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onEnter = () => gsap.to(el, { scale: 1.03, duration: 0.2, ease: "power2.out" });
    const onLeave = () => gsap.to(el, { scale: 1, duration: 0.2, ease: "power2.out" });
    el.addEventListener("mouseenter", onEnter);
    el.addEventListener("mouseleave", onLeave);
    return () => { el.removeEventListener("mouseenter", onEnter); el.removeEventListener("mouseleave", onLeave); };
  }, []);

  const base = `relative overflow-hidden inline-flex items-center justify-center gap-1 px-6 py-5 rounded-full font-semibold text-lg leading-[1.1] tracking-[0.02em] transition-colors duration-150 cursor-pointer ${className}`;

  if (href) {
    return <a ref={ref as React.Ref<HTMLAnchorElement>} href={href} className={base}>{children}</a>;
  }
  return (
    <button ref={ref as React.Ref<HTMLButtonElement>} onClick={onClick} className={base}>
      {children}
    </button>
  );
}

// ─── Smart Extraction Animation ───────────────────────────────────────────────
function SmartExtractionAnim() {
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ repeat: -1, repeatDelay: 0.8 });

      // Cards enter
      tl.fromTo(".doc-stack", { opacity: 0, y: 20 }, { opacity: 1, y: 0, stagger: 0.12, duration: 0.6, ease: "power3.out" })
        // Scan line travels down
        .fromTo(".scan-line", { y: 0, opacity: 0.9 }, { y: "160px", opacity: 0.9, duration: 1.2, ease: "none" }, "-=0.1")
        // Rows light up as scan passes
        .fromTo(".text-row-1", { scaleX: 0.6, opacity: 0.2 }, { scaleX: 1, opacity: 1, duration: 0.3, ease: "power2.out", transformOrigin: "left" }, "-=1.0")
        .fromTo(".text-row-2", { scaleX: 0.6, opacity: 0.2 }, { scaleX: 1, opacity: 1, duration: 0.3, ease: "power2.out", transformOrigin: "left" }, "-=0.72")
        .fromTo(".text-row-3", { scaleX: 0.6, opacity: 0.2 }, { scaleX: 1, opacity: 1, duration: 0.3, ease: "power2.out", transformOrigin: "left" }, "-=0.52")
        .fromTo(".text-row-4", { scaleX: 0.6, opacity: 0.2 }, { scaleX: 1, opacity: 1, duration: 0.3, ease: "power2.out", transformOrigin: "left" }, "-=0.32")
        // Checkmark draw
        .fromTo(".checkmark-path", { strokeDashoffset: 30, opacity: 0 }, { strokeDashoffset: 0, opacity: 1, duration: 0.35, ease: "power2.out" })
        .to({}, { duration: 0.8 })
        // Fade out & reset
        .to(".doc-stack, .scan-line, .checkmark-path", { opacity: 0, duration: 0.4 })
        .set(".text-row-1, .text-row-2, .text-row-3, .text-row-4", { scaleX: 0.6, opacity: 0.2 });
    }, stageRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={stageRef} className="relative w-full h-[196px] overflow-hidden flex items-center justify-center" style={{ background: GREEN_GRADIENT }}>
      {/* Stacked document cards */}
      <div className="doc-stack absolute" style={{ left: "50%", top: "18px", transform: "translateX(-50%) translate(-10px,-8px) rotate(-4deg)", width: 160, height: 130, background: "#fff", borderRadius: 6, boxShadow: "0 2px 12px rgba(0,0,0,0.08)", opacity: 0 }} />
      <div className="doc-stack absolute" style={{ left: "50%", top: "18px", transform: "translateX(-50%) translate(-5px,-4px) rotate(-2deg)", width: 160, height: 130, background: "#fff", borderRadius: 6, boxShadow: "0 2px 12px rgba(0,0,0,0.10)", opacity: 0 }} />
      {/* Front card */}
      <div className="doc-stack absolute" style={{ left: "50%", top: "18px", transform: "translateX(-50%)", width: 160, height: 130, background: "#fff", borderRadius: 6, boxShadow: "0 4px 20px rgba(0,0,0,0.14)", opacity: 0, overflow: "hidden" }}>
        {/* Header bar */}
        <div style={{ height: 14, background: "#f0fdf9", borderBottom: "1px solid #d1fae5" }} />
        {/* Small logo circle */}
        <div style={{ position: "absolute", top: 20, left: 12, width: 12, height: 12, borderRadius: "50%", background: "#2CA08F", opacity: 0.4 }} />
        {/* Text rows */}
        <div className="text-row-1" style={{ position: "absolute", top: 24, left: 30, height: 5, width: 100, borderRadius: 3, background: "#1A1A1A", opacity: 0.2 }} />
        <div className="text-row-2" style={{ position: "absolute", top: 36, left: 30, height: 5, width: 80, borderRadius: 3, background: "#1A1A1A", opacity: 0.2 }} />
        <div className="text-row-3" style={{ position: "absolute", top: 52, left: 30, height: 5, width: 110, borderRadius: 3, background: "#1A1A1A", opacity: 0.2 }} />
        <div className="text-row-4" style={{ position: "absolute", top: 64, left: 30, height: 5, width: 70, borderRadius: 3, background: "#1A1A1A", opacity: 0.2 }} />
        {/* Scan line */}
        <div className="scan-line" style={{ position: "absolute", top: 14, left: 0, right: 0, height: 2, background: "linear-gradient(90deg, transparent, #2CA08F, transparent)", opacity: 0 }} />
        {/* Checkmark */}
        <svg className="checkmark-path" style={{ position: "absolute", top: 8, right: 10, opacity: 0 }} width="18" height="18" viewBox="0 0 18 18" fill="none">
          <circle cx="9" cy="9" r="8" fill="#dcfce7" stroke="#22c55e" strokeWidth="1.5" />
          <path d="M5.5 9.5l2.5 2.5 4.5-5" stroke="#16a34a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="30" strokeDashoffset="30" />
        </svg>
      </div>
    </div>
  );
}

// ─── Manual Entry Animation ───────────────────────────────────────────────────
function ManualEntryAnim() {
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ repeat: -1, repeatDelay: 0.8 });

      tl.fromTo(".entry-card", { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" })
        // Focus ring field 1
        .to(".field-1-ring", { strokeOpacity: 1, duration: 0.2 })
        // Cursor blink 3x
        .to(".cursor-1", { opacity: 0, repeat: 3, yoyo: true, duration: 0.25 })
        // Type fill field 1
        .fromTo(".type-fill-1", { scaleX: 0 }, { scaleX: 0.72, duration: 0.55, ease: "power2.out", transformOrigin: "left" })
        // Move to field 2
        .to(".field-1-ring", { strokeOpacity: 0, duration: 0.15 }, "+=0.1")
        .to(".field-2-ring", { strokeOpacity: 1, duration: 0.2 })
        .to(".cursor-1", { opacity: 0 })
        .to(".cursor-2", { opacity: 1 })
        .to(".cursor-2", { opacity: 0, repeat: 2, yoyo: true, duration: 0.25 })
        .fromTo(".type-fill-2", { scaleX: 0 }, { scaleX: 0.45, duration: 0.4, ease: "power2.out", transformOrigin: "left" })
        .to(".field-2-ring", { strokeOpacity: 0, duration: 0.15 })
        // Save button press
        .to(".save-btn", { scaleX: 0.92, scaleY: 0.92, duration: 0.1, ease: "power2.in" })
        .to(".save-btn", { scaleX: 1, scaleY: 1, duration: 0.3, ease: "back.out(2)" })
        .to(".save-btn-fill", { fill: "#1A1A1A", duration: 0.12 }, "<")
        .to(".save-btn-fill", { fill: "#e5e5e5", duration: 0.2 })
        .to({}, { duration: 0.5 })
        // Exit
        .to(".entry-card", { opacity: 0, y: -8, duration: 0.4 });
    }, stageRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={stageRef} className="relative w-full h-[196px] overflow-hidden flex items-center justify-center" style={{ background: GREEN_GRADIENT }}>
      <svg className="entry-card" style={{ opacity: 0 }} width="200" height="150" viewBox="0 0 200 150">
        {/* Card bg */}
        <rect x="10" y="10" width="180" height="130" rx="8" fill="white" filter="url(#card-shadow)" />
        <defs>
          <filter id="card-shadow">
            <feDropShadow dx="0" dy="2" stdDeviation="6" floodColor="rgba(0,0,0,0.10)" />
          </filter>
        </defs>
        {/* Label 1 */}
        <text x="22" y="38" fontSize="8" fill="#9CA3AF" fontFamily="sans-serif">Supplier name</text>
        {/* Field 1 */}
        <rect x="22" y="42" width="156" height="22" rx="4" fill="#EBEBEB" />
        <rect className="field-1-ring" x="22" y="42" width="156" height="22" rx="4" fill="none" stroke="#1A1A1A" strokeWidth="1.5" strokeOpacity="0" />
        {/* Type fill 1 */}
        <rect className="type-fill-1" x="28" y="49" width="100" height="8" rx="2" fill="#374151" />
        {/* Cursor 1 */}
        <rect className="cursor-1" x="33" y="49" width="1.5" height="9" fill="#374151" />
        {/* Label 2 */}
        <text x="22" y="84" fontSize="8" fill="#9CA3AF" fontFamily="sans-serif">Invoice amount</text>
        {/* Field 2 */}
        <rect x="22" y="88" width="156" height="22" rx="4" fill="#EBEBEB" />
        <rect className="field-2-ring" x="22" y="88" width="156" height="22" rx="4" fill="none" stroke="#1A1A1A" strokeWidth="1.5" strokeOpacity="0" />
        {/* Type fill 2 */}
        <rect className="type-fill-2" x="28" y="95" width="100" height="8" rx="2" fill="#374151" />
        {/* Cursor 2 */}
        <rect className="cursor-2" x="33" y="95" width="1.5" height="9" fill="#374151" opacity="0" />
        {/* Save button */}
        <g className="save-btn">
          <rect className="save-btn-fill" x="62" y="122" width="76" height="22" rx="11" fill="#e5e5e5" />
          <text x="100" y="137" fontSize="9" fill="#374151" fontFamily="sans-serif" textAnchor="middle">Save →</text>
        </g>
      </svg>
    </div>
  );
}

// ─── Real-time Tracking Animation ─────────────────────────────────────────────
function RealtimeTrackingAnim() {
  const ref = useRef<HTMLDivElement>(null);
  const countRefs = { overdue: useRef<SVGTextElement>(null), records: useRef<SVGTextElement>(null), verified: useRef<SVGTextElement>(null), dueSoon: useRef<SVGTextElement>(null), outstanding: useRef<SVGTextElement>(null) };

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ repeat: -1, repeatDelay: 1 });

      tl.fromTo(".stat-tile", { opacity: 0, y: 10 }, { opacity: 1, y: 0, stagger: 0.1, duration: 0.5, ease: "power3.out" })
        .add(() => {
          // Count up numbers
          const counts = [
            { el: countRefs.overdue.current, target: 4 },
            { el: countRefs.records.current, target: 14 },
            { el: countRefs.verified.current, target: 8 },
            { el: countRefs.dueSoon.current, target: 3 },
            { el: countRefs.outstanding.current, target: 1500, prefix: "$", suffix: "" },
          ];
          counts.forEach(({ el, target, prefix = "", suffix = "" }) => {
            if (!el) return;
            gsap.fromTo({ val: 0 }, { val: target }, {
              duration: 1.1, ease: "power2.out",
              onUpdate() { el.textContent = prefix + Math.round((this as any)._targets[0].val) + suffix; }
            });
          });
        }, "-=0.3")
        // Badge border draw
        .fromTo(".badge-border", { strokeDashoffset: 80 }, { strokeDashoffset: 0, duration: 0.4, ease: "power2.out" }, "+=0.3")
        .to(".badge-fill", { fill: "#BBF7D0", duration: 0.3 }, "<")
        // Heartbeat bar
        .fromTo(".heartbeat-bar", { scaleY: 0.3 }, { scaleY: 1, duration: 1, ease: "power2.inOut", yoyo: true, repeat: 2 }, "-=0.5")
        .to({}, { duration: 0.5 })
        .to(".stat-tile", { opacity: 0, y: -6, stagger: 0.05, duration: 0.4 });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref} className="relative w-full overflow-hidden" style={{ height: 380, background: GREEN_GRADIENT, borderRadius: 12 }}>
      <svg width="100%" height="380" viewBox="0 0 620 380">
        {/* Tiles */}
        <g className="stat-tile" opacity="0">
          <rect x="17" y="140" width="130" height="72" rx="8" fill="white" stroke="#E5E7EB" strokeWidth="1" />
          <text ref={countRefs.overdue} x="29" y="172" fontSize="20" fontWeight="700" fill="#111827" fontFamily="monospace">0</text>
          <text x="29" y="196" fontSize="10" fill="#9CA3AF" fontFamily="sans-serif" letterSpacing="1">OVERDUE</text>
          {/* Heartbeat bar */}
          <rect className="heartbeat-bar" x="17" y="140" width="4" height="72" rx="2" fill="#F59E0B" style={{ transformOrigin: "17px 212px" }} />
        </g>
        <g className="stat-tile" opacity="0">
          <rect x="345" y="44" width="130" height="72" rx="8" fill="white" stroke="#E5E7EB" strokeWidth="1" />
          <text ref={countRefs.records} x="357" y="76" fontSize="20" fontWeight="700" fill="#111827" fontFamily="monospace">0</text>
          <text x="357" y="100" fontSize="10" fill="#9CA3AF" fontFamily="sans-serif" letterSpacing="1">RECORDS</text>
        </g>
        <g className="stat-tile" opacity="0">
          <rect x="113" y="340" width="130" height="72" rx="8" fill="white" stroke="#E5E7EB" strokeWidth="1" />
          <text ref={countRefs.verified} x="125" y="372" fontSize="20" fontWeight="700" fill="#111827" fontFamily="monospace">0</text>
          <text x="125" y="396" fontSize="10" fill="#9CA3AF" fontFamily="sans-serif" letterSpacing="1">VERIFIED</text>
        </g>
        <g className="stat-tile" opacity="0">
          <rect x="447" y="320" width="130" height="72" rx="8" fill="white" stroke="#E5E7EB" strokeWidth="1" />
          <text ref={countRefs.dueSoon} x="459" y="352" fontSize="20" fontWeight="700" fill="#111827" fontFamily="monospace">0</text>
          <text x="459" y="376" fontSize="10" fill="#9CA3AF" fontFamily="sans-serif" letterSpacing="1">DUE SOON</text>
        </g>
        <g className="stat-tile" opacity="0">
          <rect x="447" y="195" width="148" height="72" rx="8" fill="white" stroke="#E5E7EB" strokeWidth="1" />
          <text ref={countRefs.outstanding} x="459" y="227" fontSize="18" fontWeight="700" fill="#111827" fontFamily="monospace">$0</text>
          <text x="459" y="251" fontSize="10" fill="#9CA3AF" fontFamily="sans-serif" letterSpacing="1">OUTSTANDING</text>
        </g>
        {/* Mini table */}
        <g className="stat-tile" opacity="0">
          <rect x="17" y="240" width="580" height="72" rx="8" fill="white" stroke="#E5E7EB" strokeWidth="1" />
          <text x="28" y="262" fontSize="9" fill="#9CA3AF" fontFamily="sans-serif" letterSpacing="1">INVOICE</text>
          <text x="128" y="262" fontSize="9" fill="#9CA3AF" fontFamily="sans-serif" letterSpacing="1">SUPPLIER</text>
          <text x="228" y="262" fontSize="9" fill="#9CA3AF" fontFamily="sans-serif" letterSpacing="1">STATUS</text>
          <text x="328" y="262" fontSize="9" fill="#9CA3AF" fontFamily="sans-serif" letterSpacing="1">DUE DATE</text>
          <line x1="17" y1="268" x2="597" y2="268" stroke="#F3F4F6" strokeWidth="1" />
          {/* Row */}
          <text x="28" y="286" fontSize="10" fill="#374151" fontFamily="sans-serif">12/06/2025</text>
          <text x="128" y="286" fontSize="10" fill="#374151" fontFamily="sans-serif">X-Sport</text>
          {/* Status badge */}
          <rect className="badge-fill" x="220" y="276" width="54" height="18" rx="9" fill="white" stroke="#438674" strokeWidth="1" />
          <rect className="badge-border" x="220" y="276" width="54" height="18" rx="9" fill="none" stroke="#438674" strokeWidth="1.5" strokeDasharray="80" strokeDashoffset="80" />
          <text x="247" y="289" fontSize="9" fill="#438674" fontFamily="sans-serif" textAnchor="middle" fontWeight="600">Verified</text>
          <text x="328" y="286" fontSize="10" fill="#374151" fontFamily="sans-serif">12/06/2025</text>
        </g>
      </svg>
    </div>
  );
}

// ─── Supplier Management Animation ───────────────────────────────────────────
function SupplierMgmtAnim() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ repeat: -1, repeatDelay: 0.8 });

      tl.fromTo(".phone-frame", { strokeDashoffset: 600 }, { strokeDashoffset: 0, duration: 0.5, ease: "power2.out" })
        .fromTo(".sup-card-1", { x: -20, opacity: 0 }, { x: 0, opacity: 1, duration: 0.45, ease: "power3.out" })
        .fromTo(".sup-card-2", { x: -20, opacity: 0 }, { x: 0, opacity: 1, duration: 0.45, ease: "power3.out" }, "-=0.3")
        .to({}, { duration: 0.6 })
        // Hover-select card 1
        .to(".sup-card-1", { scale: 1.025, duration: 0.2, ease: "power2.out" })
        .fromTo(".card1-border", { strokeOpacity: 0 }, { strokeOpacity: 1, duration: 0.2 }, "<")
        // Data refresh swap
        .to(".val-old", { scaleY: 0, duration: 0.15 })
        .to(".val-new", { scaleY: 1, duration: 0.15 }, "<+=0.15")
        .to({}, { duration: 0.6 })
        // Exit
        .to(".sup-card-1, .sup-card-2", { x: 20, opacity: 0, stagger: 0.08, duration: 0.35 });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref} className="relative w-full overflow-hidden flex items-center justify-center" style={{ height: 380, background: GREEN_GRADIENT, borderRadius: 12 }}>
      <svg width="260" height="340" viewBox="0 0 260 340">
        {/* Phone frame */}
        <rect className="phone-frame" x="30" y="10" width="200" height="320" rx="20" fill="none" stroke="#374151" strokeWidth="2" strokeDasharray="600" strokeDashoffset="600" />
        {/* Top bar */}
        <rect x="30" y="10" width="200" height="36" rx="20" fill="#F9FAFB" />
        <text x="80" y="33" fontSize="11" fill="#374151" fontFamily="sans-serif" fontWeight="600">Voyce</text>

        {/* Supplier card 1 */}
        <g className="sup-card-1" style={{ opacity: 0 }}>
          <rect className="card1-border" x="42" y="56" width="176" height="80" rx="10" fill="white" filter="url(#sup-shadow)" stroke="#2DD4BF" strokeWidth="1.5" strokeOpacity="0" />
          {/* Avatar */}
          <rect x="54" y="68" width="32" height="32" rx="4" fill="#5EEAD4" opacity="0.7" />
          <text x="70" y="89" fontSize="11" fill="white" textAnchor="middle" fontFamily="sans-serif" fontWeight="700">X</text>
          {/* Name & date */}
          <text x="94" y="81" fontSize="11" fill="#111827" fontFamily="sans-serif" fontWeight="600">X-Sport</text>
          <text x="94" y="95" fontSize="9" fill="#9CA3AF" fontFamily="sans-serif">Last: 25/12/2024</text>
          {/* Data cols */}
          <line x1="42" y1="110" x2="218" y2="110" stroke="#F3F4F6" strokeWidth="1" />
          <text x="54" y="124" fontSize="8" fill="#9CA3AF" fontFamily="sans-serif" letterSpacing="0.5">OUTSTANDING</text>
          <g className="val-old" style={{ transformOrigin: "70px 128px" }}>
            <text x="54" y="134" fontSize="11" fill="#111827" fontFamily="sans-serif" fontWeight="700">$5,500</text>
          </g>
          <g className="val-new" style={{ transformOrigin: "70px 128px", transform: "scaleY(0)" }}>
            <text x="54" y="134" fontSize="11" fill="#2CA08F" fontFamily="sans-serif" fontWeight="700">$5,500</text>
          </g>
          <text x="140" y="124" fontSize="8" fill="#9CA3AF" fontFamily="sans-serif" letterSpacing="0.5">NB. INVOICES</text>
          <text x="140" y="134" fontSize="11" fill="#111827" fontFamily="sans-serif" fontWeight="700">3</text>
        </g>

        {/* Supplier card 2 */}
        <g className="sup-card-2" style={{ opacity: 0 }}>
          <rect x="42" y="148" width="176" height="80" rx="10" fill="white" filter="url(#sup-shadow)" />
          <rect x="54" y="160" width="32" height="32" rx="4" fill="#5EEAD4" opacity="0.5" />
          <text x="70" y="181" fontSize="11" fill="white" textAnchor="middle" fontFamily="sans-serif" fontWeight="700">T</text>
          <text x="94" y="173" fontSize="11" fill="#111827" fontFamily="sans-serif" fontWeight="600">Tech Supplies</text>
          <text x="94" y="187" fontSize="9" fill="#9CA3AF" fontFamily="sans-serif">Last: 01/11/2024</text>
          <line x1="42" y1="202" x2="218" y2="202" stroke="#F3F4F6" strokeWidth="1" />
          <text x="54" y="216" fontSize="8" fill="#9CA3AF" fontFamily="sans-serif" letterSpacing="0.5">OUTSTANDING</text>
          <text x="54" y="226" fontSize="11" fill="#111827" fontFamily="sans-serif" fontWeight="700">$2,100</text>
          <text x="140" y="216" fontSize="8" fill="#9CA3AF" fontFamily="sans-serif" letterSpacing="0.5">NB. INVOICES</text>
          <text x="140" y="226" fontSize="11" fill="#111827" fontFamily="sans-serif" fontWeight="700">7</text>
        </g>

        <defs>
          <filter id="sup-shadow">
            <feDropShadow dx="0" dy="2" stdDeviation="4" floodColor="rgba(0,0,0,0.08)" />
          </filter>
        </defs>
      </svg>
    </div>
  );
}

// ─── Verification & Audit Animation ──────────────────────────────────────────
function VerificationAnim() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ repeat: -1, repeatDelay: 0.8 });

      tl.fromTo(".verify-card", { scale: 0.94, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.45, ease: "back.out(1.7)" })
        // Row 1 check
        .to(".circle-1", { stroke: "#22C55E", duration: 0.2 })
        .fromTo(".check-1", { strokeDashoffset: 20, opacity: 0 }, { strokeDashoffset: 0, opacity: 1, duration: 0.28, ease: "power2.out" })
        .to(".row-text-1", { opacity: 1, duration: 0.2 }, "<")
        // Row 2 check
        .to(".circle-2", { stroke: "#22C55E", duration: 0.2 }, "+=0.15")
        .fromTo(".check-2", { strokeDashoffset: 20, opacity: 0 }, { strokeDashoffset: 0, opacity: 1, duration: 0.28, ease: "power2.out" })
        .to(".row-text-2", { opacity: 1, duration: 0.2 }, "<")
        // Row 3 check
        .to(".circle-3", { stroke: "#22C55E", duration: 0.2 }, "+=0.15")
        .fromTo(".check-3", { strokeDashoffset: 20, opacity: 0 }, { strokeDashoffset: 0, opacity: 1, duration: 0.28, ease: "power2.out" })
        .to(".row-text-3", { opacity: 1, duration: 0.2 }, "<")
        // Badge pop
        .fromTo(".all-clear-badge", { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, ease: "back.out(1.7)" }, "+=0.2")
        .to(".shield-flash", { fillOpacity: 0.15, duration: 0.2, yoyo: true, repeat: 1 })
        .to({}, { duration: 1.2 })
        // Exit
        .to(".verify-card", { opacity: 0, y: 8, duration: 0.4 });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref} className="relative w-full overflow-hidden flex items-center justify-center" style={{ height: 380, background: GREEN_GRADIENT, borderRadius: 12 }}>
      <svg className="verify-card" style={{ opacity: 0 }} width="280" height="200" viewBox="0 0 280 200">
        <rect x="10" y="10" width="260" height="180" rx="12" fill="white" filter="url(#v-shadow)" />
        {/* Shield icon */}
        <path className="shield-flash" d="M26 28 L26 46 C26 54 34 60 34 60 C34 60 42 54 42 46 L42 28 L34 24 Z" fill="#22C55E" fillOpacity="0" stroke="#22C55E" strokeWidth="1.5" />
        {/* Title */}
        <text x="50" y="38" fontSize="12" fill="#111827" fontFamily="sans-serif" fontWeight="600">Verification status</text>
        {/* Badge */}
        <g className="all-clear-badge" style={{ opacity: 0 }}>
          <rect x="50" y="46" width="100" height="18" rx="9" fill="#dcfce7" />
          <text x="100" y="59" fontSize="9" fill="#16a34a" fontFamily="sans-serif" textAnchor="middle" fontWeight="600">All checks passed</text>
        </g>
        {/* Divider */}
        <line x1="20" y1="76" x2="260" y2="76" stroke="#F3F4F6" strokeWidth="1" />
        {/* Row 1 */}
        <circle className="circle-1" cx="36" cy="100" r="10" fill="#dcfce7" stroke="#D1D5DB" strokeWidth="1.5" />
        <path className="check-1" d="M30 100 L34 104 L42 96" stroke="#16a34a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" strokeDasharray="20" strokeDashoffset="20" opacity="0" />
        <text className="row-text-1" x="54" y="104" fontSize="11" fill="#111827" fontFamily="sans-serif" opacity="0.4">Invoice total: correct</text>
        {/* Row 2 */}
        <circle className="circle-2" cx="36" cy="130" r="10" fill="#dcfce7" stroke="#D1D5DB" strokeWidth="1.5" />
        <path className="check-2" d="M30 130 L34 134 L42 126" stroke="#16a34a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" strokeDasharray="20" strokeDashoffset="20" opacity="0" />
        <text className="row-text-2" x="54" y="134" fontSize="11" fill="#111827" fontFamily="sans-serif" opacity="0.4">Payment: correct</text>
        {/* Row 3 */}
        <circle className="circle-3" cx="36" cy="160" r="10" fill="#dcfce7" stroke="#D1D5DB" strokeWidth="1.5" />
        <path className="check-3" d="M30 160 L34 164 L42 156" stroke="#16a34a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" strokeDasharray="20" strokeDashoffset="20" opacity="0" />
        <text className="row-text-3" x="54" y="164" fontSize="11" fill="#111827" fontFamily="sans-serif" opacity="0.4">Final due: correct</text>

        <defs>
          <filter id="v-shadow"><feDropShadow dx="0" dy="4" stdDeviation="8" floodColor="rgba(0,0,0,0.08)" /></filter>
        </defs>
      </svg>
    </div>
  );
}

// ─── Reasons Section Icons ────────────────────────────────────────────────────
function ClockIcon() {
  const ref = useRef<SVGSVGElement>(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ repeat: -1, repeatDelay: 1.8 });
      tl.to(".clock-minute", { rotation: 340, transformOrigin: "24px 24px", duration: 1.4, ease: "power2.inOut" })
        .set(".clock-minute", { rotation: 0 });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <svg ref={ref} width="56" height="56" viewBox="0 0 48 48" fill="none" stroke="#1A1A1A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ overflow: "visible" }}>
      <circle cx="24" cy="24" r="16" />
      <line x1="24" y1="24" x2="24" y2="14" className="clock-minute" />
      <line x1="24" y1="24" x2="31" y2="27" />
    </svg>
  );
}

function BullseyeIcon() {
  const ref = useRef<SVGSVGElement>(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ repeat: -1, repeatDelay: 2 });
      tl.fromTo(".ring-3", { strokeDashoffset: 44 }, { strokeDashoffset: 0, duration: 0.5, ease: "power2.out" })
        .fromTo(".ring-2", { strokeDashoffset: 63 }, { strokeDashoffset: 0, duration: 0.5, ease: "power2.out" }, "-=0.18")
        .fromTo(".ring-1", { strokeDashoffset: 88 }, { strokeDashoffset: 0, duration: 0.5, ease: "power2.out" }, "-=0.18")
        .fromTo(".bullseye-dot", { scale: 0 }, { scale: 1, duration: 0.3, ease: "back.out(2)", transformOrigin: "24px 24px" })
        .to({}, { duration: 1 });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <svg ref={ref} width="56" height="56" viewBox="0 0 48 48" fill="none" stroke="#1A1A1A" strokeWidth="1.5" style={{ overflow: "visible" }}>
      <circle className="ring-1" cx="24" cy="24" r="14" strokeDasharray="88" strokeDashoffset="88" />
      <circle className="ring-2" cx="24" cy="24" r="10" strokeDasharray="63" strokeDashoffset="63" />
      <circle className="ring-3" cx="24" cy="24" r="7" strokeDasharray="44" strokeDashoffset="44" />
      <circle className="bullseye-dot" cx="24" cy="24" r="3" fill="#1A1A1A" stroke="none" />
    </svg>
  );
}

function FolderIcon() {
  const ref = useRef<SVGSVGElement>(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ repeat: -1, repeatDelay: 1.8 });
      tl.to(".folder-top", { rotate: -18, transformOrigin: "12px 30px", duration: 0.35, ease: "power2.out" })
        .fromTo(".doc-line-1", { y: 4, opacity: 0 }, { y: 0, opacity: 1, duration: 0.25, ease: "power2.out" }, "-=0.1")
        .fromTo(".doc-line-2", { y: 4, opacity: 0 }, { y: 0, opacity: 1, duration: 0.25, ease: "power2.out" }, "-=0.15")
        .fromTo(".doc-line-3", { y: 4, opacity: 0 }, { y: 0, opacity: 1, duration: 0.25, ease: "power2.out" }, "-=0.15")
        .fromTo(".folder-check", { strokeDashoffset: 20, opacity: 0 }, { strokeDashoffset: 0, opacity: 1, duration: 0.3, ease: "power2.out" })
        .to({}, { duration: 0.8 })
        .to(".folder-top", { rotate: 0, duration: 0.3, ease: "power2.inOut" })
        .to(".doc-line-1, .doc-line-2, .doc-line-3, .folder-check", { opacity: 0, duration: 0.2 }, "<");
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <svg ref={ref} width="56" height="56" viewBox="0 0 48 48" fill="none" stroke="#1A1A1A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ overflow: "visible" }}>
      {/* Folder body */}
      <rect x="8" y="20" width="32" height="22" rx="3" />
      {/* Folder tab (top) */}
      <path className="folder-top" d="M8 20 L8 16 Q8 14 10 14 L20 14 L23 18 L8 18Z" />
      {/* Doc lines */}
      <line className="doc-line-1" x1="16" y1="27" x2="32" y2="27" strokeOpacity="0" />
      <line className="doc-line-2" x1="16" y1="31" x2="28" y2="31" strokeOpacity="0" />
      <line className="doc-line-3" x1="16" y1="35" x2="30" y2="35" strokeOpacity="0" />
      {/* Check */}
      <path className="folder-check" d="M30 18 L33 21 L39 15" stroke="#22C55E" strokeWidth="2" strokeDasharray="20" strokeDashoffset="20" opacity="0" />
    </svg>
  );
}

function ArrowUpBarsIcon() {
  const ref = useRef<SVGSVGElement>(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ repeat: -1, repeatDelay: 1.8 });
      tl.fromTo(".bar-1", { scaleY: 0 }, { scaleY: 1, duration: 0.5, ease: "back.out(1.4)", transformOrigin: "bottom" })
        .fromTo(".bar-2", { scaleY: 0 }, { scaleY: 1, duration: 0.5, ease: "back.out(1.4)", transformOrigin: "bottom" }, "-=0.38")
        .fromTo(".bar-3", { scaleY: 0 }, { scaleY: 1, duration: 0.5, ease: "back.out(1.4)", transformOrigin: "bottom" }, "-=0.38")
        .fromTo(".arrow-up", { strokeDashoffset: 40 }, { strokeDashoffset: 0, duration: 0.4, ease: "power2.out" })
        .to({}, { duration: 1 })
        .to(".bar-1, .bar-2, .bar-3, .arrow-up", { opacity: 0, y: -4, duration: 0.3 })
        .set(".bar-1, .bar-2, .bar-3, .arrow-up", { opacity: 1, y: 0 });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <svg ref={ref} width="56" height="56" viewBox="0 0 48 48" fill="none" stroke="#1A1A1A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ overflow: "visible" }}>
      {/* Bars */}
      <rect className="bar-1" x="10" y="32" width="7" height="10" rx="1" />
      <rect className="bar-2" x="21" y="26" width="7" height="16" rx="1" />
      <rect className="bar-3" x="32" y="20" width="7" height="22" rx="1" />
      {/* Arrow */}
      <path className="arrow-up" d="M24 6 L24 18 M18 11 L24 6 L30 11" strokeDasharray="40" strokeDashoffset="40" />
    </svg>
  );
}

// ─── Main Landing Page ────────────────────────────────────────────────────────
export default function LandingPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const intro2Ref = useRef<HTMLDivElement>(null);
  const choicesRef = useRef<HTMLDivElement>(null);
  const reasonsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero entrance
      gsap.fromTo(".hero-headline", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.9, ease: "power3.out", delay: 0.15 });
      gsap.fromTo(".hero-sub", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7, ease: "power3.out", delay: 0.4 });
      gsap.fromTo(".hero-cta", { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out", delay: 0.6 });
      gsap.fromTo(".hero-card", { opacity: 0, x: 40, y: 20 }, { opacity: 1, x: 0, y: 0, duration: 0.8, ease: "power3.out", delay: 0.75 });

      // Intro 2 — scroll triggered
      ScrollTrigger.create({
        trigger: intro2Ref.current,
        start: "top 80%",
        onEnter: () => {
          gsap.fromTo(".intro2-text", { opacity: 0, y: 30 }, { opacity: 1, y: 0, stagger: 0.12, duration: 0.7, ease: "power3.out" });
          gsap.fromTo(".intro2-image", { opacity: 0, scale: 0.97 }, { opacity: 1, scale: 1, duration: 0.9, ease: "power3.out", delay: 0.2 });
        },
        once: true,
      });

      // Choices section
      ScrollTrigger.create({
        trigger: choicesRef.current,
        start: "top 75%",
        onEnter: () => {
          gsap.fromTo(".choices-title", { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" });
          gsap.fromTo(".choice-card", { opacity: 0, y: 32 }, { opacity: 1, y: 0, stagger: 0.15, duration: 0.7, ease: "power3.out", delay: 0.2 });
        },
        once: true,
      });

      // Features
      ScrollTrigger.create({
        trigger: "#features",
        start: "top 80%",
        onEnter: () => {
          gsap.fromTo(".feature-block", { opacity: 0, y: 30 }, { opacity: 1, y: 0, stagger: 0.15, duration: 0.7, ease: "power3.out" });
        },
        once: true,
      });

      // Reasons
      ScrollTrigger.create({
        trigger: reasonsRef.current,
        start: "top 75%",
        onEnter: () => {
          gsap.fromTo(".reason-col", { opacity: 0, y: 28 }, { opacity: 1, y: 0, stagger: 0.12, duration: 0.7, ease: "power3.out" });
        },
        once: true,
      });

      // CTA bottom
      ScrollTrigger.create({
        trigger: "#cta-bottom",
        start: "top 85%",
        onEnter: () => {
          gsap.fromTo(".cta-bottom-text", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" });
          gsap.fromTo(".cta-bottom-btn", { opacity: 0, scale: 0.95 }, { opacity: 1, scale: 1, duration: 0.5, ease: "back.out(1.4)", delay: 0.2 });
        },
        once: true,
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-dvh bg-white font-sans text-[#111827] overflow-x-hidden">
      <NoiseOverlay />

      {/* ── NAVBAR ─────────────────────────────────────────────────────────── */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-[1440px] mx-auto px-[70px] h-[80px] flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <svg width="36" height="29" viewBox="0 0 36 29" fill="none">
              <path d="M0 0H12L18 14.5L24 0H36L18 29L0 0Z" fill="#2CA08F" />
              <path d="M12 0H24L18 14.5L12 0Z" fill="#1D645C" />
            </svg>
            <span className="text-lg font-bold text-[#364152]">Voyce</span>
          </div>

          {/* Nav links */}
          <div className="hidden md:flex items-center gap-6">
            <a href="/invoices" className="text-base font-semibold text-[#364152] hover:text-[#2CA08F] transition-colors duration-150 -translate-y-0 hover:-translate-y-px">Invoices</a>
            <a href="/suppliers" className="text-base font-semibold text-[#364152] hover:text-[#2CA08F] transition-colors duration-150 hover:-translate-y-px">Suppliers</a>
          </div>

          {/* CTA */}
          <MagneticButton href="/invoice/new" className="bg-[#2CA08F] text-white hover:bg-[#1D8A79]">
            Get started →
          </MagneticButton>
        </div>
      </nav>

      {/* ── HERO ───────────────────────────────────────────────────────────── */}
      <section ref={heroRef} className="relative overflow-hidden" style={{ background: HERO_BG_GRADIENT, minHeight: 468 }}>
        <div className="max-w-[1440px] mx-auto px-[80px] py-[96px] flex flex-col items-center gap-6 text-center">
          <h1 className="hero-headline font-serif text-[64px] font-normal text-[#343a3f] leading-[1.2] tracking-[-0.04em] max-w-[961px] text-balance opacity-0">
            Your company&apos;s always-on<br />invoice agent.
          </h1>
          <p className="hero-sub text-[18px] font-medium text-[#364152] leading-[1.4] max-w-[478px] text-pretty opacity-0">
            On-brand, performing, and proactive data extraction in seconds. No developers or manual re-entry needed.
          </p>
          <div className="hero-cta opacity-0">
            <MagneticButton href="/invoice/new" className="bg-[#2CA08F] text-white hover:bg-[#1D8A79]">
              Get started →
            </MagneticButton>
          </div>
        </div>

        {/* Decorative teal blobs */}
        <div className="pointer-events-none absolute right-[-200px] top-[-20px] w-[520px] h-[420px] opacity-20">
          <div className="absolute inset-0 rounded-full" style={{ background: "radial-gradient(ellipse, #2CA08F 0%, transparent 70%)" }} />
        </div>
      </section>

      {/* ── INTRO SECTION 2 ────────────────────────────────────────────────── */}
      <section ref={intro2Ref} className="max-w-[1440px] mx-auto px-[70px] py-[80px]">
        <div className="flex gap-10 items-start">
          {/* Text */}
          <div className="flex-1 flex flex-col gap-10 pt-10">
            <h2 className="intro2-text font-serif text-[48px] font-normal text-[#343a3f] leading-[1.2] tracking-[-0.04em] text-balance opacity-0">
              Stop wrestling with invoice data. Start scaling your business.
            </h2>
            <p className="intro2-text text-[18px] font-medium text-[#364152] leading-[1.4] max-w-[630px] text-pretty opacity-0">
              Voyce is your intelligent invoice management system that works 24/7. Whether you&apos;re dealing with handwritten receipts, PDF invoices, or scanned documents, our AI-powered platform extracts, verifies, and organizes every detail automatically. Say goodbye to manual data entry and hello to audit-ready accuracy in seconds.
            </p>
          </div>

          {/* Image */}
          <div className="intro2-image flex-1 relative opacity-0">
            <div className="rounded-xl overflow-hidden h-[400px]">
              <img
                src={HERO_IMAGE}
                alt="Business professionals reviewing invoices"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Floating invoice card */}
            <div className="absolute -right-8 top-[140px] w-[325px] rounded-sm shadow-xl border border-[#e0e0e0] bg-white">
              {/* Card top */}
              <div className="flex items-center justify-between p-3 border-b border-[#e0e0e0]">
                <div>
                  <p className="font-serif text-[20px] text-black tracking-[-0.04em] leading-[1.2]">$5,500.00</p>
                  <p className="text-[11px] font-medium text-[#afb1b2] tracking-[0.06em] uppercase mt-0.5">Final amount due</p>
                </div>
                <div className="size-14 rounded-full flex items-center justify-center" style={{ background: "linear-gradient(180deg, #dafad9 0%, #b8eec8 50%, #e0f7e4 100%)" }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2CA08F" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 16l4 4 12-12" /><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                  </svg>
                </div>
              </div>
              {/* Card bottom */}
              <div className="p-3 flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <p className="font-medium text-[18px] text-black tracking-[-0.03em]">X-SPORT</p>
                    <span className="text-xs font-bold text-[#438674] bg-[#ecfef6] border border-[#438674] px-2 py-0.5 rounded-lg">Verified</span>
                  </div>
                  <p className="text-xs text-[#afb1b2] tracking-wide">12/06/2025</p>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-sm text-black">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><rect x="4" y="4" width="16" height="16" rx="2"/><path d="M8 9h8M8 13h5"/></svg>
                    <span>06A6E6BE</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-sm text-black">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>
                    <span>Unknown</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CHOICES ────────────────────────────────────────────────────────── */}
      <section ref={choicesRef} className="px-[80px] py-[96px] w-full">
        <div className="max-w-[1440px] mx-auto">
          <h2 className="choices-title font-serif text-[64px] font-normal text-[#343a3f] leading-[1.2] tracking-[-0.04em] text-center max-w-[961px] mx-auto mb-10 text-balance opacity-0">
            Two ways to work, one platform to use
          </h2>

          <div className="flex gap-8 justify-center">
            {/* Card 1 — Smart extraction */}
            <div className="choice-card flex-1 max-w-[601px] bg-[#f2f2f2] rounded-lg p-5 flex flex-col gap-5 opacity-0">
              <h3 className="font-serif text-[24px] text-black leading-[1.2] tracking-[-0.04em]">Smart extraction</h3>
              <p className="text-[18px] font-semibold text-black leading-[1.5]">
                Upload an image or PDF and let AI extract invoice data automatically. Fast, accurate, and audit-ready.
              </p>
              <SmartExtractionAnim />
              <div>
                <MagneticButton href="/invoice/new" className="bg-black text-white hover:bg-[#222]">
                  Upload document →
                </MagneticButton>
              </div>
            </div>

            {/* Card 2 — Manual entry */}
            <div className="choice-card flex-1 max-w-[601px] bg-[#f2f2f2] rounded-lg p-5 flex flex-col gap-5 opacity-0">
              <h3 className="font-serif text-[24px] text-black leading-[1.2] tracking-[-0.04em]">Manual entry</h3>
              <p className="text-[18px] font-semibold text-black leading-[1.5]">
                Create a blank invoice and enter data yourself. Perfect for handwritten invoices or quick entries.
              </p>
              <ManualEntryAnim />
              <div>
                <MagneticButton href="/invoice/new" className="bg-black text-white hover:bg-[#222]">
                  Start blank invoice →
                </MagneticButton>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURES ───────────────────────────────────────────────────────── */}
      <section id="features" className="max-w-[1440px] mx-auto px-[80px] py-[96px] flex flex-col gap-16">

        {/* Feature 1 — Real-time tracking */}
        <div className="feature-block flex gap-10 items-start py-10 opacity-0">
          <div className="flex-1 flex flex-col gap-10 pt-4">
            <h2 className="font-serif text-[48px] font-normal text-[#343a3f] leading-[1.2] tracking-[-0.04em] text-balance">
              Real-time tracking
            </h2>
            <p className="text-[18px] text-black leading-[1.5] max-w-[620px] text-pretty">
              Explore outstanding balances, verified invoices, overdue payments, and upcoming due dates at a glance.
            </p>
          </div>
          <div className="flex-1">
            <RealtimeTrackingAnim />
          </div>
        </div>

        {/* Feature 2 — Supplier management */}
        <div className="feature-block flex gap-10 items-start py-10 opacity-0">
          <div className="flex-1 order-2">
            <SupplierMgmtAnim />
          </div>
          <div className="flex-1 order-1 flex flex-col gap-10 pt-4">
            <h2 className="font-serif text-[48px] font-normal text-[#343a3f] leading-[1.2] tracking-[-0.04em] text-balance">
              Supplier management
            </h2>
            <p className="text-[18px] text-black leading-[1.5] max-w-[620px] text-pretty">
              Keep all supplier information organized with complete invoice history and contact details in one place.
            </p>
          </div>
        </div>

        {/* Feature 3 — Verification & audit */}
        <div className="feature-block flex gap-10 items-start py-10 opacity-0">
          <div className="flex-1 flex flex-col gap-10 pt-4">
            <h2 className="font-serif text-[48px] font-normal text-[#343a3f] leading-[1.2] tracking-[-0.04em] text-balance">
              Verification and audit trails
            </h2>
            <p className="text-[18px] text-black leading-[1.5] max-w-[620px] text-pretty">
              Every invoice is automatically verified and timestamped. Complete audit trail with every change recorded.
            </p>
          </div>
          <div className="flex-1">
            <VerificationAnim />
          </div>
        </div>
      </section>

      {/* ── REASONS ────────────────────────────────────────────────────────── */}
      <section ref={reasonsRef} className="px-[80px] py-[96px] w-full">
        <div className="max-w-[1440px] mx-auto">
          <h2 className="font-serif text-[64px] font-normal text-[#343a3f] leading-[1.2] tracking-[-0.04em] text-center max-w-[961px] mx-auto mb-16 text-balance">
            Reasons businesses love working with Voyce
          </h2>

          <div className="grid grid-cols-4 gap-10">
            {[
              {
                icon: <ClockIcon />,
                title: "Saves 10+ hours per week",
                body: "Eliminate manual data entry and focus on strategic work that grows your business.",
              },
              {
                icon: <BullseyeIcon />,
                title: "99.9% accuracy guaranteed",
                body: "AI-powered extraction with built-in verification catches errors before they become problems.",
              },
              {
                icon: <FolderIcon />,
                title: "Audit-ready records",
                body: "Complete digital trail with timestamps and verification status for every invoice.",
              },
              {
                icon: <ArrowUpBarsIcon />,
                title: "Scale without hiring",
                body: "Handle growing invoice volume without expanding your accounting team.",
              },
            ].map((r, i) => (
              <div key={i} className="reason-col flex flex-col gap-6 opacity-0">
                <div className="h-[282px] flex items-end justify-center bg-[#F9FAFB] rounded-2xl">
                  <div className="mb-12">{r.icon}</div>
                </div>
                <div>
                  <h3 className="font-serif text-[28px] font-normal text-[#343a3f] leading-[1.2] tracking-[-0.02em] mb-3 text-balance">{r.title}</h3>
                  <p className="text-[16px] text-[#6B7280] leading-[1.5] text-pretty">{r.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BOTTOM ─────────────────────────────────────────────────────── */}
      <section id="cta-bottom" className="max-w-[1440px] mx-auto px-[70px] py-[60px]">
        <div className="flex items-center justify-between border-t border-gray-200 pt-10">
          <h2 className="cta-bottom-text font-serif text-[58px] font-normal text-[#343a3f] leading-[1.2] tracking-[-0.04em] max-w-[700px] text-balance opacity-0">
            Upload your first invoice today
          </h2>
          <div className="cta-bottom-btn opacity-0">
            <MagneticButton href="/invoice/new" className="bg-[#2CA08F] text-white hover:bg-[#1D8A79]">
              Get started →
            </MagneticButton>
          </div>
        </div>
      </section>

      {/* ── FOOTER ─────────────────────────────────────────────────────────── */}
      <footer className="border-t border-gray-200">
        <div className="max-w-[1440px] mx-auto px-[70px] h-[80px] flex items-center justify-between">
          <span className="font-serif text-[24px] text-[#364152]">Voyce</span>
          <div className="flex items-center gap-6">
            <a href="/" className="text-sm text-[#6B7280] hover:text-[#111827] transition-colors">Invoices</a>
            <a href="/suppliers" className="text-sm text-[#6B7280] hover:text-[#111827] transition-colors">Suppliers</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
