import * as fs from "fs";
import * as path from "path";
import * as XLSX from "xlsx";
import { NextResponse } from "next/server";

export async function POST() {
  const filePath = path.resolve("database", "gamp-fitness.xlsx");
  const leaderboard = [];
  const participantScores: any = {};

  try {
    const fileBuffer = fs.readFileSync(filePath);
    const workbook = XLSX.read(fileBuffer, { type: "buffer" });
    const weeklyData = XLSX.utils.sheet_to_json(
      workbook.Sheets["WeeklyProgress"]
    );

    weeklyData.forEach((entry: any) => {
      const {
        "Participant ID": participantId,
        "Workout Consistency": workout,
        "Calories Burned / Steps Taken": caloriesOrSteps,
        "Session Participation": sessions,
        "Weight Loss (%)": weightLoss,
        "Muscle Gain (%)": muscleGain,
        "Improvement Consistency": consistency,
      } = entry;

      if (!participantScores[participantId]) {
        participantScores[participantId] = {
          participantId,
          fitnessScore: 0,
          weightMuscleScore: 0,
          totalScore: 0,
        };
      }

      let fitnessScore = 0;
      let weightMuscleScore = 0;

      // Scoring Logic
      fitnessScore += Math.min(25, (workout / 5) * 25);
      fitnessScore += Math.min(15, (caloriesOrSteps / 10000) * 15);
      fitnessScore += Math.min(10, (sessions / 2) * 10);
      weightMuscleScore += Math.min(30, ((weightLoss + muscleGain) / 10) * 30);
      weightMuscleScore += Math.min(20, (consistency / 12) * 20);

      participantScores[participantId].fitnessScore += fitnessScore;
      participantScores[participantId].weightMuscleScore += weightMuscleScore;
      participantScores[participantId].totalScore =
        participantScores[participantId].fitnessScore +
        participantScores[participantId].weightMuscleScore;
    });

    // Format leaderboard
    for (const score of Object.values(participantScores) as any) {
      leaderboard.push({
        "Participant ID": score.participantId,
        "Fitness Performance Score": score.fitnessScore,
        "Weight/Muscle Score": score.weightMuscleScore,
        "Total Score": score.totalScore,
      });
    }

    const leaderboardSheet = XLSX.utils.json_to_sheet(leaderboard);
    workbook.Sheets["Leaderboard"] = leaderboardSheet;
    XLSX.writeFile(workbook, filePath);
    return NextResponse.json({ message: "Score updated" });
  } catch (error) {
    return NextResponse.json(
      { error: "Error updating score" },
      { status: 500 }
    );
  }
}
