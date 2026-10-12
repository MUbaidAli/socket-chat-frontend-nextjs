"use client";

import { useEffect, useMemo, useState } from "react";
import { LogOut, Search, SquarePen } from "lucide-react";
import Avatar from "@/components/ui/Avatar";
import ConversationItem from "./ConversationItem";
import type { Conversation, User } from "@/types";
import axios from "@/utils/axios";

interface ChatSidebarProps {
  currentUser: User;
  conversations: Conversation[];
  activeId: string | null;
  onSelect: (id: string) => void;
}

export default function ChatSidebar({ currentUser, conversations, activeId, onSelect }: ChatSidebarProps) {
  const [query, setQuery] = useState("");
  // const filtered = useMemo(
  //   () => conversations.filter((c) => c.participant.name.toLowerCase().includes(query.trim().toLowerCase())),
  //   [conversations, query]
  // );




  return (
    <div className="flex h-full flex-col bg-white">
      {/* Current user */}
      <div className="flex items-center gap-3 border-b border-slate-200 px-4 py-4">
        <Avatar name={currentUser?.username  } status={currentUser.status} />
        <div className="min-w-0 flex-1">
          <p className="truncate font-semibold text-slate-900">{currentUser.username}</p>
          <p className="truncate text-sm text-slate-500">{currentUser.email}</p>
        </div>
        <button
          type="button"
          aria-label="Start new chat"
          className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-teal-700"
        >
          <SquarePen size={20} />
        </button>
      </div>

      {/* Search */}
      <div className="px-4 py-3">
        <div className="relative">
          <Search size={18} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search chats"
            aria-label="Search chats"
            className="w-full rounded-xl border border-transparent bg-slate-100 py-2.5 pl-10 pr-3 text-sm outline-none transition placeholder:text-slate-500 focus:border-teal-700 focus:bg-white focus:ring-4 focus:ring-teal-700/15"
          />
        </div>
      </div>

      {/* List */}
      <nav aria-label="Conversations" className="flex-1 space-y-1 overflow-y-auto px-2 pb-2">
        {conversations.length === 0 ? (
          <p className="px-4 py-10 text-center text-sm text-slate-500">No chats match &ldquo;{query}&rdquo;.</p>
        ) : (
          conversations.map((c) => (
            <ConversationItem key={c._id} conversation={c} active={c._id === activeId} onClick={() => onSelect(c._id)} />
          ))
        )}
      </nav>

      <div className="border-t border-slate-200 p-3">
        <button
          type="button"
          className="flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-teal-700"
        >
          <LogOut size={18} />
          Log out
        </button>
      </div>
    </div>
  );
}
