"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Dumbbell, Flame, Heart, LineChart, Trophy, Users } from "lucide-react";

export function FitnessChallengeDashboardComponent() {
  const categories = [
    {
      name: "Workout Consistency",
      description:
        "Number of weekly workout sessions (3-4/week target for full points)",
      fitnessPoints: 25,
      weightLossPoints: 0,
      icon: <Dumbbell className="h-6 w-6 text-blue-500" />,
    },
    {
      name: "Calories Burned/Steps",
      description:
        "Calories burned or steps taken per day (10,000+ steps or 500+ calories for full points)",
      fitnessPoints: 15,
      weightLossPoints: 0,
      icon: <Flame className="h-6 w-6 text-orange-500" />,
    },
    {
      name: "Fitness Session Participation",
      description:
        "Participation in virtual/company fitness sessions (attend 80%+ for full points)",
      fitnessPoints: 10,
      weightLossPoints: 0,
      icon: <Users className="h-6 w-6 text-green-500" />,
    },
    {
      name: "Weight Loss",
      description:
        "Percentage of body weight lost (10%+ body weight lost or reaching target BMI)",
      fitnessPoints: 0,
      weightLossPoints: 30,
      icon: <LineChart className="h-6 w-6 text-red-500" />,
    },
    {
      name: "Muscle Gain",
      description:
        "Percentage of lean muscle mass gained (based on body scans or fitness apps, gain 10%+ lean muscle)",
      fitnessPoints: 0,
      weightLossPoints: 30,
      icon: <Trophy className="h-6 w-6 text-purple-500" />,
    },
    {
      name: "Improvement Consistency",
      description:
        "Weekly tracking of weight/muscle mass and showing improvement over time",
      fitnessPoints: 0,
      weightLossPoints: 20,
      icon: <Heart className="h-6 w-6 text-pink-500" />,
    },
  ];

  return (
    <Card className="max-w-4xl w-full  mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          GAMP Fitness Challenge Dashboard
        </CardTitle>
        <CardDescription className="text-center">
          Track your progress and earn points in various fitness categories
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {categories.map((category, index) => (
            <div
              key={index}
              className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center"
            >
              <div className="flex items-center space-x-2">
                {category.icon}
                <h3 className="font-semibold">{category.name}</h3>
              </div>
              <p className="text-sm text-muted-foreground md:col-span-2">
                {category.description}
              </p>
              <div className="md:col-span-3 grid grid-cols-2 gap-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Fitness Points</span>
                    <span className="text-sm font-medium">
                      {category.fitnessPoints}
                    </span>
                  </div>
                  <Progress
                    value={category.fitnessPoints}
                    max={25}
                    className="h-2"
                  />
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">
                      Weight Loss/Muscle Gain Points
                    </span>
                    <span className="text-sm font-medium">
                      {category.weightLossPoints}
                    </span>
                  </div>
                  <Progress
                    value={category.weightLossPoints}
                    max={30}
                    className="h-2"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-8 space-y-4">
          <h3 className="font-semibold text-lg">HR Perspective</h3>
          <p className="text-sm text-muted-foreground">
            Our fitness challenge aims to encourage consistent workouts,
            motivate daily activity, engage employees in company-led fitness
            activities, help achieve personal weight goals, support muscle gain,
            and reward consistency in tracking progress.
          </p>
          <h3 className="font-semibold text-lg">Motivational Factors</h3>
          <ul className="list-disc list-inside text-sm text-muted-foreground space-y-2">
            <li>
              Post regular updates on individual progress to boost confidence
              and peer recognition
            </li>
            <li>
              Recognize top performers on Twitter and LinkedIn, increasing
              visibility
            </li>
            <li>
              Achieve the best version of themselves by following through with
              the fitness plan
            </li>
            <li>
              Exciting rewards from Apple for completing the challenge and
              reaching personal fitness milestones
            </li>
            <li>
              Weekly progress updates to build momentum and keep motivation high
            </li>
            <li>
              Foster a culture of fitness and well-being through continuous
              support and HR engagement
            </li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
