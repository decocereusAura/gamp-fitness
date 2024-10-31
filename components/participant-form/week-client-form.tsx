"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { addWeeklyData } from "@/lib/action";
import { transformToSnake } from "@/lib/utils";
import {
  Calendar,
  Dna,
  Dumbbell,
  Flame,
  Scale,
  TrendingUp,
  Trophy,
  Users,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export interface UserWeekDetails {
  participantId: string;
  participantName: string;
  week?: number;
  workoutConsistency: number;
  caloriesBurned?: number;
  sessionParticipation: number;
  weightLossPercentage?: number;
  muscleGainPercentage?: number;
  improvementConsistency: number;
}

interface UserWeekDetailsErrors {
  participantId?: string;
  participantName?: string;
  week?: string;
  workoutConsistency: string;
  caloriesBurned?: string;
  sessionParticipation: string;
  weightLossPercentage?: string;
  muscleGainPercentage?: string;
  improvementConsistency: string;
}

interface WeekClientFormProps {
  participantId: string;
  participantName: string;
}

const WeekClientForm = ({
  participantId,
  participantName,
}: WeekClientFormProps) => {
  const router = useRouter();
  const [userWeekDetails, setUserWeekDetails] = useState<UserWeekDetails>({
    participantId: participantId,
    participantName: participantName,
    week: undefined,
    workoutConsistency: 0,
    caloriesBurned: undefined,
    sessionParticipation: 0,
    weightLossPercentage: undefined,
    muscleGainPercentage: undefined,
    improvementConsistency: 0,
  });

  const [errors, setErrors] = useState<Partial<UserWeekDetailsErrors>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setUserWeekDetails((prevDetails) => ({
      ...prevDetails,
      [name]: parseFloat(value),
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: value.trim() === "" ? "This field is required." : "",
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let formIsValid = true;
    const newErrors: Partial<UserWeekDetailsErrors> = {};

    (Object.keys(userWeekDetails) as Array<keyof UserWeekDetails>).forEach(
      (key) => {
        if (
          [
            "week",
            "caloriesBurned",
            "weightLossPercentage",
            "muscleGainPercentage",
          ].includes(key) &&
          !userWeekDetails[key]
        ) {
          formIsValid = false;
          newErrors[key] = "This field is required.";
        }
      }
    );

    setErrors(newErrors);

    if (formIsValid) {
      handleWeeklyUpdate(userWeekDetails);
    }
  };

  const handleWeeklyUpdate = async (data: UserWeekDetails) => {
    const timeAdded = new Date();
    try {
      const response = await addWeeklyData(transformToSnake(data));
      if (response?.message.includes("exists")) {
        toast(
          `Week ${userWeekDetails?.week} data already exists for ${participantName}`,
          {
            description: "Please select a different week to update progress.",
            action: {
              label: "Okay",
              onClick: () => console.log("Acknowledged"),
            },
          }
        );
      }
      if (response?.message.includes("updated")) {
        toast(`Progress updated successfully`, {
          description: `${participantName}'s data for week ${userWeekDetails?.week} has been updated.`,
          action: {
            label: "View Progress",
            onClick: () => router.push(`/weekly-progress/${participantId}`),
          },
        });
      }
    } catch (error: any) {
      console.error(error);
      toast(`Error updating progress`, {
        description: `An error occurred while updating week ${userWeekDetails?.week}. Please try again.`,
        action: {
          label: "Dismiss",
          onClick: () => console.log("Error dismissed"),
        },
      });
    } finally {
      router.refresh();
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">
          Weekly Progress Update
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="week">Week</Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="week"
                  type="number"
                  placeholder="Week number"
                  name="week"
                  value={userWeekDetails.week}
                  onChange={handleChange}
                  className="pl-10"
                  required
                />
              </div>
              {errors.week && (
                <p className="text-sm text-destructive">{errors.week}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="caloriesBurned">Calories Burned / Steps</Label>
              <div className="relative">
                <Flame className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="caloriesBurned"
                  type="number"
                  placeholder="Max: 10,000 steps/2,000 calories"
                  name="caloriesBurned"
                  value={userWeekDetails.caloriesBurned}
                  onChange={handleChange}
                  className="pl-10"
                  required
                />
              </div>
              {errors.caloriesBurned && (
                <p className="text-sm text-destructive">
                  {errors.caloriesBurned}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label>Workout Consistency (0-5)</Label>
            <div className="flex items-center space-x-2">
              <Dumbbell className="text-muted-foreground" />
              <Slider
                max={5}
                step={1}
                value={[userWeekDetails.workoutConsistency]}
                onValueChange={(value) =>
                  setUserWeekDetails((prev) => ({
                    ...prev,
                    workoutConsistency: value[0],
                  }))
                }
                className="flex-1"
              />
              <span className="w-8 text-center">
                {userWeekDetails.workoutConsistency}
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Session Participation (0-2)</Label>
            <div className="flex items-center space-x-2">
              <Users className="text-muted-foreground" />
              <Slider
                max={2}
                step={1}
                value={[userWeekDetails.sessionParticipation]}
                onValueChange={(value) =>
                  setUserWeekDetails((prev) => ({
                    ...prev,
                    sessionParticipation: value[0],
                  }))
                }
                className="flex-1"
              />
              <span className="w-8 text-center">
                {userWeekDetails.sessionParticipation}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="weightLossPercentage">Weight Loss (%)</Label>
              <div className="relative">
                <Scale className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="weightLossPercentage"
                  type="number"
                  placeholder="Enter weight loss percentage"
                  name="weightLossPercentage"
                  value={userWeekDetails.weightLossPercentage}
                  step="0.1"
                  onChange={handleChange}
                  className="pl-10"
                  required
                />
              </div>
              {errors.weightLossPercentage && (
                <p className="text-sm text-destructive">
                  {errors.weightLossPercentage}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="muscleGainPercentage">Muscle Gain (%)</Label>
              <div className="relative">
                <Trophy className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="muscleGainPercentage"
                  type="number"
                  placeholder="Enter muscle gain percentage"
                  name="muscleGainPercentage"
                  value={userWeekDetails.muscleGainPercentage}
                  step="0.1"
                  onChange={handleChange}
                  className="pl-10"
                  required
                />
              </div>
              {errors.muscleGainPercentage && (
                <p className="text-sm text-destructive">
                  {errors.muscleGainPercentage}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label>Improvement Consistency (Weekly Tracking Effort)</Label>
            <div className="flex items-center space-x-2">
              <TrendingUp className="text-muted-foreground" />
              <Slider
                max={12}
                step={1}
                value={[userWeekDetails.improvementConsistency]}
                onValueChange={(value) =>
                  setUserWeekDetails((prev) => ({
                    ...prev,
                    improvementConsistency: value[0],
                  }))
                }
                className="flex-1"
              />
              <span className="w-8 text-center">
                {userWeekDetails.improvementConsistency}
              </span>
            </div>
          </div>

          <Button type="submit" className="w-full">
            <Dna className="mr-2 h-4 w-4" />
            Update Progress
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default WeekClientForm;
