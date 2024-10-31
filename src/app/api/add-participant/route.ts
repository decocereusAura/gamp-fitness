import { db } from "@/lib/db";
import { NextResponse } from "next/server";

interface UserDetails {
  participant_id: string;
  participant_name: string;
  height: number;
  weight: number;
  bmi: number;
  bmi_proof_url: string;
  ideal_bmi: number;
  target_weight: number;
  targeted_muscle_gain: number;
  current_body_mass_report_url: string;
}

export async function POST(request: Request) {
  try {
    const incomingRequest = await request.json();
    const participantData: UserDetails = incomingRequest.data;

    console.log("incoming data", participantData);

    // Check if participant exists with UUID casting
    const existingParticipant = await db.query(
      "SELECT participant_id FROM participants WHERE participant_id = $1::uuid",
      [participantData.participant_id]
    );

    if (existingParticipant.rows.length > 0) {
      return NextResponse.json(
        {
          message: "Participant already exists",
        },
        { status: 400 }
      );
    }

    // Insert new participant with UUID casting
    const result = await db.query(
      `INSERT INTO Participants (
        participant_id,
        participant_name,
        height,
        weight,
        bmi,
        bmi_proof_url,
        ideal_bmi,
        target_weight,
        targeted_muscle_gain,
        current_body_mass_report_url
      ) VALUES ($1::uuid, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      RETURNING *`,
      [
        participantData.participant_id,
        participantData.participant_name,
        participantData.height,
        participantData.weight,
        participantData.bmi,
        participantData.bmi_proof_url,
        participantData.ideal_bmi,
        participantData.target_weight,
        participantData.targeted_muscle_gain,
        participantData.current_body_mass_report_url,
      ]
    );

    await db.query(
      `INSERT INTO Leaderboard (
        participant_id,
        participant_name
      ) VALUES ($1::uuid, $2)`,
      [participantData.participant_id, participantData.participant_name]
    );

    return NextResponse.json({
      message: "Participant added successfully",
      participant: result.rows[0],
    });
  } catch (error) {
    console.error("Error adding participant:", error);
    return NextResponse.json(
      {
        error: "Error adding participant",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const result = await db.query(
      "SELECT * FROM Participants ORDER BY participant_name"
    );
    return NextResponse.json(result.rows);
  } catch (error) {
    console.error("Error fetching participants:", error);
    return NextResponse.json(
      {
        error: "Error fetching participants",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
