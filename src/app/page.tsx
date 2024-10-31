import { FitnessChallengeDashboardComponent } from "@/components/dashboard/fitness-challenge-dashboard";
import Text from "@/components/ui/text";
import { Activity } from "lucide-react";

export default function Home() {
  return (
    <main className="flex flex-col items-center  p-3 xxs:p-6 xs:px-24 xs:py-12 gap-y-6 min-h-screen h-full">
      <div className="flex items-center gap-x-3 justify-start max-w-4xl w-full">
        <Activity size={36} className="mr-1" />
        <Text
          intent={"largePageHeadline"}
          className={"w-full"}
          align={"left"}
          color={"virtualGreen"}
        >
          GampFit challenge
        </Text>
      </div>
      <FitnessChallengeDashboardComponent />
    </main>
  );
}
