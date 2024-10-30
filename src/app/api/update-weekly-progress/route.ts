import { UserWeekDetails } from "@/components/participant-form/week-client-form";
import * as fs from "fs";
import { NextResponse } from "next/server";
import * as path from "path";
import * as XLSX from "xlsx";

export async function POST(request: any) {
  const incomingRequest = await request.json();
  const weeklyData: UserWeekDetails = incomingRequest.data;
  const filePath = path.resolve("database", "gamp-fitness.xlsx");

  try {
    if (!fs.existsSync(filePath)) {
      return NextResponse.json(
        { error: "Workbook not found." },
        { status: 404 }
      );
    }
    const fileBuffer = fs.readFileSync(filePath);
    const workbook = XLSX.read(fileBuffer, { type: "buffer" });
    const sheet = workbook.Sheets["WeeklyProgress"];

    if (!sheet) {
      return NextResponse.json(
        { error: "Sheet 'Participants' not found in workbook." },
        { status: 404 }
      );
    }
    const data: UserWeekDetails[] = XLSX.utils.sheet_to_json(sheet);

    const rowExists = data.some(
      (p: UserWeekDetails) =>
        p.participantId === weeklyData.participantId &&
        p.week === weeklyData.week
    );

    if (!rowExists) {
      data.push(weeklyData);
      const newSheet = XLSX.utils.json_to_sheet(data);
      workbook.Sheets["WeeklyProgress"] = newSheet;
      const updatedWorkbookBuffer = XLSX.write(workbook, {
        bookType: "xlsx",
        type: "buffer",
      });
      fs.writeFileSync(filePath, updatedWorkbookBuffer);
      return NextResponse.json({
        message: `Weekly progress updated for ${weeklyData.week}`,
      });
    } else {
      return NextResponse.json({
        message: "This week's data already exists for this participant",
      });
    }
  } catch (error) {
    return NextResponse.json(
      { error: "Error updating weekly progress", errorMessage: error },
      { status: 500 }
    );
  }
}

export async function GET(request: any) {
  const participantId =
    request.nextUrl.searchParams.get("participantId") || "all";
  const filePath = path.resolve("database", "gamp-fitness.xlsx");

  try {
    if (!fs.existsSync(filePath)) {
      return NextResponse.json(
        { error: "Workbook not found." },
        { status: 404 }
      );
    }
    const fileBuffer = fs.readFileSync(filePath);
    const workbook = XLSX.read(fileBuffer, { type: "buffer" });
    const sheet = workbook.Sheets["WeeklyProgress"];

    if (!sheet) {
      return NextResponse.json(
        { error: "Sheet 'Participants' not found in workbook." },
        { status: 404 }
      );
    }
    const data: UserWeekDetails[] = XLSX.utils.sheet_to_json(sheet);
    if (data.length > 0 && participantId !== "all") {
      const filteredData = data.filter(
        (p: UserWeekDetails) => p.participantId === participantId
      );
      return NextResponse.json({
        data: filteredData,
        message: `Found ${filteredData.length} entries for this participant`,
      });
    }
    if (data.length > 0 && participantId === "all") {
      return NextResponse.json({
        data,
        message: `Weekly data for all participants`,
      });
    }
    return NextResponse.json({
      message: `There is no weekly progress data.`,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching weekly progress", errorMessage: error },
      { status: 500 }
    );
  }
}
