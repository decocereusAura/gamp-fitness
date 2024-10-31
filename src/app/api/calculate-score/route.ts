import * as fs from "fs";
import { NextResponse } from "next/server";
import * as path from "path";
import * as XLSX from "xlsx";

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
    const participantsNames: Record<string, string> = {};

    weeklyData.forEach((entry: any) => {
      const {
        participantId,
        participantName,
        week,
        workoutConsistency,
        caloriesBurned,
        sessionParticipation,
        weightLossPercentage,
        muscleGainPercentage,
        improvementConsistency,
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
      fitnessScore += Math.min(25, (workoutConsistency / 5) * 25);
      fitnessScore += Math.min(15, (caloriesBurned / 10000) * 15);
      fitnessScore += Math.min(10, (sessionParticipation / 2) * 10);
      weightMuscleScore += Math.min(
        30,
        ((weightLossPercentage + muscleGainPercentage) / 10) * 30
      );
      weightMuscleScore += Math.min(20, (improvementConsistency / 12) * 20);

      participantScores[participantId].fitnessScore += fitnessScore;
      participantScores[participantId].weightMuscleScore += weightMuscleScore;
      participantScores[participantId].totalScore =
        participantScores[participantId].fitnessScore +
        participantScores[participantId].weightMuscleScore;

      participantsNames[participantId] = participantName;
    });

    // Format leaderboard
    for (const score of Object.values(participantScores) as any) {
      leaderboard.push({
        participantId: score.participantId,
        participantName: participantsNames[score.participantId],
        fitnessScore: score.fitnessScore,
        weightMuscleScore: score.weightMuscleScore,
        totalScore: score.totalScore,
      });
    }

    const leaderboardSheet = XLSX.utils.json_to_sheet(leaderboard);
    workbook.Sheets["Leaderboard"] = leaderboardSheet;
    const updatedWorkbookBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "buffer",
    });
    fs.writeFileSync(filePath, updatedWorkbookBuffer);
    return NextResponse.json({ message: "Score updated successfully" });
  } catch (error) {
    return NextResponse.json(
      { error: "Error updating score" },
      { status: 500 }
    );
  }
}

export async function GET() {
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
    const sheet = workbook.Sheets["Leaderboard"];
    if (!sheet) {
      return NextResponse.json(
        { error: "Sheet 'Leaderboard' not found in workbook." },
        { status: 404 }
      );
    }
    const data: any[] = XLSX.utils.sheet_to_json(sheet);
    if (data && data.length > 0) {
      return NextResponse.json({
        data: data,
        message: `Scores for ${data.length} entries`,
      });
    }
    return NextResponse.json({
      message: `No scoring data available`,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching scores", errorMessage: error },
      { status: 500 }
    );
  }
}
