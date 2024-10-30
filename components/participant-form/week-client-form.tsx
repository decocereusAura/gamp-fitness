"use client";
import { addWeeklyData } from "@/lib/action";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Slider } from "../ui/slider";
import Text from "../ui/text";

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
      [name]: parseFloat(value), // Assuming numeric values for inputs
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
      const response = await addWeeklyData(data);
      console.log("response in form", response?.message);
      if (response?.message.includes("exists")) {
        toast(
          `Week ${userWeekDetails?.week} data already exists for this ${participantName}, please select a different week to update progress.`,
          {
            description: `${timeAdded.toDateString()}`,
            action: {
              label: "Okay",
              onClick: () => console.log("yay"),
            },
          }
        );
      }
      if (response?.message.includes("updated")) {
        toast(
          `Progress updated successfully for ${participantName} for week ${userWeekDetails?.week}`,
          {
            description: `${timeAdded.toDateString()}`,
            action: {
              label: "Yay",
              onClick: () => console.log("yay"),
            },
          }
        );
      }
    } catch (error: any) {
      console.error(error);
      toast(`It seems we ran into an error for week ${userWeekDetails?.week}`, {
        description: `${error} at ${timeAdded.toDateString()}`,
        action: {
          label: "Oh",
          onClick: () => console.log("yay"),
        },
      });
    } finally {
      router.refresh();
    }
  };

  return (
    <div className="w-full flex flex-col gap-y-6 border border-gray-400 rounded-md p-3 xs:p-6 bg-zinc-950">
      <Text
        as="h2"
        intent={"sectionHeadline"}
        className="w-full"
        align={"left"}
      >
        Add this weeks progress
      </Text>
      <form
        className="flex flex-col items-center gap-y-12 w-full"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col xxs:flex-row  gap-y-6 xxs:gap-x-6 items-center w-full xs:h-12">
          <div className="flex flex-col gap-y-3 items-start w-full h-full">
            <Text intent={"info"}>Week*</Text>
            <Input
              type="number"
              placeholder="Week number"
              name="week"
              value={userWeekDetails.week}
              onChange={handleChange}
              required
            />
            {errors.week && (
              <Text intent={"info"} color={"secondaryRed"}>
                {errors.week}
              </Text>
            )}
          </div>
          <div className="flex flex-col gap-y-3 items-start w-full h-full">
            <Text intent={"info"}>Calories Burned / Steps*</Text>
            <Input
              type="number"
              placeholder="Max: 10,000 steps/2,000 calories"
              name="caloriesBurned"
              value={userWeekDetails.caloriesBurned}
              onChange={handleChange}
              required
            />
            {errors.caloriesBurned && (
              <Text intent={"info"} color={"secondaryRed"}>
                {errors.caloriesBurned}
              </Text>
            )}
          </div>
        </div>
        <div className="flex flex-col xxs:flex-row  gap-y-6 xxs:gap-x-6 items-center w-full xs:h-12">
          <div className="flex flex-col gap-y-3 items-start w-full h-full">
            <Text intent={"info"}>Workout Consistency (0-5)</Text>
            <Slider
              defaultValue={[0]}
              max={5}
              step={1}
              value={[userWeekDetails.workoutConsistency || 0]}
              onValueChange={(value) =>
                setUserWeekDetails((prev) => ({
                  ...prev,
                  workoutConsistency: value[0],
                }))
              }
            />
            {userWeekDetails.workoutConsistency && (
              <Text intent={"info"}>{userWeekDetails.workoutConsistency}</Text>
            )}
          </div>
          <div className="flex flex-col gap-y-3 items-start w-full h-full">
            <Text intent={"info"}>Session Participation (0-2)</Text>
            <Slider
              max={2}
              step={1}
              value={[userWeekDetails.sessionParticipation || 0]}
              onValueChange={(value) =>
                setUserWeekDetails((prev) => ({
                  ...prev,
                  sessionParticipation: value[0],
                }))
              }
            />
            {userWeekDetails.sessionParticipation && (
              <Text intent={"info"}>
                {userWeekDetails.sessionParticipation}
              </Text>
            )}
          </div>
        </div>
        <div className="flex flex-col xxs:flex-row  gap-y-6 xxs:gap-x-6 items-center w-full xs:h-12">
          <div className="flex flex-col gap-y-3 items-start w-full h-full">
            <Text intent={"info"}>Weight Loss (%)*</Text>
            <Input
              type="number"
              placeholder="Enter weight loss percentage"
              name="weightLossPercentage"
              value={userWeekDetails.weightLossPercentage}
              step="0.1"
              onChange={handleChange}
              required
            />
            {errors.weightLossPercentage && (
              <Text intent={"info"} color={"secondaryRed"}>
                {errors.weightLossPercentage}
              </Text>
            )}
          </div>
          <div className="flex flex-col gap-y-3 items-start w-full h-full">
            <Text intent={"info"}>Muscle Gain (%)*</Text>
            <Input
              type="number"
              placeholder="Enter muscle gain percentage"
              name="muscleGainPercentage"
              value={userWeekDetails.muscleGainPercentage}
              step="0.1"
              onChange={handleChange}
              required
            />
            {errors.muscleGainPercentage && (
              <Text intent={"info"} color={"secondaryRed"}>
                {errors.muscleGainPercentage}
              </Text>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-y-3 items-start w-full">
          <Text intent={"info"}>
            Improvement Consistency (Weekly Tracking Effort)
          </Text>
          <Slider
            max={12}
            step={1}
            value={[userWeekDetails.improvementConsistency || 0]}
            onValueChange={(value) =>
              setUserWeekDetails((prev) => ({
                ...prev,
                improvementConsistency: value[0],
              }))
            }
          />
          {userWeekDetails.improvementConsistency && (
            <Text intent={"info"}>
              {userWeekDetails.improvementConsistency}
            </Text>
          )}
        </div>
        <div className="flex w-full items-center justify-center">
          <Button type="submit" className="w-1/2">
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};

export default WeekClientForm;
