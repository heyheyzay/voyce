"use client";

import React from "react";

export interface StackedPapersProps {
  className?: string;
}

export const StackedPapers: React.FC<StackedPapersProps> = ({ className = "" }) => {
  return (
    <div className={`stack-group relative w-64 h-40 cursor-pointer ${className}`}>
      {/* Layer 3 - Back */}
      <div className="stack-layer-1 absolute inset-0">
        <div className="w-full h-full bg-gray-200 rounded-lg shadow-md border border-gray-300">
          <div className="p-6">
            <div className="w-6 h-6 bg-gray-400 rounded-full mb-4"></div>
            <div className="space-y-3">
              <div className="h-3 bg-gray-300 rounded w-3/4"></div>
              <div className="h-3 bg-gray-300 rounded w-full"></div>
              <div className="h-3 bg-gray-300 rounded w-5/6"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Layer 2 - Middle */}
      <div className="stack-layer-2 absolute inset-0">
        <div className="w-full h-full bg-gray-100 rounded-lg shadow-lg border border-gray-200">
          <div className="p-6">
            <div className="w-6 h-6 bg-gray-400 rounded-full mb-4"></div>
            <div className="space-y-3">
              <div className="h-3 bg-gray-300 rounded w-2/3"></div>
              <div className="h-3 bg-gray-300 rounded w-full"></div>
              <div className="h-3 bg-gray-300 rounded w-4/5"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Layer 1 - Front */}
      <div className="stack-layer-3 absolute inset-0">
        <div className="w-full h-full bg-white rounded-lg shadow-xl border border-gray-200">
          <div className="p-6">
            <div className="w-6 h-6 bg-gray-400 rounded-full mb-4"></div>
            <div className="space-y-3">
              <div className="h-3 bg-gray-300 rounded w-3/4"></div>
              <div className="h-3 bg-gray-300 rounded w-full"></div>
              <div className="h-3 bg-gray-300 rounded w-5/6"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
