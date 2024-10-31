"use client";

import { fetchLeaderboard } from "@/lib/action";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

const FetchScores = () => {
  const router = useRouter();
  return (
    <div className="flex w-full items-start">
      <Button
        onClick={() => {
          fetchLeaderboard();
          router.refresh();
        }}
      >
        Calculate latest score
      </Button>
    </div>
  );
};

export default FetchScores;