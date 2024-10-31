import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST() {
  const leaderboard: any[] = [];
  const participantScores: Record<string, any> = {};

  try {
    const weeklyData = await db.query(`
      SELECT 
        participant_id, participant_name, week, workout_consistency, 
calories_burned, session_participation, weight_loss_percentage, 
muscle_gain_percentage, improvement_consistency
      FROM weekly_progress;
    `);

    const participantsNames: Record<string, string> = {};

    weeklyData.rows.forEach((entry: any) => {
      const {
        participant_id,
        participant_name,
        workout_consistency,
        calories_burned,
        session_participation,
        weight_loss_percentage,
        muscle_gain_percentage,
        improvement_consistency,
      } = entry;

      if (!participantScores[participant_id]) {
        participantScores[participant_id] = {
          participant_id,
          fitness_score: 0,
          weight_muscle_score: 0,
          total_score: 0,
        };
      }

      let fitness_score = 0;
      let weight_muscle_score = 0;

      fitness_score += Math.min(25, (Number(workout_consistency) / 5) * 25);
      fitness_score += Math.min(15, (Number(calories_burned) / 10000) * 15);
      fitness_score += Math.min(10, (Number(session_participation) / 2) * 10);
      weight_muscle_score += Math.min(
        30,
        ((Number(weight_loss_percentage) + Number(muscle_gain_percentage)) /
          10) *
          30
      );
      weight_muscle_score += Math.min(
        20,
        (Number(improvement_consistency) / 12) * 20
      );

      participantScores[participant_id].fitness_score += fitness_score;
      participantScores[participant_id].weight_muscle_score +=
        weight_muscle_score;

      participantScores[participant_id].total_score =
        participantScores[participant_id].fitness_score +
        participantScores[participant_id].weight_muscle_score;

      participantsNames[participant_id] = participant_name;
      console.log("participantScores in route", participantScores);
    });

    for (const score of Object.values(participantScores) as any) {
      await db.query(
        `
        INSERT INTO Leaderboard (participant_id, participant_name, fitness_score, weight_muscle_score, total_score)
        VALUES ($1, $2, $3, $4, $5)
        ON CONFLICT (participant_id) DO UPDATE
        SET fitness_score = EXCLUDED.fitness_score,
            weight_muscle_score = EXCLUDED.weight_muscle_score,
            total_score = EXCLUDED.total_score;
      `,
        [
          score.participant_id,
          participantsNames[score.participant_id],
          score.fitness_score,
          score.weight_muscle_score,
          score.total_score,
        ]
      );
    }

    return NextResponse.json({ message: "Score updated successfully" });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Error updating score", details: error.message },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const leaderboardData = await db.query(`
      SELECT participant_id, participant_name, fitness_score, weight_muscle_score, total_score
      FROM Leaderboard;
    `);

    if (leaderboardData.rows.length > 0) {
      return NextResponse.json({
        data: leaderboardData.rows,
        message: `Scores for ${leaderboardData.rows.length} entries`,
      });
    }
    return NextResponse.json({
      message: `No scoring data available`,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Error fetching scores", details: error.message },
      { status: 500 }
    );
  }
}
