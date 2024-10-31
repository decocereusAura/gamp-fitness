"use server";

import ExcelManager from "@/services/excel-manager";

export const addParticipantRow = async (data: any) => {
  const response = await ExcelManager.addParticipant(data);
  console.log("in action", response);
  return response;
};
export const addWeeklyData = async (data: any) => {
  const response = await ExcelManager.addWeeklyProgress(data);
  console.log("in action", response);
  return response;
};

export const fetchLeaderboard = async () => {
  const response = await ExcelManager.fetchLeaderboard();
  console.log("in action", response);
  return response;
};
