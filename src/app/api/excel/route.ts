// app/api/excel/route.ts
import * as fs from "fs";
import * as path from "path";
import * as XLSX from "xlsx";
import { NextRequest, NextResponse } from "next/server";

// Helper function to get Excel file path
function getExcelPath() {
  return path.join(process.cwd(), "database", "gamp-fitness.xlsx");
}

export async function GET(request: NextRequest) {
  // Using NextRequest's searchParams instead of URL parsing
  const sheetName = request.nextUrl.searchParams.get("sheet") || "Participants";
  const filePath = getExcelPath();

  try {
    // Verify file exists
    if (!fs.existsSync(filePath)) {
      return NextResponse.json(
        { error: `Excel file not found at ${filePath}` },
        { status: 404 }
      );
    }

    const fileBuffer = fs.readFileSync(filePath);
    const workbook = XLSX.read(fileBuffer, { type: "buffer" });

    // Check if sheet exists
    if (!workbook.SheetNames.includes(sheetName)) {
      return NextResponse.json(
        {
          error: "Sheet not found",
          availableSheets: workbook.SheetNames,
        },
        { status: 404 }
      );
    }

    const sheet = workbook.Sheets[sheetName];
    const data = XLSX.utils.sheet_to_json(sheet);

    return NextResponse.json({
      data,
      sheetName,
      totalRows: data.length,
      availableSheets: workbook.SheetNames,
    });
  } catch (error: any) {
    console.error("Excel read error:", error);
    return NextResponse.json(
      {
        error: "Error reading Excel file",
        details: error.message,
        path: filePath,
      },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  const { data, destination } = await request.json();
  const filePath = getExcelPath();

  try {
    // Create directory if it doesn't exist
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    // Read existing workbook or create new one
    let workbook;
    if (fs.existsSync(filePath)) {
      const fileBuffer = fs.readFileSync(filePath);
      workbook = XLSX.read(fileBuffer, { type: "buffer" });
    } else {
      workbook = XLSX.utils.book_new();
    }

    // Create new worksheet from data
    const worksheet = XLSX.utils.json_to_sheet(data);

    // Remove existing sheet if it exists
    if (workbook.SheetNames.includes(destination)) {
      const index = workbook.SheetNames.indexOf(destination);
      workbook.SheetNames.splice(index, 1);
      delete workbook.Sheets[destination];
    }

    // Add new worksheet
    XLSX.utils.book_append_sheet(workbook, worksheet, destination);

    // Write the workbook
    XLSX.writeFile(workbook, filePath);

    return NextResponse.json({
      message: "Data saved successfully",
      sheetName: destination,
      rowCount: data.length,
      availableSheets: workbook.SheetNames,
    });
  } catch (error: any) {
    console.error("Excel write error:", error);
    return NextResponse.json(
      {
        error: "Error saving Excel file",
        details: error.message,
        path: filePath,
      },
      { status: 500 }
    );
  }
}

// Optional: Add a route to get all sheet names
export async function OPTIONS(request: Request) {
  const filePath = getExcelPath();

  try {
    if (!fs.existsSync(filePath)) {
      return NextResponse.json(
        { error: "Excel file not found" },
        { status: 404 }
      );
    }

    const fileBuffer = fs.readFileSync(filePath);
    const workbook = XLSX.read(fileBuffer, { type: "buffer" });

    return NextResponse.json({
      sheets: workbook.SheetNames,
      path: filePath,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        error: "Error reading Excel file",
        details: error.message,
      },
      { status: 500 }
    );
  }
}
