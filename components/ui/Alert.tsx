"use client";

import React, { ReactNode } from "react";

export interface AlertProps {
  type?: "info" | "success" | "warning" | "error";
  title?: string;
  description: string;
  icon?: ReactNode;
  action?: ReactNode;
  onClose?: () => void;
}

export const Alert: React.FC<AlertProps> = ({
  type = "info",
  title,
  description,
  icon,
  action,
  onClose,
}) => {
  const typeStyles = {
    info: "bg-blue-50 border-blue-200 text-blue-900",
    success: "bg-green-50 border-green-200 text-green-900",
    warning: "bg-orange-50 border-orange-200 text-orange-900",
    error: "bg-red-50 border-red-200 text-red-900",
  };

  const iconColors = {
    info: "text-blue-500",
    success: "text-green-500",
    warning: "text-orange-500",
    error: "text-red-500",
  };

  return (
    <div
      className={`
        flex items-start gap-3 p-4 rounded-lg border
        ${typeStyles[type]}
      `}
      role="alert"
    >
      {icon && (
        <div className={`flex-shrink-0 ${iconColors[type]}`}>
          {icon}
        </div>
      )}
      <div className="flex-1 min-w-0">
        {title && <div className="font-semibold text-sm mb-1">{title}</div>}
        <div className="text-sm leading-relaxed">{description}</div>
      </div>
      {action && <div className="flex-shrink-0">{action}</div>}
      {onClose && (
        <button
          onClick={onClose}
          className="flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Close alert"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  );
};
