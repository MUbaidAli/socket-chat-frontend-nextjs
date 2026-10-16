"use client";

import { useEffect, useRef } from "react";
import MessageBubble from "./MessageBubble";
import type { Message } from "@/types";

interface MessageListProps {
  messages: Message[];
  currentUserId: string;
}

export default function MessageList({ messages, currentUserId }: MessageListProps) {
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length]);

  if (messages.length === 0) {
    return (
      <div className="flex flex-1 items-center justify-center px-6 text-center">
        <p className="max-w-xs text-slate-500">No messages yet. Say hello to start the conversation.</p>
      </div>
    );
  }

  return (
    <div className="flex-1 space-y-3 overflow-y-auto bg-slate-50 px-4 py-6 sm:px-6" role="log" aria-live="polite">
      <div className="flex justify-center">
        <span className="rounded-full bg-slate-200 px-3 py-1 text-xs font-medium text-slate-600">Today</span>
      </div>

      {messages.length > 0 &&messages.map((m) => (
        console.log(m, "messagesssssssssssssssssssssssssssssss"),
        <MessageBubble key={m._id} message={m} isOwn={m.sender._id === currentUserId} />
      ))}
      <div ref={endRef} />
    </div>
  );
}
