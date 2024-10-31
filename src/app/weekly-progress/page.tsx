import { UserWeekDetails } from "@/components/participant-form/week-client-form";
import { Button } from "@/components/ui/button";
import Text from "@/components/ui/text";
import WeeklyProgressTable from "@/components/weekly-progress-table/weekly-progress.table";
import ExcelManager from "@/services/excel-manager";
import { LoaderPinwheel } from "lucide-react";
import Link from "next/link";

async function AllWeeklyDataPage() {
  const response = await ExcelManager.fetchWeeklyProgressData();
  const weeklyUserProgress: UserWeekDetails[] = response.data;
  console.log("all weekly progress", weeklyUserProgress);
  return (
    <main className="flex flex-col items-center p-3 xxs:p-6 xs:px-24 xs:py-12 min-h-screen h-full gap-y-16">
      <div className="flex items-center gap-x-3 justify-start w-full">
        <LoaderPinwheel size={36} className="mr-1" />
        <Text
          intent={"largePageHeadline"}
          className={"w-full"}
          align={"left"}
          color={"virtualGreen"}
        >
          Gampers Weekly Progress
        </Text>
      </div>
      <div className="w-full">
        {weeklyUserProgress && weeklyUserProgress.length > 0 ? (
          <WeeklyProgressTable weeklyUserProgress={weeklyUserProgress} />
        ) : (
          <div className="w-full flex flex-col items-center justify-center h-[300px] border border-grey-900 rounded-md p-3 xs:p-6 bg-zinc-950 gap-y-10">
            <Text
              intent={"sectionHeadline"}
              align={"center"}
              className={"w-full"}
            >
              Oops it seems there is no recorded progress at the moment.
            </Text>
            <Link href={"/"}>
              {" "}
              <Button className={"w-full"}>Add Gampers</Button>
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}

export default AllWeeklyDataPage;
