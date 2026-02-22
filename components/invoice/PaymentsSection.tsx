"use client";

import React from "react";
import { StackedPapers } from "../illustrations/StackedPapers";

export const PaymentsSection: React.FC = () => {
  return (
    <section className="bg-white border border-gray-200 rounded-xl p-6">
      {/* Icon & Title */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-6 h-6 flex-shrink-0">
          <img
            alt=""
            className="w-6 h-6 object-contain block"
            src="http://localhost:3845/assets/88439ee638393bf23057c6dcbfd2845758f1cc3e.svg"
          />
        </div>
        <h3 className="text-lg font-semibold text-gray-900">Payments</h3>
      </div>

      {/* Empty State */}
      <div className="flex flex-col items-center justify-center py-12">
        {/* Stacked Papers Illustration with hover effect */}
        <div className="mb-6">
          <StackedPapers />
        </div>

        {/* Empty State Text */}
        <div className="text-center max-w-xs">
          <h4 className="text-base font-medium text-gray-900 mb-2">
            No payments recorded
          </h4>
          <p className="text-sm text-gray-600 leading-relaxed">
            When you fill in all the invoice fields, Voyce runs a verification to check all your invoice items are in check
          </p>
        </div>
      </div>
    </section>
  );
};
