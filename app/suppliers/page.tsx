"use client";

import React, { useState } from "react";
import { Header } from "@/components/layout/Header";

// ─── Types ───────────────────────────────────────────────────────────────────

interface StatCard {
  value: string | number;
  label: string;
  highlight?: boolean;
}

interface SupplierRow {
  id: string;
  name: string;
  contact: string | null;
  invoices: number;
  outstanding: string;
  outstandingValue: number;
  lastInvoice: string | null;
}

// ─── Data ────────────────────────────────────────────────────────────────────

const stats: StatCard[] = [
  { value: 3,          label: "SUPPLIERS" },
  { value: 1,          label: "TOTAL INVOICES" },
  { value: "$5500.00", label: "TOTAL OUTSTANDING" },
  { value: 1,          label: "WITH BALANCE", highlight: true },
];

const suppliers: SupplierRow[] = [
  {
    id: "x-sport",
    name: "X-SPORT",
    contact: null,
    invoices: 1,
    outstanding: "$5500.00",
    outstandingValue: 5500,
    lastInvoice: "2023-06-12",
  },
  {
    id: "test",
    name: "test",
    contact: null,
    invoices: 0,
    outstanding: "$0.00",
    outstandingValue: 0,
    lastInvoice: null,
  },
  {
    id: "tes",
    name: "tes",
    contact: null,
    invoices: 0,
    outstanding: "$0.00",
    outstandingValue: 0,
    lastInvoice: null,
  },
];

// ─── Icons ────────────────────────────────────────────────────────────────────

function EditIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
  );
}

function TrashIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
      <path d="M10 11v6M14 11v6" />
      <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
    </svg>
  );
}

function ChevronRightIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 18l6-6-6-6" />
    </svg>
  );
}

// ─── Sub-components ──────────────────────────────────────────────────────────

function SupplierAvatar({ name }: { name: string }) {
  return (
    <div className="size-7 rounded-full bg-gray-100 flex items-center justify-center text-xs font-semibold text-[#374151] flex-shrink-0 select-none">
      {name.charAt(0).toUpperCase()}
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function SuppliersPage() {
  const [_hoveredRow, setHoveredRow] = useState<string | null>(null);

  return (
    <div className="min-h-dvh bg-[#F9FAFB]">
      <Header />

      <main className="max-w-[1440px] mx-auto px-6 py-8">

        {/* Page header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-[28px] font-normal text-[#111827] leading-tight font-serif text-balance">
              Suppliers
            </h1>
            <p className="text-sm text-[#6B7280] mt-0.5 text-pretty">
              Manage your suppliers and view their invoice history.
            </p>
          </div>
          <button className="flex items-center gap-2 h-[52px] px-6 rounded-full bg-[#CDFF00] text-[#111827] text-base font-semibold hover:bg-[#b8e600] active:scale-95 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-[#CDFF00] focus:ring-offset-2">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            Add Supplier
          </button>
        </div>

        {/* Stat cards */}
        <div className="flex gap-3 overflow-x-auto pb-1 mb-5">
          {stats.map((s, i) => (
            <div
              key={i}
              className={`flex-none min-w-[130px] sm:flex-1 bg-white border rounded-lg p-4 cursor-default ${
                s.highlight
                  ? "border-l-[3px] border-l-[#F59E0B] border-gray-200"
                  : "border-gray-200"
              }`}
            >
              <p
                className={`text-xl font-normal tabular-nums font-serif ${
                  s.highlight ? "text-[#F59E0B]" : "text-[#111827]"
                }`}
              >
                {s.value}
              </p>
              <p className="text-xs font-medium text-[#9CA3AF] uppercase tracking-wide mt-1">
                {s.label}
              </p>
            </div>
          ))}
        </div>

        {/* Table */}
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px] border-collapse">
              <colgroup>
                <col style={{ width: 240 }} />
                <col style={{ width: 180 }} />
                <col style={{ width: 120 }} />
                <col style={{ width: 180 }} />
                <col style={{ width: 160 }} />
                <col style={{ width: 120 }} />
              </colgroup>

              <thead>
                <tr className="border-b border-gray-200">
                  {["SUPPLIER", "CONTACT", "INVOICES", "OUTSTANDING", "LAST INVOICE", "ACTIONS"].map((label) => (
                    <th
                      key={label}
                      scope="col"
                      className="h-10 bg-gray-50 px-4 text-left align-middle"
                    >
                      <span className="text-xs font-medium text-[#9CA3AF] uppercase tracking-wide">
                        {label}
                      </span>
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {suppliers.map((row) => (
                  <tr
                    key={row.id}
                    className="border-b border-gray-100 hover:bg-gray-50 transition-colors duration-100 cursor-pointer"
                    onMouseEnter={() => setHoveredRow(row.id)}
                    onMouseLeave={() => setHoveredRow(null)}
                  >
                    <td className="h-14 px-4 align-middle">
                      <div className="flex items-center gap-2.5">
                        <SupplierAvatar name={row.name} />
                        <p className="text-sm font-medium text-[#111827]">{row.name}</p>
                      </div>
                    </td>

                    <td className="h-14 px-4 align-middle">
                      <p className="text-sm text-[#9CA3AF]">{row.contact ?? "—"}</p>
                    </td>

                    <td className="h-14 px-4 align-middle">
                      <p className="text-sm text-[#374151] tabular-nums">{row.invoices}</p>
                    </td>

                    <td className="h-14 px-4 align-middle">
                      <p className={`text-sm font-medium tabular-nums ${
                        row.outstandingValue > 0 ? "text-[#F59E0B]" : "text-[#2ca08f]"
                      }`}>
                        {row.outstanding}
                      </p>
                    </td>

                    <td className="h-14 px-4 align-middle">
                      <p className="text-sm text-[#374151] tabular-nums">
                        {row.lastInvoice ?? "—"}
                      </p>
                    </td>

                    <td className="h-14 px-4 align-middle" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center gap-0.5">
                        <button
                          className="p-1.5 rounded-md text-[#9CA3AF] hover:bg-gray-100 hover:text-[#2ca08f] transition-colors duration-100 focus:outline-none focus:ring-2 focus:ring-[#2CA08F] focus:ring-offset-1"
                          aria-label={`Edit ${row.name}`}
                        >
                          <EditIcon />
                        </button>
                        <button
                          className="p-1.5 rounded-md text-[#9CA3AF] hover:bg-red-50 hover:text-[#ef4444] transition-colors duration-100 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-1"
                          aria-label={`Delete ${row.name}`}
                        >
                          <TrashIcon />
                        </button>
                        <button
                          className="p-1.5 rounded-md text-[#9CA3AF] hover:bg-gray-100 hover:text-[#374151] transition-colors duration-100 focus:outline-none focus:ring-2 focus:ring-[#2CA08F] focus:ring-offset-1"
                          aria-label={`View ${row.name} invoices`}
                        >
                          <ChevronRightIcon />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {/* Footer hint */}
                <tr>
                  <td colSpan={6} className="px-4 py-2.5 bg-gray-50">
                    <p className="text-xs text-[#9CA3AF]">
                      Click a supplier to view their invoice history.
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Floating action button */}
        <button
          className="fixed bottom-6 right-6 size-12 rounded-full bg-[#CDFF00] text-[#111827] flex items-center justify-center shadow-md hover:bg-[#b8e600] active:scale-95 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-[#CDFF00] focus:ring-offset-2 z-50"
          aria-label="Add supplier"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </button>

      </main>
    </div>
  );
}
