"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Dumbbell, Flame, Scale, Trophy, Users } from "lucide-react";

export function PointsSystemBreakdown() {
  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          Points System Breakdown
        </CardTitle>
        <CardDescription className="text-center">
          Each participant can earn a maximum of 100 points. 50 points from
          fitness activity, and 50 points from weight loss/muscle gain
          improvement.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="text-xl font-semibold mb-4">
            1. Fitness Performance (50 Points)
          </h3>
          <div className="space-y-6">
            <PointCategory
              icon={<Dumbbell className="h-6 w-6 text-blue-500" />}
              title="Workout Consistency"
              description="Track weekly exercise sessions using apps. Set a target of at least 3-4 workouts per week."
              maxPoints={25}
              breakdown={[
                { label: "4 workouts", points: 25 },
                { label: "3 workouts", points: 20 },
                { label: "2 workouts", points: 10 },
              ]}
            />
            <PointCategory
              icon={<Flame className="h-6 w-6 text-orange-500" />}
              title="Calories Burned/Steps Taken"
              description="Use the app to track calories burned from exercise or steps taken. Employees can set personalized goals based on their fitness level."
              maxPoints={15}
              breakdown={[
                {
                  label: "10,000+ steps or 500+ calories burned/day",
                  points: 15,
                },
                {
                  label: "7,500 - 10,000 steps or 350-500 calories",
                  points: 10,
                },
                { label: "5,000 - 7,500 steps or 200-350 calories", points: 5 },
              ]}
            />
            <PointCategory
              icon={<Users className="h-6 w-6 text-green-500" />}
              title="Participation in Fitness Sessions"
              description="Employees can earn extra points by joining yoga sessions."
              maxPoints={10}
              breakdown={[
                { label: "2 sessions per week", points: 10 },
                { label: "1 session per week", points: 5 },
              ]}
            />
          </div>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-4">
            2. Weight Loss/Muscle Gain (50 Points)
          </h3>
          <div className="space-y-6">
            <PointCategory
              icon={<Scale className="h-6 w-6 text-red-500" />}
              title="Weight Loss"
              description="Participants can earn points based on their weight loss progress."
              maxPoints={30}
              breakdown={[
                {
                  label: "Lose 10% of body weight or reach target BMI",
                  points: 30,
                },
                { label: "Lose 7-9%", points: 25 },
                { label: "Lose 5-6%", points: 20 },
                { label: "Lose 3-4%", points: 15 },
              ]}
            />
            <PointCategory
              icon={<Trophy className="h-6 w-6 text-purple-500" />}
              title="Muscle Gain"
              description="Participants can earn points based on their muscle gain progress."
              maxPoints={30}
              breakdown={[
                { label: "Gain 10% lean muscle mass", points: 30 },
                { label: "Gain 7-9%", points: 25 },
                { label: "Gain 5-6%", points: 20 },
                { label: "Gain 3-4%", points: 15 },
              ]}
            />
            <PointCategory
              icon={<Dumbbell className="h-6 w-6 text-blue-500" />}
              title="Improvement Consistency"
              description="Reward points based on weekly improvements or consistent tracking in the app."
              maxPoints={20}
              breakdown={[
                { label: "Weekly weight/muscle mass tracking", points: 20 },
                { label: "Missed 1 week", points: 15 },
                { label: "Missed 2+ weeks", points: 10 },
              ]}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function PointCategory({
  icon,
  title,
  description,
  maxPoints,
  breakdown,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  maxPoints: number;
  breakdown: { label: string; points: number }[];
}) {
  return (
    <div className="space-y-2">
      <div className="flex items-center space-x-2">
        {icon}
        <h4 className="font-semibold">{title}</h4>
      </div>
      <p className="text-sm text-muted-foreground">{description}</p>
      <div className="space-y-1">
        {breakdown.map((item, index) => (
          <div key={index} className="flex items-center justify-between">
            <span className="text-sm">{item.label}</span>
            <div className="flex items-center space-x-2">
              <Progress
                value={(item.points / maxPoints) * 100}
                className="w-24 h-2"
              />
              <span className="text-sm font-medium">{item.points} pts</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
