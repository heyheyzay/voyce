"use client";

import React from "react";
import { TextField } from "../ui/TextField";

export const InvoiceDetailsSection: React.FC = () => {
  return (
    <section className="bg-white border border-gray-200 rounded-xl p-6">
      {/* Icon & Title */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-6 h-6 flex-shrink-0">
          <img
            alt=""
            className="w-6 h-6 object-contain block"
            src="http://localhost:3845/assets/eb36e93e2ea50cfbb01c01f7261627c9ca9732c4.svg"
          />
        </div>
        <h3 className="text-lg font-semibold text-gray-900">Invoice details</h3>
      </div>

      {/* Form Fields */}
      <div className="space-y-6">
        {/* Row 1: Supplier & Buyer */}
        <div className="grid grid-cols-2 gap-6">
          <TextField
            id="supplier"
            label="Supplier"
            placeholder="Value"
            defaultValue="Value"
            fullWidth
          />
          <TextField
            id="buyer"
            label="Buyer"
            placeholder="Value"
            defaultValue="Value"
            fullWidth
          />
        </div>

        {/* Row 2: Invoice date & Due date */}
        <div className="grid grid-cols-2 gap-6">
          <TextField
            id="invoice-date"
            label="Invoice date"
            type="date"
            placeholder="Value"
            defaultValue="Value"
            fullWidth
          />
          <TextField
            id="due-date"
            label="Due date"
            type="date"
            placeholder="Value"
            defaultValue="Value"
            fullWidth
          />
        </div>
      </div>
    </section>
  );
};
