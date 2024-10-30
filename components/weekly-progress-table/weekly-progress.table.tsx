import { WeeklyUserProgressHeaders } from "@/lib/utils";
import { UserWeekDetails } from "../participant-form/week-client-form";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

async function WeeklyProgressTable({
  weeklyUserProgress,
}: {
  weeklyUserProgress: UserWeekDetails[];
}) {
  return (
    <Table className="px-3 xxs:px-6 ">
      <TableCaption>Weekly progress.</TableCaption>
      <TableHeader>
        <TableRow>
          {WeeklyUserProgressHeaders.map((header: string) => (
            <TableHead key={header} className="capitalize whitespace-nowrap">
              {header}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {weeklyUserProgress &&
          weeklyUserProgress.map(
            (participant: UserWeekDetails, index: number) => (
              <TableRow key={index}>
                <TableCell className="w-full whitespace-nowrap">
                  {participant?.participantName}
                </TableCell>
                <TableCell className="w-full whitespace-nowrap">
                  {`${participant?.week}`}
                </TableCell>
                <TableCell className="w-full">
                  {participant?.workoutConsistency}
                </TableCell>
                <TableCell className="w-full">
                  {participant.caloriesBurned}
                </TableCell>
                <TableCell className="w-full">
                  {participant.sessionParticipation}
                </TableCell>
                <TableCell>{participant.weightLossPercentage}</TableCell>
                <TableCell>{participant.muscleGainPercentage}</TableCell>
                <TableCell>{participant.improvementConsistency}</TableCell>
              </TableRow>
            )
          )}
      </TableBody>
    </Table>
  );
}

export default WeeklyProgressTable;
