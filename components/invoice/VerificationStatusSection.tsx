"use client";

import React from "react";

function Tooltip({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="relative inline-flex group/tooltip">
      {children}
      <div
        role="tooltip"
        className="
          absolute bottom-[calc(100%+8px)] left-1/2 -translate-x-1/2
          z-50 px-3 py-1.5 rounded-lg
          bg-gray-900 text-white text-xs font-medium whitespace-nowrap
          opacity-0 scale-95 pointer-events-none
          group-hover/tooltip:opacity-100 group-hover/tooltip:scale-100
          transition-opacity duration-150 ease-out
          shadow-lg
        "
      >
        {label}
        <span className="absolute top-full left-1/2 -translate-x-1/2 border-[5px] border-transparent border-t-gray-900" />
      </div>
    </div>
  );
}

function CheckIcon() {
  return (
    <svg className="size-5 flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" fill="#dcfce7" />
      <circle cx="12" cy="12" r="10" stroke="#22c55e" strokeWidth="1.5" />
      <path d="M7.5 12.5l3 3 6-6" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function WarnIcon() {
  return (
    <svg className="size-5 flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none">
      <path
        d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z"
        fill="#ffedd5"
        stroke="#f97316"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <line x1="12" y1="9" x2="12" y2="13" stroke="#ea580c" strokeWidth="2" strokeLinecap="round" />
      <line x1="12" y1="17" x2="12.01" y2="17" stroke="#ea580c" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

export const VerificationStatusSection: React.FC = () => {
  return (
    <section className="bg-white border border-gray-200 rounded-xl p-6">

      {/* Title */}
      <div className="flex items-center gap-2.5 mb-5">
        <div className="size-5 flex-shrink-0">
          <img
            alt=""
            className="size-5 object-contain block"
            src="http://localhost:3845/assets/3c04ff50632597f75dfe86fcc1f3992441fb3388.svg"
          />
        </div>
        <h3 className="text-base font-semibold text-[#111827]">
          Verification status
        </h3>
      </div>

      {/* Illustration placeholder */}
      <div className="mb-5 h-32 rounded-lg border border-[#c6f0ea] bg-[#f0fdf9] flex items-center justify-center">
        <span className="text-xs font-medium text-[#2ca08f] opacity-50">
          Verification illustration
        </span>
      </div>

      {/* Check items */}
      <div className="space-y-4">

        <div className="flex items-start gap-3">
          <CheckIcon />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-[#111827]">Items Sum</p>
            <p className="text-xs text-[#6B7280] tabular-nums">Computed: $5500.00</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <CheckIcon />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-[#111827]">Final total</p>
            <p className="text-xs text-[#6B7280] tabular-nums">Computed: $5500.00</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <WarnIcon />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-[#111827]">Final total</p>
            <p className="text-xs text-[#6B7280] tabular-nums">Computed: $5500.00</p>
          </div>
          <Tooltip label="Fix this discrepancy to proceed">
            <button
              className="flex-shrink-0 self-center h-8 px-3 rounded-full border border-[#f97316] bg-[#fff7ed] text-[#ea580c] text-xs font-semibold hover:bg-[#ffedd5] active:scale-95 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-[#f97316] focus:ring-offset-1"
            >
              Resolve
            </button>
          </Tooltip>
        </div>

      </div>
    </section>
  );
};
