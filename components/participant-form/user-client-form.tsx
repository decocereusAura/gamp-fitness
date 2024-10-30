"use client";
import { addParticipantRow } from "@/lib/action";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import Text from "../ui/text";

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
      console.log("response in client", response?.message);
      if (response?.message.includes("successfully")) {
        toast("Participant added successfully.", {
          description: `${timeAdded.toDateString()}`,
          action: {
            label: "Yay",
            onClick: () => console.log("yay"),
          },
        });
      }
      if (response?.message.includes("exists")) {
        toast("It seems you already added this participant.", {
          description: `${timeAdded.toDateString()}`,
          action: {
            label: "Thanks",
            onClick: () => console.log("yay"),
          },
        });
      }
    } catch (error: any) {
      console.error("Failed to add participant", error);
      toast("Failed to add participant.", {
        description: `${error} at ${timeAdded.toDateString()}`,
        action: {
          label: "Okay",
          onClick: () => console.log("yay"),
        },
      });
    } finally {
      router.refresh();
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-y-6 w-full px-3 xxs:px-6"
    >
      <Text
        as="h2"
        intent={"largePageHeadline"}
        className="w-full"
        align={"left"}
      >
        Participant Information
      </Text>
      <div className="flex flex-col items-start gap-y-2 w-full">
        <Input
          type="text"
          placeholder="Name*"
          name="name"
          value={userDetails.name}
          onChange={handleChange}
          required
        />
        {errors.name && (
          <Text intent={"info"} color={"secondaryRed"}>
            {errors.name}
          </Text>
        )}
      </div>
      <div className="flex items-center gap-x-3">
        <div className="flex flex-col items-start gap-y-2 w-full">
          <Input
            type="number"
            placeholder="Height in cm*"
            name="height"
            value={userDetails.height}
            onChange={handleChange}
            required
          />
          {errors.height && (
            <Text intent={"info"} color={"secondaryRed"}>
              {errors.height}
            </Text>
          )}
        </div>
        <div className="flex flex-col items-start gap-y-2 w-full">
          <Input
            type="number"
            placeholder="Weight in kg*"
            name="weight"
            value={userDetails.weight}
            onChange={handleChange}
            required
          />
          {errors.weight && (
            <Text intent={"info"} color={"secondaryRed"}>
              {errors.weight}
            </Text>
          )}
        </div>
      </div>
      <div className="flex items-center gap-x-3">
        <div className="flex flex-col items-start gap-y-2 w-full">
          <Input
            type="number"
            placeholder="BMI*"
            name="bmi"
            value={userDetails.bmi}
            onChange={handleChange}
            required
          />
          {errors.bmi && (
            <Text intent={"info"} color={"secondaryRed"}>
              {errors.bmi}
            </Text>
          )}
        </div>
        <div className="flex flex-col items-start gap-y-2 w-full">
          <Input
            type="text"
            placeholder="BMI Proof URL*"
            name="bmiProofUrl"
            value={userDetails.bmiProofUrl}
            onChange={handleChange}
            required
          />
          {errors.bmi && (
            <Text intent={"info"} color={"secondaryRed"}>
              {errors.bmi}
            </Text>
          )}
        </div>
      </div>
      <div className="flex items-center gap-x-3">
        <div className="flex flex-col items-start gap-y-2 w-full">
          <Input
            type="number"
            placeholder="Ideal BMI*"
            name="idealBmi"
            value={userDetails.idealBmi}
            onChange={handleChange}
            required
          />
          {errors.idealBmi && (
            <Text intent={"info"} color={"secondaryRed"}>
              {errors.idealBmi}
            </Text>
          )}
        </div>
        <div className="flex flex-col items-start gap-y-2 w-full">
          <Input
            type="number"
            placeholder="Target Weight*"
            name="targetWeight"
            value={userDetails.targetWeight}
            onChange={handleChange}
            required
          />
          {errors.targetWeight && (
            <Text intent={"info"} color={"secondaryRed"}>
              {errors.targetWeight}
            </Text>
          )}
        </div>
      </div>
      <div className="flex items-center gap-x-3">
        <Input
          type="number"
          placeholder="Targeted Muscle Gain (%)"
          name="targetedMuscleGain"
          value={userDetails.targetedMuscleGain}
          onChange={handleChange}
        />
        <Input
          type="text"
          placeholder="Current Body Mass Report URL"
          name="currentBodyMassReportUrl"
          value={userDetails.currentBodyMassReportUrl}
          onChange={handleChange}
        />
      </div>
      <div className="flex w-full items-center justify-center">
        <Button type="submit" className="w-1/2">
          Submit
        </Button>
      </div>
    </form>
  );
};

export default ParticipantClientForm;
