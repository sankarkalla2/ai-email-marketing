import { useRealTime } from "@/hooks/chatbot/use-chatbot";
import React from "react";

type Props = {
  chatRoomId: string;
  setCharts: React.Dispatch<
    React.SetStateAction<
      { role: "assistant" | "user"; content: string; link?: string }[]
    >
  >;
};

const RealTime = (props: Props) => {
  // WIP: setup realtime mode
  // const { } = useRealTime()
  return <div>RealTime</div>;
};

export default RealTime;
