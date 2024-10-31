import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const UserDetailsHeaders = [
  "Gamper",
  "Height",
  "Weight",
  "Initial BMI",
  "BMI Proof",
  "Target BMI",
  "Target Weight",
  "Target Muscle Gain",
  "Body Mass Report",
  "Weekly Progress",
];
export const WeeklyUserProgressHeaders = [
  "Gamper",
  "Week",
  "Workout Consistency",
  "Calories Burned/Steps",
  "Session Participation",
  "Weight Loss %",
  "Muscle Gain %",
  "Improvement Consistency",
];

export const LeaderboardHeaders = [
  "Gamper",
  "Fitness Performance Score",
  "Weight/Muscle Score",
  "Total Score",
];

function toSnakeCase(name: string): string {
  return name.replace(/([a-z])([A-Z])/g, "$1_$2").toLowerCase();
}

function toCamelCase(str: string): string {
  return str.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
}

export function transformToCamelCase(data: any): any {
  if (Array.isArray(data)) {
    return data.map((item) => transformToCamelCase(item));
  } else if (data !== null && typeof data === "object") {
    const transformedObj: Record<string, any> = {};
    for (const key in data) {
      const camelCaseKey = toCamelCase(key);
      transformedObj[camelCaseKey] = data[key];
    }
    return transformedObj;
  } else {
    return data;
  }
}
export function transformToSnake(data: any): any {
  if (Array.isArray(data)) {
    return data.map((item) => toSnakeCase(item));
  } else if (data !== null && typeof data === "object") {
    const transformedObj: Record<string, any> = {};
    for (const key in data) {
      const camelCaseKey = toSnakeCase(key);
      transformedObj[camelCaseKey] = data[key];
    }
    return transformedObj;
  } else {
    return data;
  }
}
