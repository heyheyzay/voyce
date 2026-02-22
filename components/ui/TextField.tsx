"use client";

import React, { InputHTMLAttributes, forwardRef } from "react";

export interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  fullWidth?: boolean;
}

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  ({ label, error, helperText, fullWidth = false, className = "", ...props }, ref) => {
    return (
      <div className={`flex flex-col gap-2 ${fullWidth ? "w-full" : ""}`}>
        {label && (
          <label className="text-sm font-medium text-gray-700">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={`
            px-4 py-3
            border border-gray-300 rounded-md
            text-base text-gray-900 placeholder-gray-400
            transition-all duration-200
            focus:outline-none focus:ring-2 focus:ring-teal focus:border-transparent
            hover:border-gray-400
            disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed
            ${error ? "border-red-500 focus:ring-red-500" : ""}
            ${className}
          `}
          aria-invalid={error ? "true" : "false"}
          aria-describedby={error ? `${props.id}-error` : helperText ? `${props.id}-helper` : undefined}
          {...props}
        />
        {error && (
          <span id={`${props.id}-error`} className="text-sm text-red-600" role="alert">
            {error}
          </span>
        )}
        {helperText && !error && (
          <span id={`${props.id}-helper`} className="text-sm text-gray-500">
            {helperText}
          </span>
        )}
      </div>
    );
  }
);

TextField.displayName = "TextField";
