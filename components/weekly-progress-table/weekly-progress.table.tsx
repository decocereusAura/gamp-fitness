import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { WeeklyUserProgressHeaders } from "@/lib/utils";
import { Dumbbell, Flame, Scale, Trophy, Users } from "lucide-react";
import { UserWeekDetails } from "../participant-form/week-client-form";

function WeeklyProgressTable({
  weeklyUserProgress,
}: {
  weeklyUserProgress: UserWeekDetails[];
}) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          Weekly Progress Report
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableCaption>
            Weekly progress of participants in the fitness challenge.
          </TableCaption>
          <TableHeader>
            <TableRow>
              {WeeklyUserProgressHeaders.map((header: string) => (
                <TableHead
                  key={header}
                  className="capitalize whitespace-nowrap font-semibold text-primary"
                >
                  {header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {weeklyUserProgress &&
              weeklyUserProgress.map(
                (participant: UserWeekDetails, index: number) => (
                  <TableRow
                    key={index}
                    className={index % 2 === 0 ? "bg-muted/50" : ""}
                  >
                    <TableCell className="font-medium">
                      {participant?.participantName}
                    </TableCell>
                    <TableCell className="text-center">{`Week ${participant?.week}`}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Dumbbell className="h-4 w-4 text-blue-500" />
                        <Progress
                          value={participant?.workoutConsistency * 25}
                          className="w-full"
                        />
                        <span className="text-sm font-medium">
                          {participant?.workoutConsistency}/4
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Flame className="h-4 w-4 text-orange-500" />
                        <span className="text-sm font-medium">
                          {participant.caloriesBurned}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Users className="h-4 w-4 text-green-500" />
                        <Progress
                          value={participant.sessionParticipation * 50}
                          className="w-full"
                        />
                        <span className="text-sm font-medium">
                          {participant.sessionParticipation}/2
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Scale className="h-4 w-4 text-red-500" />
                        <span className="text-sm font-medium">
                          {participant.weightLossPercentage}%
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Trophy className="h-4 w-4 text-purple-500" />
                        <span className="text-sm font-medium">
                          {participant.muscleGainPercentage}%
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Progress
                          value={participant.improvementConsistency * 5}
                          className="w-full"
                        />
                        <span className="text-sm font-medium">
                          {participant.sessionParticipation}/12
                        </span>
                      </div>
                    </TableCell>
                  </TableRow>
                )
              )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

export default WeeklyProgressTable;
