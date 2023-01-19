import type { Message } from "@prisma/client";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { api } from "../utils/api";

export default function LogContainer() {
  const { data } = api.logs.getLogs.useQuery(
    {},
    {
      trpc: {
        ssr: true,
      },
      refetchInterval: 2000,
    }
  );
  const [parent] = useAutoAnimate<HTMLDivElement>({ duration: 120 });

  return (
    <div
      ref={parent}
      className="m-3 flex flex-col-reverse gap-2 border border-black p-3"
    >
      {data?.map((message) => (
        <MessageView message={message} key={message.id} />
      ))}
    </div>
  );
}

interface MessageProps {
  message: Message;
}
function MessageView({ message }: MessageProps) {
  return (
    <div className="grid grid-cols-[1fr_1fr_2fr] gap-2 border-b border-gray-200">
      <div className="text-gray-900">{message.timestamp.toLocaleString()}</div>
      <div className="font-bold">{message.playerId}</div>
      <div className="font-bold">{message.content}</div>
    </div>
  );
}
