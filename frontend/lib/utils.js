import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merges Tailwind CSS class names, removing duplicates and handling conditionals.
 * @param {...string} inputs - Class names or conditional class objects.
 * @returns {string} - Merged class string.
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
