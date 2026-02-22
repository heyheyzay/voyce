"use client";

import React, { ButtonHTMLAttributes, ReactNode } from "react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  icon?: ReactNode;
  iconPosition?: "left" | "right";
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "md",
  icon,
  iconPosition = "left",
  fullWidth = false,
  className = "",
  disabled,
  ...props
}) => {
  const baseStyles = `
    inline-flex items-center justify-center gap-2
    font-medium rounded-full
    transition-all duration-200
    focus:outline-none focus:ring-2 focus:ring-offset-2
    disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none
    ${fullWidth ? "w-full" : ""}
  `;

  const variantStyles = {
    primary: `
      bg-[#CDFF0A] text-gray-900
      hover:bg-[#BFE600] hover:shadow-md
      focus:ring-[#CDFF0A]
      active:scale-95
    `,
    secondary: `
      bg-teal text-white
      hover:bg-teal-hover hover:shadow-md
      focus:ring-teal
      active:scale-95
    `,
    outline: `
      bg-white text-gray-700 border-2 border-gray-300
      hover:bg-gray-50 hover:border-gray-400
      focus:ring-gray-400
      active:scale-95
    `,
    ghost: `
      bg-transparent text-gray-700
      hover:bg-gray-100
      focus:ring-gray-400
    `,
  };

  const sizeStyles = {
    sm: "px-3 py-2 text-sm h-9",
    md: "px-6 py-3 text-base h-11",
    lg: "px-8 py-4 text-lg h-14",
  };

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      disabled={disabled}
      {...props}
    >
      {icon && iconPosition === "left" && <span className="flex-shrink-0">{icon}</span>}
      {children}
      {icon && iconPosition === "right" && <span className="flex-shrink-0">{icon}</span>}
    </button>
  );
};
