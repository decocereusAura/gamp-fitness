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
import { LeaderboardHeaders } from "@/lib/utils";
import { Dumbbell, Medal, Scale, Trophy } from "lucide-react";
import FetchScores from "./fetch-scores-button";

export interface UserScore {
  participantId: string;
  participantName: string;
  fitnessScore: number;
  weightMuscleScore: number;
  totalScore: number;
}

function Leaderboard({ userScores }: { userScores: UserScore[] }) {
  console.log("user", userScores);
  const sortedScores = [...userScores].sort(
    (a, b) => b.totalScore - a.totalScore
  );

  return (
    <Card className="w-full max-w-4xl">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          Fitness Challenge Leaderboard
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableCaption>
            Current standings in the fitness challenge
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">Rank</TableHead>
              {LeaderboardHeaders.map((header: string) => (
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
            {sortedScores.map((participant: UserScore, index: number) => (
              <TableRow
                key={participant.participantId}
                className={index % 2 === 0 ? "bg-muted/50" : ""}
              >
                <TableCell className="font-medium text-center">
                  {index < 3 ? (
                    <Medal
                      className={`h-6 w-6 mx-auto ${
                        index === 0
                          ? "text-yellow-500"
                          : index === 1
                          ? "text-gray-400"
                          : "text-amber-600"
                      }`}
                    />
                  ) : (
                    index + 1
                  )}
                </TableCell>
                <TableCell className="font-medium">
                  {participant.participantName}
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <Dumbbell className="h-4 w-4 text-blue-500" />
                    <Progress
                      value={(Number(participant.fitnessScore) / 50) * 100}
                      className="w-full"
                    />
                    <span className="text-sm font-medium">
                      {Number(participant.fitnessScore).toFixed(2)}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <Scale className="h-4 w-4 text-green-500" />
                    <Progress
                      value={(Number(participant.weightMuscleScore) / 50) * 100}
                      className="w-full"
                    />
                    <span className="text-sm font-medium">
                      {Number(participant.weightMuscleScore).toFixed(2)}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <Trophy className="h-4 w-4 text-purple-500" />
                    <Progress
                      value={Number(participant.totalScore)}
                      className="w-full"
                    />
                    <span className="text-sm font-medium">
                      {Number(participant.totalScore).toFixed(2)}
                    </span>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="mt-4 flex justify-center">
          <FetchScores />
        </div>
      </CardContent>
    </Card>
  );
}

export default Leaderboard;
