"use client";

import React, { ButtonHTMLAttributes, ReactNode } from "react";

export interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: ReactNode;
  size?: "sm" | "md" | "lg";
  variant?: "default" | "ghost" | "outline";
  "aria-label": string;
}

export const IconButton: React.FC<IconButtonProps> = ({
  icon,
  size = "md",
  variant = "default",
  className = "",
  disabled,
  ...props
}) => {
  const baseStyles = `
    inline-flex items-center justify-center
    rounded-lg
    transition-all duration-200
    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal
    disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none
  `;

  const variantStyles = {
    default: `
      bg-gray-100 text-gray-700
      hover:bg-gray-200 hover:scale-105
      active:scale-95
    `,
    ghost: `
      bg-transparent text-gray-700
      hover:bg-gray-100 hover:scale-105
      active:scale-95
    `,
    outline: `
      bg-white text-gray-700 border border-gray-300
      hover:bg-gray-50 hover:border-gray-400 hover:scale-105
      active:scale-95
    `,
  };

  const sizeStyles = {
    sm: "w-8 h-8 p-1.5",
    md: "w-10 h-10 p-2",
    lg: "w-12 h-12 p-2.5",
  };

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      disabled={disabled}
      {...props}
    >
      {icon}
    </button>
  );
};
