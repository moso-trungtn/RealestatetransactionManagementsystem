import { type ClassValue, clsx } from "clsx";

// Simple utility to merge class strings
// This is a lightweight replacement for tailwind-merge to avoid ESM import issues
export function twMerge(...classes: string[]): string {
  // Filter out falsy values and join with space
  return classes.filter(Boolean).join(' ');
}

// Utility function to merge class names
// Combines clsx for conditional classes and basic merging
export function cn(...inputs: ClassValue[]) {
  // Use clsx to handle conditional classes, then join the result
  const clsxResult = clsx(inputs);
  return clsxResult;
}