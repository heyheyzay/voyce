"use client";

import React from "react";

export const InvoicePreview: React.FC = () => {
  return (
    <article className="bg-white border border-gray-200 rounded-xl overflow-hidden">
      {/* Invoice paper */}
      <div className="p-12">

        {/* Top row: logo/from block + invoice meta */}
        <div className="flex items-start justify-between mb-16">
          {/* From */}
          <div>
            {/* Brand mark */}
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 rounded-lg bg-[#00897B] flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-white">
                  <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span className="text-base font-semibold text-gray-900">Acme Corp</span>
            </div>
            <p className="text-sm text-gray-500 leading-relaxed">
              123 Business Street<br />
              San Francisco, CA 94102<br />
              billing@acmecorp.com
            </p>
          </div>

          {/* Invoice title + number */}
          <div className="text-right">
            <h2 className="font-serif text-5xl font-semibold text-gray-900 leading-none mb-3">
              INVOICE
            </h2>
            <p className="text-lg text-gray-400 font-medium tracking-widest">#347</p>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-100 mb-10" />

        {/* Billed to + dates row */}
        <div className="grid grid-cols-3 gap-10 mb-16">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 mb-2">Billed to</p>
            <p className="text-sm font-semibold text-gray-900 mb-1">XYZ Ltd</p>
            <p className="text-sm text-gray-500 leading-relaxed">
              456 Client Avenue<br />
              New York, NY 10001<br />
              accounts@xyzltd.com
            </p>
          </div>
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 mb-2">Invoice date</p>
            <p className="text-sm font-medium text-gray-900">January 20, 2026</p>
          </div>
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 mb-2">Due date</p>
            <p className="text-sm font-medium text-gray-900">February 20, 2026</p>
          </div>
        </div>

        {/* Line items table */}
        <table className="w-full mb-10">
          <thead>
            <tr className="border-b border-gray-900">
              <th className="text-left text-[10px] font-semibold uppercase tracking-widest text-gray-500 pb-3 w-1/2">
                Description
              </th>
              <th className="text-right text-[10px] font-semibold uppercase tracking-widest text-gray-500 pb-3">
                Qty
              </th>
              <th className="text-right text-[10px] font-semibold uppercase tracking-widest text-gray-500 pb-3">
                Unit price
              </th>
              <th className="text-right text-[10px] font-semibold uppercase tracking-widest text-gray-500 pb-3">
                Amount
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            <tr>
              <td className="py-4">
                <p className="text-sm font-medium text-gray-900">Product design services</p>
                <p className="text-xs text-gray-400 mt-0.5">UI/UX design for mobile app — Q1 sprint</p>
              </td>
              <td className="py-4 text-right text-sm text-gray-700">10</td>
              <td className="py-4 text-right text-sm text-gray-700">$350.00</td>
              <td className="py-4 text-right text-sm font-medium text-gray-900">$3,500.00</td>
            </tr>
            <tr>
              <td className="py-4">
                <p className="text-sm font-medium text-gray-900">Frontend development</p>
                <p className="text-xs text-gray-400 mt-0.5">Component implementation, Next.js 15</p>
              </td>
              <td className="py-4 text-right text-sm text-gray-700">4</td>
              <td className="py-4 text-right text-sm text-gray-700">$500.00</td>
              <td className="py-4 text-right text-sm font-medium text-gray-900">$2,000.00</td>
            </tr>
          </tbody>
        </table>

        {/* Totals block */}
        <div className="flex justify-end mb-16">
          <div className="w-64 space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">Subtotal</span>
              <span className="text-gray-900 font-medium">$5,500.00</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">Tax (0%)</span>
              <span className="text-gray-900 font-medium">$0.00</span>
            </div>
            <div className="border-t border-gray-200 pt-2 mt-2 flex items-center justify-between">
              <span className="text-sm font-semibold text-gray-900">Total due</span>
              <span className="text-base font-bold text-gray-900">$5,500.00</span>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-100 mb-8" />

        {/* Footer: payment instructions + status pill */}
        <div className="flex items-start justify-between">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 mb-2">
              Payment instructions
            </p>
            <p className="text-sm text-gray-500 leading-relaxed">
              Bank: First National Bank&nbsp;&nbsp;·&nbsp;&nbsp;
              Account: 0012-3456-78&nbsp;&nbsp;·&nbsp;&nbsp;
              Routing: 021000021
            </p>
          </div>

          {/* Status badge */}
          <div className="flex flex-col items-end gap-1">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-50 border border-orange-200 text-xs font-semibold text-orange-600">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-400 inline-block" />
              Pending
            </span>
            <p className="text-[10px] text-gray-400">Awaiting payment</p>
          </div>
        </div>

        {/* Watermark note */}
        <div className="mt-10 pt-6 border-t border-gray-100 flex items-center gap-2">
          <svg className="w-3.5 h-3.5 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
            />
          </svg>
          <p className="text-[10px] text-gray-300 tracking-wide">
            Verified by Voyce · Record ID 06a6e6be-9e16-455e-be62-eae178ac40db · Immutable
          </p>
        </div>

      </div>
    </article>
  );
};
