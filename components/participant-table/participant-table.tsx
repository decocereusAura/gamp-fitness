import { UserDetailsHeaders } from "@/lib/utils";
import excelManager from "@/services/excel-manager";
import Link from "next/link";
import { UserDetails } from "../participant-form/user-client-form";
import { Button } from "../ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import Text from "../ui/text";

export default async function ParticipantTable() {
  const response = await excelManager.readSheet("Participants");
  const participantData: UserDetails[] = response.data;
  console.log("particip", participantData);
  return (
    <Table className="px-3 xxs:px-6">
      <TableCaption>Participating Gampers.</TableCaption>
      <TableHeader>
        <TableRow>
          {UserDetailsHeaders.map((header: string) => (
            <TableHead key={header} className="capitalize whitespace-nowrap">
              {header}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {participantData.map((participant: UserDetails, index: number) => (
          <TableRow key={index}>
            <TableCell className="w-full whitespace-nowrap">
              {participant?.name}
            </TableCell>
            <TableCell className="w-full">{participant?.height}</TableCell>
            <TableCell className="w-full">{participant.weight}</TableCell>
            <TableCell className="w-full">{participant.bmi}</TableCell>
            <TableCell className="w-full">
              <Link
                href={participant.bmiProofUrl}
                target="_blank"
                className="underline"
              >
                <Text>BMI Proof</Text>
              </Link>
            </TableCell>
            <TableCell>{participant.idealBmi}</TableCell>
            <TableCell>
              {participant.targetWeight && participant.targetWeight?.length > 1
                ? participant.targetWeight
                : "-"}
            </TableCell>
            <TableCell>
              {participant.targetedMuscleGain &&
              participant.targetedMuscleGain?.length > 1
                ? participant.targetedMuscleGain
                : "-"}
            </TableCell>
            <TableCell>
              {participant.currentBodyMassReportUrl &&
              participant.currentBodyMassReportUrl?.length > 1
                ? participant.currentBodyMassReportUrl
                : "-"}
            </TableCell>
            <TableCell className="w-full">
              <Link
                href={`/weekly-progress/${participant.participantId}?name=${participant.name}`}
                className="underline"
              >
                <Button>Take me there!</Button>
              </Link>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
