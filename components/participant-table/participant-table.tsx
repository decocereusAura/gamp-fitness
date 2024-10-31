import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { transformToCamelCase, UserDetailsHeaders } from "@/lib/utils";
import ExcelManager from "@/services/excel-manager";
import { ArrowUpRight, FileText, Ruler, Scale, Target } from "lucide-react";
import Link from "next/link";
import { UserDetails } from "../participant-form/user-client-form";

export default async function ParticipantTable() {
  const response = await ExcelManager.readSheet("Participants");
  const participantData: UserDetails[] = transformToCamelCase(response.data);
  console.log("participantData", transformToCamelCase(participantData));
  if (participantData.length < 1) return <></>;
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          Participant Details
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableCaption>
            List of participating Gampers in the fitness challenge.
          </TableCaption>
          <TableHeader>
            <TableRow>
              {UserDetailsHeaders.map((header: string) => (
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
            {participantData.map((participant: UserDetails, index: number) => (
              <TableRow
                key={index}
                className={index % 2 === 0 ? "bg-muted/50" : ""}
              >
                <TableCell className="font-medium">
                  {participant.participantName}
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <Ruler className="h-4 w-4 text-blue-500" />
                    <span>{participant.height}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <Scale className="h-4 w-4 text-green-500" />
                    <span>{participant.weight}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge
                    variant={
                      Number(participant.bmi) < 18.5 ||
                      Number(participant.bmi) > 24.9
                        ? "destructive"
                        : "default"
                    }
                  >
                    {Number(participant.bmi).toFixed(1)}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Link
                    href={String(participant.bmiProofUrl)}
                    target="_blank"
                    className="text-primary hover:underline flex items-center space-x-1"
                  >
                    <FileText className="h-4 w-4" />
                    <span>BMI Proof</span>
                    <ArrowUpRight className="h-3 w-3" />
                  </Link>
                </TableCell>
                <TableCell>
                  <Badge variant="outline">
                    {Number(participant.idealBmi).toFixed(1)}
                  </Badge>
                </TableCell>
                <TableCell>
                  {participant.targetWeight &&
                  participant.targetWeight?.length > 1 ? (
                    <div className="flex items-center space-x-2">
                      <Target className="h-4 w-4 text-orange-500" />
                      <span>{participant.targetWeight}</span>
                    </div>
                  ) : (
                    "-"
                  )}
                </TableCell>
                <TableCell>
                  {participant.targetedMuscleGain &&
                  participant.targetedMuscleGain?.length > 1 ? (
                    <div className="flex items-center space-x-2">
                      <Target className="h-4 w-4 text-purple-500" />
                      <span>{participant.targetedMuscleGain}</span>
                    </div>
                  ) : (
                    "-"
                  )}
                </TableCell>
                <TableCell>
                  {participant.currentBodyMassReportUrl &&
                  participant.currentBodyMassReportUrl?.length > 1 ? (
                    <Link
                      href={participant.currentBodyMassReportUrl}
                      target="_blank"
                      className="text-primary hover:underline flex items-center space-x-1"
                    >
                      <FileText className="h-4 w-4" />
                      <span>Body Mass Report</span>
                      <ArrowUpRight className="h-3 w-3" />
                    </Link>
                  ) : (
                    "-"
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <Link
                    href={`/weekly-progress/${participant.participantId}?name=${participant.participantName}`}
                  >
                    <Button size="sm">
                      View Progress
                      <ArrowUpRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
