import ParticipantTable from "@/components/participant-table/participant-table";

export default function Home() {
  return (
    <main className="flex flex-col items-center  p-3 xxs:p-6 xs:px-24 xs:py-12  min-h-screen h-full">
      <ParticipantTable />
    </main>
  );
}
