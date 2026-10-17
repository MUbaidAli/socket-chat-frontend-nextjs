import Avatar from "@/components/ui/Avatar";
import type { Conversation } from "@/types";

interface ConversationItemProps {
  conversation: Conversation;
  active: boolean;
  onClick: () => void;
}

export default function ConversationItem({ conversation, active, onClick }: ConversationItemProps) {
  const { email,profileUrl,username } = conversation;



  return (
    <button
      type="button"
      onClick={onClick}
      aria-current={active ? "true" : undefined}
      className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-teal-700 ${
        active ? "bg-teal-50" : "hover:bg-slate-100"
      }`}
    >
      <Avatar name={username}  status={conversation.isOnline}/>

      <div className="min-w-0 flex-1">
        <div className="flex items-baseline justify-between gap-2">
          <p className="truncate font-semibold text-slate-900">{username}</p>
          {/* <span className="shrink-0 text-xs text-slate-500">{lastMessageAt}</span> */}
        </div>
        <div className="mt-0.5 flex items-center justify-between gap-2">
          {/* <p className={`truncate text-sm ${unreadCount ? "font-medium text-slate-800" : "text-slate-500"}`}> */}
            {/* {lastMessage} */}
          {/* </p> */}
          {/* {unreadCount > 0 && ( */}
            // <span className="flex h-5 min-w-5 shrink-0 items-center justify-center rounded-full bg-orange-500 px-1.5 text-xs font-semibold text-white">
            
            </span>
          {/* )} */}
        </div>
      </div>
    </button>
  );
}
