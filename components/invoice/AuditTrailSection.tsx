"use client";

import React from "react";

export const AuditTrailSection: React.FC = () => {
  return (
    <section className="bg-white border border-gray-200 rounded-xl p-6">
      {/* Icon & Title */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-6 h-6 flex-shrink-0">
          <img
            alt=""
            className="w-6 h-6 object-contain block"
            src="http://localhost:3845/assets/74e5fe1582bfdda3d4536ae655fe1196a49deba7.svg"
          />
        </div>
        <h3 className="text-lg font-semibold text-gray-900">Audit trail</h3>
      </div>

      {/* Audit Information */}
      <div className="space-y-6">
        {/* Recorded */}
        <div>
          <p className="text-sm font-medium text-gray-700 mb-1">Recorded:</p>
          <p className="text-sm text-gray-900">Jan 20, 2026 - 05:54 PM</p>
        </div>

        {/* Record ID */}
        <div>
          <p className="text-sm font-medium text-gray-700 mb-1">Record ID:</p>
          <p className="text-sm text-gray-900 font-mono break-all">
            06a6e6be-9e16-455e-be62-eae178ac40db
          </p>
        </div>

        {/* Supplier ID */}
        <div>
          <p className="text-sm font-medium text-gray-700 mb-1">Supplier ID:</p>
          <p className="text-sm text-gray-900 font-mono break-all">
            153f163d-03ab-4451-a9d6-9fae94df7577
          </p>
        </div>
      </div>
    </section>
  );
};
