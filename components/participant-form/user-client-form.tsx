"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { addParticipantRow } from "@/lib/action";
import {
  Activity,
  Dumbbell,
  FileText,
  Link,
  Ruler,
  Target,
  User,
  Weight,
} from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";

export interface UserDetails {
  participantId: string;
  name: string;
  height: string;
  weight: string;
  bmi: string;
  bmiProofUrl: string;
  idealBmi: string;
  targetWeight: string;
  targetedMuscleGain: string;
  currentBodyMassReportUrl: string;
}

const ParticipantClientForm = () => {
  const router = useRouter();
  const [userDetails, setUserDetails] = useState<UserDetails>({
    participantId: uuidv4(),
    name: "",
    height: "",
    weight: "",
    bmi: "",
    bmiProofUrl: "",
    idealBmi: "",
    targetWeight: "",
    targetedMuscleGain: "",
    currentBodyMassReportUrl: "",
  });

  const [errors, setErrors] = useState<Partial<UserDetails>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
    if (value.trim() === "") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: "This field is required.",
      }));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let formIsValid = true;
    const newErrors: Partial<UserDetails> = {};
    (Object.keys(userDetails) as Array<keyof UserDetails>).forEach((key) => {
      if (
        [
          "name",
          "height",
          "weight",
          "bmi",
          "idealBmi",
          "bmiProofUrl",
          "targetWeight",
        ].includes(key) &&
        userDetails[key].trim() === ""
      ) {
        formIsValid = false;
        newErrors[key] = "This field is required.";
      }
    });

    setErrors(newErrors);

    if (formIsValid) {
      handleAddData(userDetails);
    }
  };

  const handleAddData = async (participantDetails: UserDetails) => {
    const timeAdded = new Date();
    try {
      const response = await addParticipantRow(participantDetails);
      if (response?.message.includes("successfully")) {
        toast("Participant added successfully", {
          description: `${participantDetails.name} has been added to the challenge.`,
          action: {
            label: "View Participants",
            onClick: () => router.push("/participants"),
          },
        });
      }
      if (response?.message.includes("exists")) {
        toast("Participant already exists", {
          description: `${participantDetails.name} is already registered for the challenge.`,
          action: {
            label: "Okay",
            onClick: () => console.log("Acknowledged"),
          },
        });
      }
    } catch (error: any) {
      console.error("Failed to add participant", error);
      toast("Failed to add participant", {
        description: `An error occurred while adding ${participantDetails.name}. Please try again.`,
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
          Add New Participant
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <Input
                id="name"
                type="text"
                placeholder="Full Name"
                name="name"
                value={userDetails.name}
                onChange={handleChange}
                className="pl-10"
                required
              />
            </div>
            {errors.name && (
              <p className="text-sm text-destructive">{errors.name}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="height">Height (cm)</Label>
              <div className="relative">
                <Ruler className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="height"
                  type="number"
                  placeholder="Height in cm"
                  name="height"
                  value={userDetails.height}
                  onChange={handleChange}
                  className="pl-10"
                  required
                />
              </div>
              {errors.height && (
                <p className="text-sm text-destructive">{errors.height}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="weight">Weight (kg)</Label>
              <div className="relative">
                <Weight className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="weight"
                  type="number"
                  placeholder="Weight in kg"
                  name="weight"
                  value={userDetails.weight}
                  onChange={handleChange}
                  className="pl-10"
                  required
                />
              </div>
              {errors.weight && (
                <p className="text-sm text-destructive">{errors.weight}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="bmi">Current BMI</Label>
              <div className="relative">
                <Activity className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="bmi"
                  type="number"
                  placeholder="Current BMI"
                  name="bmi"
                  value={userDetails.bmi}
                  onChange={handleChange}
                  className="pl-10"
                  required
                />
              </div>
              {errors.bmi && (
                <p className="text-sm text-destructive">{errors.bmi}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="bmiProofUrl">BMI Proof URL</Label>
              <div className="relative">
                <Link className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="bmiProofUrl"
                  type="text"
                  placeholder="BMI Proof URL"
                  name="bmiProofUrl"
                  value={userDetails.bmiProofUrl}
                  onChange={handleChange}
                  className="pl-10"
                  required
                />
              </div>
              {errors.bmiProofUrl && (
                <p className="text-sm text-destructive">{errors.bmiProofUrl}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="idealBmi">Ideal BMI</Label>
              <div className="relative">
                <Target className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="idealBmi"
                  type="number"
                  placeholder="Ideal BMI"
                  name="idealBmi"
                  value={userDetails.idealBmi}
                  onChange={handleChange}
                  className="pl-10"
                  required
                />
              </div>
              {errors.idealBmi && (
                <p className="text-sm text-destructive">{errors.idealBmi}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="targetWeight">Target Weight (kg)</Label>
              <div className="relative">
                <Target className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="targetWeight"
                  type="number"
                  placeholder="Target Weight"
                  name="targetWeight"
                  value={userDetails.targetWeight}
                  onChange={handleChange}
                  className="pl-10"
                  required
                />
              </div>
              {errors.targetWeight && (
                <p className="text-sm text-destructive">
                  {errors.targetWeight}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="targetedMuscleGain">
                Targeted Muscle Gain (%)
              </Label>
              <div className="relative">
                <Dumbbell className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="targetedMuscleGain"
                  type="number"
                  placeholder="Targeted Muscle Gain"
                  name="targetedMuscleGain"
                  value={userDetails.targetedMuscleGain}
                  onChange={handleChange}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="currentBodyMassReportUrl">
                Current Body Mass Report URL
              </Label>
              <div className="relative">
                <FileText className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="currentBodyMassReportUrl"
                  type="text"
                  placeholder="Body Mass Report URL"
                  name="currentBodyMassReportUrl"
                  value={userDetails.currentBodyMassReportUrl}
                  onChange={handleChange}
                  className="pl-10"
                />
              </div>
            </div>
          </div>

          <Button type="submit" className="w-full">
            Add Participant
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ParticipantClientForm;
