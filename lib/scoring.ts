import { UserWeekDetails } from "@/components/participant-form/week-client-form";

export const calculateScore = (weeklyData: UserWeekDetails[]) => {
  const WEEKLY_BREAKDOWN: Record<number, { week: number; score: number }> = {
    1: { week: 1, score: 0 },
    2: { week: 2, score: 0 },
    3: { week: 3, score: 0 },
    4: { week: 4, score: 0 },
    5: { week: 5, score: 0 },
    6: { week: 6, score: 0 },
    7: { week: 7, score: 0 },
    8: { week: 8, score: 0 },
    9: { week: 9, score: 0 },
    10: { week: 10, score: 0 },
    11: { week: 11, score: 0 },
    12: { week: 12, score: 0 },
  };
  weeklyData.forEach((entry: any) => {
    const {
      week,
      workoutConsistency,
      caloriesBurned,
      sessionParticipation,
      weightLossPercentage,
      muscleGainPercentage,
      improvementConsistency,
    } = entry;

    let fitnessScore = 0;
    let weightMuscleScore = 0;
    let finalScore = 0;

    // Scoring Logic
    fitnessScore += Math.min(25, (workoutConsistency / 5) * 25);
    fitnessScore += Math.min(15, (caloriesBurned / 10000) * 15);
    fitnessScore += Math.min(10, (sessionParticipation / 2) * 10);
    weightMuscleScore += Math.min(
      30,
      ((weightLossPercentage + muscleGainPercentage) / 10) * 30
    );
    weightMuscleScore += Math.min(20, (improvementConsistency / 12) * 20);
    finalScore = fitnessScore + weightMuscleScore;
    WEEKLY_BREAKDOWN[week] = { week: week, score: finalScore };
  });
  return Object.values(WEEKLY_BREAKDOWN);
};
