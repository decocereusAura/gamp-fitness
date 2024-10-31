// services/ExcelManager.ts
import { headers } from "next/headers";

class ExcelManager {
  public static getBaseUrl(): string {
    if (typeof window === "undefined") {
      const headersList = headers();
      const host = headersList.get("host") || "localhost:3000";
      const protocol =
        process.env.NODE_ENV === "development" ? "http" : "https";
      return `${protocol}://${host}`;
    }
    return "";
  }

  public static async readSheet(sheetName?: string): Promise<any> {
    const baseUrl = this.getBaseUrl();
    const url = sheetName
      ? `${baseUrl}/api/excel?sheet=${encodeURIComponent(sheetName)}`
      : `${baseUrl}/api/excel`;

    const response = await fetch(url);
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Failed to read sheet");
    }
    return await response.json();
  }

  public static async fetchWeeklyProgressData(
    participantId?: string
  ): Promise<any> {
    const baseUrl = this.getBaseUrl();
    const url = participantId
      ? `${baseUrl}/api/update-weekly-progress?participantId=${encodeURIComponent(
          participantId
        )}`
      : `${baseUrl}/api/update-weekly-progress`;

    const response = await fetch(url);
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Failed to fetch weekly progress data");
    }
    return await response.json();
  }

  public static async fetchLeaderboard(): Promise<any> {
    const baseUrl = this.getBaseUrl();
    const url = `${baseUrl}/api/calculate-score`;
    const computingScore = await this.computeLeaderboard();

    const response = await fetch(url);
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Failed to fetch leaderboard");
    }
    return await response.json();
  }

  public static async addParticipant(data: any): Promise<any> {
    const baseUrl = this.getBaseUrl();
    const response = await fetch(`${baseUrl}/api/add-participant`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Failed to add participant");
    }
    return await response.json();
  }

  public static async computeLeaderboard(): Promise<any> {
    const baseUrl = this.getBaseUrl();
    const response = await fetch(`${baseUrl}/api/calculate-score`, {
      method: "POST",
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Failed to compute leaderboard");
    }
    return await response.json();
  }

  public static async addWeeklyProgress(data: any): Promise<any> {
    const baseUrl = this.getBaseUrl();
    const response = await fetch(`${baseUrl}/api/update-weekly-progress`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Failed to update weekly progress");
    }
    return await response.json();
  }
}

export default ExcelManager;
