"use client";

import React, { useState, useRef } from "react";
import { Header } from "@/components/layout/Header";
import { Alert } from "@/components/ui/Alert";
import { InvoiceDetailsSection } from "@/components/invoice/InvoiceDetailsSection";
import { PaymentsSection } from "@/components/invoice/PaymentsSection";
import { LineItemsSection } from "@/components/invoice/LineItemsSection";
import { VerificationStatusSection } from "@/components/invoice/VerificationStatusSection";
import { AuditTrailSection } from "@/components/invoice/AuditTrailSection";
import { InvoicePreview } from "@/components/invoice/InvoicePreview";

type Tab = "edit" | "preview";

function TabPanel({ visible, children }: { visible: boolean; children: React.ReactNode }) {
  return (
    <div
      aria-hidden={!visible}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0px)" : "translateY(8px)",
        transition: "opacity 200ms ease-out, transform 200ms ease-out",
        pointerEvents: visible ? "auto" : "none",
        position: visible ? "relative" : "absolute",
        inset: visible ? "auto" : 0,
      }}
    >
      {children}
    </div>
  );
}

export default function InvoiceDetailPage() {
  const [activeTab, setActiveTab] = useState<Tab>("edit");
  const [editVisible, setEditVisible] = useState(true);
  const [previewVisible, setPreviewVisible] = useState(false);
  const transitioning = useRef(false);

  const handleTabChange = (tab: Tab) => {
    if (tab === activeTab || transitioning.current) return;
    transitioning.current = true;
    if (tab === "preview") {
      setEditVisible(false);
      setTimeout(() => { setActiveTab("preview"); setPreviewVisible(true); transitioning.current = false; }, 200);
    } else {
      setPreviewVisible(false);
      setTimeout(() => { setActiveTab("edit"); setEditVisible(true); transitioning.current = false; }, 200);
    }
  };

  return (
    <div className="min-h-dvh bg-[#F9FAFB]">
      <Header />
      <main className="max-w-[1440px] mx-auto px-6 py-8 pb-36">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-sm mb-6" aria-label="Breadcrumb">
          <a href="/" className="text-[#6B7280] hover:text-[#111827] transition-colors duration-100">
            Invoices
          </a>
          <svg className="w-3.5 h-3.5 text-[#D1D5DB]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <span className="text-[#2CA08F] font-medium">New invoice</span>
        </nav>

        {/* Page title & tab switcher */}
        <div className="flex flex-col lg:flex-row items-start justify-between gap-4 mb-6">
          <div>
            <h1 className="text-[28px] font-normal text-[#111827] leading-tight font-serif text-balance">
              Invoice <span className="text-[#9CA3AF]">#347</span>
            </h1>
            <p className="text-sm text-[#6B7280] mt-0.5 text-pretty">
              Manage your invoice here. Track payments and balances.
            </p>
          </div>

          <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1 border border-gray-200" role="tablist">
            {(["edit", "preview"] as Tab[]).map((tab) => (
              <button
                key={tab}
                role="tab"
                aria-selected={activeTab === tab}
                onClick={() => handleTabChange(tab)}
                className={`flex items-center gap-1.5 px-3 py-2 text-sm font-medium rounded-md transition-colors duration-150 ${
                  activeTab === tab
                    ? "bg-white text-[#111827] shadow-sm"
                    : "text-[#6B7280] hover:text-[#111827]"
                }`}
              >
                {tab === "edit" ? (
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                ) : (
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8 relative">
            <TabPanel visible={editVisible}>
              <div className="space-y-5">
                <InvoiceDetailsSection />
                <PaymentsSection />
                <LineItemsSection />
              </div>
            </TabPanel>
            <TabPanel visible={previewVisible}>
              <InvoicePreview />
            </TabPanel>
          </div>

          <div className="lg:col-span-4 space-y-5">
            <VerificationStatusSection />
            <AuditTrailSection />
            <Alert
              type="warning"
              description="This record is immutable. Verified by system, confirmed by human."
              icon={
                <img
                  alt=""
                  className="w-5 h-5 object-contain block flex-shrink-0"
                  src="http://localhost:3845/assets/6d65b5479d76265adebd5b21f381a5bd29f93ec5.svg"
                />
              }
            />
          </div>
        </div>
      </main>

      {/* Sticky bottom bar */}
      <div className="fixed bottom-10 left-0 right-0 flex justify-center pointer-events-none z-50">
        <div className="pointer-events-auto max-w-[1440px] w-full mx-auto px-6">
          <div className="h-[72px] flex items-center justify-end gap-3 px-5 bg-white rounded-xl border border-gray-200 shadow-md">
            <a href="/">
              <button className="h-[52px] px-6 rounded-full border border-gray-300 bg-white text-[#374151] text-base font-medium hover:bg-gray-50 active:scale-95 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2">
                Cancel
              </button>
            </a>
            <button className="h-[52px] px-6 rounded-full bg-[#CDFF00] text-[#111827] text-base font-semibold hover:bg-[#b8e600] active:scale-95 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-[#CDFF00] focus:ring-offset-2">
              Share
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
