import ParticipantClientForm from "@/components/participant-form/user-client-form";
import ParticipantTable from "@/components/participant-table/participant-table";
import Text from "@/components/ui/text";
import { Joystick } from "lucide-react";

export default function GampersPage() {
  return (
    <main className="flex flex-col items-center  p-3 xxs:p-6 xs:px-24 xs:py-12 gap-y-6 min-h-screen h-full ">
      <div className="flex items-center gap-x-3 justify-start w-full">
        <Joystick size={36} className="mr-1" />
        <Text
          intent={"largePageHeadline"}
          className={"w-full"}
          align={"left"}
          color={"virtualGreen"}
        >
          Gampers
        </Text>
      </div>

      <ParticipantTable />
      <ParticipantClientForm />
    </main>
  );
}
