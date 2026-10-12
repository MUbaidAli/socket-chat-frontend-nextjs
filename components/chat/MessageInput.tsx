"use client";

import { useState, type KeyboardEvent } from "react";
import { Paperclip, SendHorizontal, Smile } from "lucide-react";

interface MessageInputProps {
  onSend: (text: string) => void;
}

const iconButton =
  "rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-teal-700";

export default function MessageInput({ onSend }: MessageInputProps) {
  const [text, setText] = useState("");
  const canSend = text.trim().length > 0;

  function send() {
    if (!canSend) return;
    onSend(text.trim());
    setText("");
  }

  function handleKeyDown(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  }

  return (
    <div className="border-t border-slate-200 bg-white p-3 sm:p-4">
      <div className="flex items-end gap-2 rounded-2xl border border-slate-300 bg-white px-2 py-2 transition focus-within:border-teal-700 focus-within:ring-4 focus-within:ring-teal-700/15">
        <button type="button" aria-label="Attach file" className={iconButton}>
          <Paperclip size={20} />
        </button>

        <textarea
          rows={1}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Write a message"
          aria-label="Message"
          className="max-h-32 min-h-[40px] flex-1 resize-none bg-transparent py-2 text-[15px] text-slate-900 outline-none placeholder:text-slate-400"
        />

        <button type="button" aria-label="Add emoji" className={iconButton}>
          <Smile size={20} />
        </button>

        <button
          type="button"
          onClick={send}
          disabled={!canSend}
          aria-label="Send message"
          className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-800 text-white transition hover:bg-teal-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-800 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400"
        >
          <SendHorizontal size={18} />
        </button>
      </div>
      <p className="mt-2 hidden px-1 text-xs text-slate-500 sm:block">Enter to send, Shift + Enter for a new line.</p>
    </div>
  );
}
