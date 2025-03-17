"use client";
import { cn } from "@/lib/utils";
import { forwardRef } from "react";

/**
 * Reusable Button component
 * @param {string} variant - "primary" | "secondary"
 * @param {string} size - "sm" | "md" | "lg"
 * @param {boolean} fullWidth - Whether the button is full width
 * @param {boolean} isLoading - Show loading state
 * @param {string} className - Additional class names
 * @param {React.Ref} ref - Forwarded ref
 * @param {React.ReactNode} children - Button content
 */
const Button = forwardRef(
  (
    { variant = "primary", size = "md", fullWidth, isLoading, className, children, ...props },
    ref
  ) => {
    return (
      <button
        ref={ref}
        disabled={isLoading}
        className={cn(
          "flex items-center justify-center rounded-md font-medium transition",
          variant === "primary" && "bg-[#8E7754] text-white hover:bg-[#C19A6B]",
          variant === "secondary" && "bg-gray-200 text-gray-800 hover:bg-gray-300",
          size === "sm" && "px-3 py-1 text-sm",
          size === "md" && "px-4 py-2 text-base",
          size === "lg" && "px-5 py-3 text-lg",
          fullWidth && "w-full",
          isLoading && "opacity-50 cursor-not-allowed",
          className
        )}
        {...props}
      >
        {isLoading ? "Loading..." : children}
      </button>
    );
  }
);

Button.displayName = "Button";
export default Button;
