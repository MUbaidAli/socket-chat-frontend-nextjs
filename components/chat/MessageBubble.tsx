import { Check, CheckCheck } from "lucide-react";
import type { Message } from "@/types";

interface MessageBubbleProps {
  message: Message;
  isOwn: boolean;
}

export default function MessageBubble({ message, isOwn }: MessageBubbleProps) {
  
  console.log(message, "messageeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee")
    console.log(isOwn, "isOwnwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww")
  
  return (
    <div className={`flex ${isOwn ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[85%] rounded-2xl px-4 py-2.5 sm:max-w-[70%] ${
          isOwn
            ? "rounded-br-md bg-teal-800 text-white"
            : "rounded-bl-md border border-slate-200 bg-white text-slate-900"
        }`}
      >
        <p className="whitespace-pre-wrap break-words text-[15px] leading-relaxed">{message.message}</p>
        <div className={`mt-1 flex items-center justify-end gap-1 text-[11px] ${isOwn ? "text-teal-100" : "text-slate-500"}`}>
          <span>{message.sentAt}</span>
          {isOwn &&
            (message.status === "sent" ? (
              <Check size={14} aria-label="Sent" />
            ) : (
              <CheckCheck
                size={14}
                aria-label={message.status === "read" ? "Read" : "Delivered"}
                className={message.status === "read" ? "text-sky-300" : ""}
              />
            ))}
        </div>
      </div>
    </div>
  );
}
