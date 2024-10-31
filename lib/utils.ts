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

export const getProdCloudFrontUrl = (imagePath: string) => {
  const cleanedPath = imagePath?.startsWith("/")
    ? imagePath.slice(1)
    : imagePath;
  return `${process.env.NEXT_PUBLIC_PROD_IMAGES}${cleanedPath}`;
};
