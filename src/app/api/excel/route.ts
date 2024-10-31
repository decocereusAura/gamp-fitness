import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const sheetName = request.nextUrl.searchParams.get("sheet") || "Participants";
  let query = "";
  switch (sheetName) {
    case "Participants":
      query = `
        SELECT participant_id, participant_name, height, weight, bmi, 
               bmi_proof_url, ideal_bmi, target_weight, targeted_muscle_gain, 
               current_body_mass_report_url, created_at, updated_at
        FROM participants;
      `;
      break;
    case "WeeklyProgress":
      query = `
        SELECT id, participant_id, participant_name, week, workout_consistency, 
               calories_burned, session_participation, weight_loss_percentage, 
               muscle_gain_percentage, improvement_consistency, created_at, updated_at
        FROM weekly_progress;
      `;
      break;
    case "Leaderboard":
      query = `
        SELECT participant_id, participant_name, fitness_score, 
               weight_muscle_score, total_score, created_at, updated_at
        FROM leaderboard;
      `;
      break;
    default:
      return NextResponse.json(
        {
          error: "Sheet not found",
          availableSheets: ["participants", "weekly_progress", "leaderboard"],
        },
        { status: 404 }
      );
  }

  try {
    const result = await db.query(query);
    const data = result.rows;

    return NextResponse.json({
      data,
      sheetName,
      totalRows: data.length,
      availableSheets: ["Participants", "WeeklyProgress", "Leaderboard"],
    });
  } catch (error: any) {
    console.error("Database query error:", error);
    return NextResponse.json(
      {
        error: "Error querying database",
        details: error.message,
      },
      { status: 500 }
    );
  }
}
