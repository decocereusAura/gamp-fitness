"use server";

import excelManager from "@/services/excel-manager";

export const addParticipantRow = async (data: any) => {
  const response = await excelManager.addParticipant(data);
  console.log("in action", response);
  return response;
};
export const addWeeklyData = async (data: any) => {
  const response = await excelManager.addWeeklyProgress(data);
  console.log("in action", response);
  return response;
};
