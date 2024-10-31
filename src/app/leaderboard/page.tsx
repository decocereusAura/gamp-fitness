import Leaderboard from "@/components/leaderboard-table/leaderboard-table";
import { PointsSystemBreakdown } from "@/components/leaderboard-table/points-system-breakdown";
import Text from "@/components/ui/text";
import ExcelManager from "@/services/excel-manager";
import { Swords } from "lucide-react";
export const revalidate = 360;
export default async function LeaderboardPage() {
  const userScores = await ExcelManager.fetchLeaderboard();
  const scores: any = userScores.data;
  console.log("leaderboard", scores);
  return (
    <main className="flex flex-col items-center  p-3 xxs:p-6 xs:px-24 xs:py-12 gap-y-6 min-h-screen h-full">
      <div className="flex items-center gap-x-3 justify-start w-full max-w-4xl">
        <Swords size={36} className="mr-1" />
        <Text
          intent={"largePageHeadline"}
          className={"w-full"}
          align={"left"}
          color={"virtualGreen"}
        >
          Leaderboard
        </Text>
      </div>
      <PointsSystemBreakdown />

      {scores && scores.length > 0 && <Leaderboard userScores={scores} />}
    </main>
  );
}
