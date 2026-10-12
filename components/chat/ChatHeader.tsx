import { ArrowLeft, MoreVertical, Phone, Video } from "lucide-react";
import Avatar from "@/components/ui/Avatar";
import type { User } from "@/types";

interface ChatHeaderProps {
  user: User;
  onBack: () => void;
}

function statusText(user: User) {
  if (user.status === "online") return "Online";
  if (user.status === "away") return "Away";
  return user.lastSeen ? `Last seen ${user.lastSeen}` : "Offline";
}

const iconButton =
  "rounded-lg p-2 text-slate-600 hover:bg-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-teal-700";

export default function ChatHeader({ user, onBack }: ChatHeaderProps) {
  return (
    <header className="flex items-center gap-3 border-b border-slate-200 bg-white px-4 py-3">
      <button type="button" onClick={onBack} aria-label="Back to chats" className={`${iconButton} md:hidden`}>
        <ArrowLeft size={20} />
      </button>

      <Avatar name={user.username} status={user.status} />

      <div className="min-w-0 flex-1">
        <p className="truncate font-semibold text-slate-900">{user.name}</p>
        <p className={`text-sm ${user.status === "online" ? "text-emerald-600" : "text-slate-500"}`}>
          {statusText(user)}
        </p>
      </div>

      <button type="button" aria-label="Voice call" className={iconButton}>
        <Phone size={20} />
      </button>
      <button type="button" aria-label="Video call" className={iconButton}>
        <Video size={20} />
      </button>
      <button type="button" aria-label="More options" className={iconButton}>
        <MoreVertical size={20} />
      </button>
    </header>
  );
}
