"use client";

import React from "react";
import { StackedPapers } from "../illustrations/StackedPapers";

export const LineItemsSection: React.FC = () => {
  return (
    <section className="bg-white border border-gray-200 rounded-xl p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <div className="size-5 flex-shrink-0">
            <img
              alt=""
              className="size-5 object-contain block"
              src="http://localhost:3845/assets/88439ee638393bf23057c6dcbfd2845758f1cc3e.svg"
            />
          </div>
          <h3 className="text-base font-semibold text-[#111827]">
            Line items
          </h3>
        </div>
        <button className="h-[52px] px-6 rounded-full bg-[#2CA08F] text-white text-base font-semibold hover:bg-[#1D8A79] active:scale-95 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-[#2CA08F] focus:ring-offset-2">
          Add item
        </button>
      </div>

      {/* Subtotal & Invoice Total */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-sm text-[#6B7280]">Subtotal</p>
          <p className="text-base font-semibold text-[#111827] tabular-nums">$5500.00</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-[#6B7280]">Invoice total</p>
          <p className="text-base font-semibold text-[#111827] tabular-nums">$5500.00</p>
        </div>
      </div>

      {/* Table Header */}
      <div className="grid grid-cols-5 gap-4 pb-3 border-b border-gray-200 mb-6">
        <div className="flex items-center gap-1 text-xs font-medium text-[#9CA3AF] uppercase tracking-wide">
          <span>ITEM</span>
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
        {["QTY", "UNIT PRICE", "TOTAL", "RETURN"].map((col) => (
          <div key={col} className="text-xs font-medium text-[#9CA3AF] uppercase tracking-wide">
            {col}
          </div>
        ))}
      </div>

      {/* Empty State */}
      <div className="flex flex-col items-center justify-center py-12">
        <div className="mb-5">
          <StackedPapers />
        </div>
        <div className="text-center max-w-xs">
          <h4 className="text-sm font-semibold text-[#111827] mb-1.5">
            No items recorded
          </h4>
          <p className="text-sm text-[#6B7280] leading-relaxed text-pretty">
            When you fill in all the invoice fields, Voyce runs a verification to check all your invoice items are in check
          </p>
        </div>
      </div>
    </section>
  );
};
