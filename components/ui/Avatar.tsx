import type { UserStatus } from "@/types";

const COLORS = [
  "bg-teal-700",
  "bg-sky-700",
  "bg-indigo-700",
  "bg-rose-700",
  "bg-amber-700",
  "bg-emerald-700",
];

const SIZES = {
  sm: "h-8 w-8 text-xs",
  md: "h-11 w-11 text-sm",
  lg: "h-14 w-14 text-base",
};

const STATUS_COLORS: Record<UserStatus, string> = {
  online: "bg-emerald-500",
  away: "bg-amber-400",
  offline: "bg-slate-300",
};

interface AvatarProps {
  name: string;
  size?: keyof typeof SIZES;
  status?: UserStatus;
}

function pickColor(name: string) {
  let hash = 0;
  for (const ch of name) hash = (hash * 31 + ch.charCodeAt(0)) % COLORS.length;
  return COLORS[hash];
}

export default function Avatar({ name, size = "md", status }: AvatarProps) {
  const initials = name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();




    console.log(status, "statussssssssssssssssssssssssssssssssssssss")
  return (
    <div className="relative shrink-0">
      <div
        className={`flex items-center justify-center rounded-full font-semibold text-white ${SIZES[size]} ${pickColor(name)}`}
        aria-hidden="true"
      >
        {initials}
      </div>
      {status && (
        <span
          className={`absolute bottom-0 right-0 h-3 w-3 rounded-full ring-2 ring-white ${STATUS_COLORS[status ? "online" : "offline"]}`}
          title={status ? "Online" : "Offline"}
        />
      )}
    </div>
  );
}
