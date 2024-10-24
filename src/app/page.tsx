import Text from "../../components/ui/text";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Text intent={"pageHeadline"} color={"grey-600"}>
        Hello World
      </Text>
    </main>
  );
}
