import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export interface SnakeUserWeekProgress {
  participant_id: string;
  participant_name: string;
  week?: number;
  workout_consistency: number;
  calories_burned?: number;
  session_participation: number;
  weight_loss_percentage?: number;
  muscle_gain_percentage?: number;
  improvement_consistency: number;
}

export async function POST(request: any) {
  const incoming_request = await request.json();
  const weekly_data: SnakeUserWeekProgress = incoming_request.data;

  try {
    const existing_entry = await db.query(
      `SELECT id FROM weekly_progress WHERE participant_id = $1 AND week = $2`,
      [weekly_data.participant_id, weekly_data.week]
    );

    if (existing_entry.rows.length > 0) {
      return NextResponse.json({
        message: "This week's data already exists for this participant",
      });
    }

    await db.query(
      `INSERT INTO weekly_progress (
        participant_id,
        participant_name,
        week,
        workout_consistency,
        calories_burned,
        session_participation,
        weight_loss_percentage,
        muscle_gain_percentage,
        improvement_consistency
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
      [
        weekly_data.participant_id,
        weekly_data.participant_name,
        weekly_data.week,
        weekly_data.workout_consistency,
        weekly_data.calories_burned,
        weekly_data.session_participation,
        weekly_data.weight_loss_percentage,
        weekly_data.muscle_gain_percentage,
        weekly_data.improvement_consistency,
      ]
    );

    return NextResponse.json({
      message: `Weekly progress updated for week ${weekly_data.week}`,
    });
  } catch (error) {
    console.error("Error updating weekly progress:", error);
    return NextResponse.json(
      { error: "Error updating weekly progress", error_message: error },
      { status: 500 }
    );
  }
}

export async function GET(request: any) {
  const participantId = request.nextUrl.searchParams.get("participantId");
  console.log("fetching participant", participantId);

  try {
    let result;

    if (participantId && participantId !== "all") {
      result = await db.query(
        `SELECT * FROM weekly_progress WHERE participant_id = $1`,
        [participantId]
      );
    } else {
      result = await db.query(`SELECT * FROM weekly_progress`);
    }

    const data = result.rows;

    if (data.length > 0) {
      const message =
        participantId && participantId !== "all"
          ? `Found ${data.length} entries for this participant`
          : "Weekly data for all participants";

      return NextResponse.json({
        data,
        message,
      });
    }

    return NextResponse.json({
      message: "There is no weekly progress data.",
    });
  } catch (error) {
    console.error("Error fetching weekly progress:", error);
    return NextResponse.json(
      { error: "Error fetching weekly progress", errorMessage: error },
      { status: 500 }
    );
  }
}
