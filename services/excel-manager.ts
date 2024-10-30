// services/excel-manager.ts
import { headers } from "next/headers";

function getBaseUrl() {
  if (typeof window === "undefined") {
    const headersList = headers();
    const host = headersList.get("host") || "localhost:3000";
    const protocol = process.env.NODE_ENV === "development" ? "http" : "https";
    return `${protocol}://${host}`;
  }
  return "";
}

const excelManager = {
  async readSheet(sheetName?: string) {
    const baseUrl = getBaseUrl();
    const url = sheetName
      ? `${baseUrl}/api/excel?sheet=${encodeURIComponent(sheetName)}`
      : `${baseUrl}/api/excel`;

    const response = await fetch(url);

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Failed to read sheet");
    }
    const parsedResponse = await response.json();
    return parsedResponse;
  },

  async fetchWeeklyProgressData(participantId?: string) {
    const baseUrl = getBaseUrl();
    const url = participantId
      ? `${baseUrl}/api/update-weekly-progress?participantId=${encodeURIComponent(
          participantId
        )}`
      : `${baseUrl}/api/update-weekly-progress`;

    const response = await fetch(url);

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Failed to read sheet");
    }
    const parsedResponse = await response.json();
    return parsedResponse;
  },

  async writeSheet(destination: string, data: any) {
    const baseUrl = getBaseUrl();
    const response = await fetch(`${baseUrl}/api/excel`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ destination, data }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Failed to write sheet");
    }
    const parsedResponse = await response.json();
    return parsedResponse;
  },

  async addParticipant(data: any) {
    const baseUrl = getBaseUrl();
    const response = await fetch(`${baseUrl}/api/add-participant`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.log("error response", error);
      throw new Error(error.error || "Failed to write sheet");
    }

    const parsedResponse = await response.json();
    console.log("parsed response", parsedResponse);
    return parsedResponse;
  },

  async addWeeklyProgress(data: any) {
    const baseUrl = getBaseUrl();
    const response = await fetch(`${baseUrl}/api/update-weekly-progress`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.log("error response", error);
      throw new Error(error.error || "Failed to write sheet");
    }

    const parsedResponse = await response.json();
    console.log("parsed response", parsedResponse);
    return parsedResponse;
  },

  async getSheets() {
    const baseUrl = getBaseUrl();
    const response = await fetch(`${baseUrl}/api/excel`, {
      method: "OPTIONS",
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Failed to get sheets");
    }
    const parsedResponse = await response.json();
    return parsedResponse;
  },
};

export default excelManager;
