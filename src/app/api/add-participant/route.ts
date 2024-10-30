import { UserDetails } from "@/components/participant-form/user-client-form";
import * as fs from "fs";
import { NextResponse } from "next/server";
import * as path from "path";
import * as XLSX from "xlsx";

export async function POST(request: any) {
  const incomingRequest = await request.json();
  const participantData: UserDetails = incomingRequest.data;
  const filePath = path.resolve("database", "gamp-fitness.xlsx");

  try {
    if (!fs.existsSync(filePath)) {
      return NextResponse.json(
        { error: "Workbook not found." },
        { status: 404 }
      );
    }
    console.log("in api route", participantData);

    const fileBuffer = fs.readFileSync(filePath);
    const workbook = XLSX.read(fileBuffer, { type: "buffer" });
    const sheet = workbook.Sheets["Participants"];

    if (!sheet) {
      return NextResponse.json(
        { error: "Sheet 'Participants' not found in workbook." },
        { status: 404 }
      );
    }

    const data: UserDetails[] = XLSX.utils.sheet_to_json(sheet);

    console.log("converted data", data);
    const exists = data.some(
      (p: UserDetails) => p.participantId === participantData.participantId
    );

    if (!exists) {
      console.log("participant not found, adding new participant");
      data.push(participantData);
      console.log("after adding", data);
      const newSheet = XLSX.utils.json_to_sheet(data);
      workbook.Sheets["Participants"] = newSheet;
      const updatedWorkbookBuffer = XLSX.write(workbook, {
        bookType: "xlsx",
        type: "buffer",
      });
      fs.writeFileSync(filePath, updatedWorkbookBuffer);

      return NextResponse.json({
        message: "Participant added successfully",
      });
    } else {
      return NextResponse.json({
        message: "Participant already exists",
      });
    }
  } catch (error) {
    return NextResponse.json(
      { error: "Error adding participant", errorMessage: error },
      { status: 500 }
    );
  }
}
