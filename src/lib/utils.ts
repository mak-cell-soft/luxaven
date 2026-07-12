// Utility function: merges Tailwind classes safely using clsx + tailwind-merge
// Used throughout the project for conditional className composition (cn pattern)
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
