import WeekClientForm, {
  UserWeekDetails,
} from "@/components/participant-form/week-client-form";
import Text from "@/components/ui/text";
import WeeklyProgressTable from "@/components/weekly-progress-table/weekly-progress.table";
import excelManager from "@/services/excel-manager";
import { PageProps } from "@/types/page";

async function WeeklyProgressPage({
  params,
  searchParams,
}: Readonly<PageProps>) {
  const participantId = params?.participant as string;
  const participantName = searchParams?.name as string;
  const response = await excelManager.fetchWeeklyProgressData(participantId);
  const weeklyUserProgress: UserWeekDetails[] = response.data;
  console.log("particip", weeklyUserProgress);
  return (
    <main className="flex flex-col items-center p-3 xxs:p-6 xs:px-24 xs:py-12  min-h-screen h-full gap-y-10">
      <Text
        intent={"largePageHeadline"}
        className={"w-full"}
        align={"left"}
        color={"virtualGreen"}
      >
        {participantName}'s progress
      </Text>
      <div className="flex flex-col xs:flex-row xs:items-start items-center w-full gap-y-10 xs:gap-x-3">
        <WeekClientForm
          participantId={participantId}
          participantName={participantName}
        />
        {weeklyUserProgress && weeklyUserProgress.length > 0 ? (
          <WeeklyProgressTable weeklyUserProgress={weeklyUserProgress} />
        ) : (
          <div className="w-full flex items-center justify-center min-h-[550px] xs:min-h-[536px] border border-gray-400 rounded-md p-3 xs:p-6 bg-zinc-950">
            <Text
              intent={"sectionHeadline"}
              align={"center"}
              className={"w-full"}
            >
              Add data weekly to view this participant's progress
            </Text>
          </div>
        )}
      </div>
    </main>
  );
}

export default WeeklyProgressPage;
