"use client";

import React from "react";
import { Header } from "@/components/layout/Header";

// ─── Types ───────────────────────────────────────────────────────────────────

interface StatCard {
  value: string | number;
  label: string;
}

interface InvoiceRow {
  date: string;
  id: string;
  supplier: string;
  supplierSub: string;
  status: "Unpaid" | "Paid" | "Overdue";
  dueDate: string;
  total: string;
  paid: string;
  due: string;
}

// ─── Data ────────────────────────────────────────────────────────────────────

const stats: StatCard[] = [
  { value: 34, label: "RECORDS" },
  { value: 34, label: "RECORDS" },
  { value: 34, label: "RECORDS" },
  { value: 34, label: "RECORDS" },
  { value: 34, label: "RECORDS" },
];

const invoices: InvoiceRow[] = [
  {
    date: "2023-06-12",
    id: "06A6E6BE",
    supplier: "X-SPORT",
    supplierSub: "Unknown",
    status: "Unpaid",
    dueDate: "-",
    total: "$5500.00",
    paid: "$0.00",
    due: "$5500.00",
  },
  {
    date: "2023-06-12",
    id: "06A6E6BE",
    supplier: "X-SPORT",
    supplierSub: "Unknown",
    status: "Unpaid",
    dueDate: "-",
    total: "$5500.00",
    paid: "$0.00",
    due: "$5500.00",
  },
];

// ─── Sub-components ──────────────────────────────────────────────────────────

function StatusChip({ status }: { status: InvoiceRow["status"] }) {
  return (
    <span
      className="inline-flex items-center px-2 py-0.5 rounded-md border text-xs font-medium"
      style={{
        background: "#f2fbf9",
        borderColor: "#a6e9da",
        color: "#1d645c",
      }}
    >
      {status}
    </span>
  );
}

function CopyIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <rect x="9" y="9" width="13" height="13" rx="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function InvoicesDashboard() {
  return (
    <div className="min-h-dvh bg-[#F9FAFB]">
      <Header />

      <main className="max-w-[1440px] mx-auto px-6 py-8">

        {/* Page header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-[28px] font-normal text-[#111827] leading-tight font-serif text-balance">
              Invoices
            </h1>
            <p className="text-sm text-[#6B7280] mt-0.5 text-pretty">
              Manage your invoices. Track payments and balances.
            </p>
          </div>
          <a href="/invoice/new">
            <button className="h-[52px] px-6 rounded-full bg-[#2CA08F] text-white text-base font-semibold hover:bg-[#1D8A79] active:scale-95 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-[#2CA08F] focus:ring-offset-2">
              New invoice
            </button>
          </a>
        </div>

        {/* Stat cards */}
        <div className="flex gap-3 overflow-x-auto pb-1 mb-5">
          {stats.map((s, i) => (
            <div
              key={i}
              className="flex-none min-w-[130px] sm:flex-1 bg-white border border-gray-200 rounded-lg p-4 cursor-default"
            >
              <p className="text-xl font-normal text-[#111827] tabular-nums font-serif">
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
            <table className="w-full min-w-[800px] border-collapse">
              <colgroup>
                <col style={{ width: 174 }} />
                <col style={{ width: 171 }} />
                <col style={{ width: 169 }} />
                <col style={{ width: 148 }} />
                <col style={{ width: 159 }} />
                <col style={{ width: 126 }} />
                <col style={{ width: 120 }} />
                <col style={{ width: 100 }} />
              </colgroup>

              <thead>
                <tr className="border-b border-gray-200">
                  {/* Frozen INVOICE column */}
                  <th
                    scope="col"
                    className="sticky left-0 z-10 h-10 bg-gray-50 px-4 text-left align-middle border-r border-gray-200"
                  >
                    <span className="flex items-center gap-1 text-xs font-medium text-[#9CA3AF] uppercase tracking-wide">
                      INVOICE
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 5v14M5 12l7 7 7-7" />
                      </svg>
                    </span>
                  </th>
                  {["SUPPLIER", "STATUS", "DUE DATE", "TOTAL", "PAID", "DUE", "ACTIONS"].map((label) => (
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
                {invoices.map((row, i) => (
                  <tr
                    key={i}
                    className="border-b border-gray-100 hover:bg-gray-50 transition-colors duration-100 cursor-pointer"
                    onClick={() => (window.location.href = "/invoice/new")}
                  >
                    {/* Frozen INVOICE cell */}
                    <td className="sticky left-0 z-10 h-16 bg-white px-4 border-r border-gray-100 align-middle group-hover:bg-gray-50">
                      <p className="text-sm font-semibold text-[#111827] tabular-nums">{row.date}</p>
                      <p className="text-xs text-[#6B7280] mt-0.5 tabular-nums">{row.id}</p>
                    </td>

                    <td className="h-16 px-4 align-middle">
                      <p className="text-sm font-medium text-[#111827]">{row.supplier}</p>
                      <p className="text-xs text-[#6B7280] mt-0.5">{row.supplierSub}</p>
                    </td>

                    <td className="h-16 px-4 align-middle">
                      <StatusChip status={row.status} />
                    </td>

                    <td className="h-16 px-4 align-middle">
                      <p className="text-sm text-[#374151] tabular-nums">{row.dueDate}</p>
                    </td>

                    <td className="h-16 px-4 align-middle">
                      <p className="text-sm font-medium text-[#111827] tabular-nums">{row.total}</p>
                    </td>

                    <td className="h-16 px-4 align-middle">
                      <p className="text-sm font-medium text-[#2ca08f] tabular-nums">{row.paid}</p>
                    </td>

                    <td className="h-16 px-4 align-middle">
                      <p className="text-sm font-medium text-[#111827] tabular-nums">{row.due}</p>
                    </td>

                    <td className="h-16 px-4 align-middle" onClick={(e) => e.stopPropagation()}>
                      <button
                        className="p-1.5 rounded-md text-[#6B7280] hover:bg-gray-100 hover:text-[#2ca08f] transition-colors duration-100 focus:outline-none focus:ring-2 focus:ring-[#2CA08F] focus:ring-offset-1"
                        aria-label="Copy invoice"
                      >
                        <CopyIcon />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </main>
    </div>
  );
}
