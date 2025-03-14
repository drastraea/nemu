"use client";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/react";
import { useRouter } from "next/navigation";
import { getMatchById } from "../_actions/matchAction";
import { patchReadNotificationAction } from "../_actions/notificationAction";

export const NotificationBadge = ({ notifications }) => {
  const router = useRouter();
  const onCornerMenuAction = async (key) => {
    const notif = notifications[key - 1];
    if (notif.type !== "GENERAL") {
      const [match, _] = await Promise.all([
        getMatchById(notif.matchId, notif.type),
        patchReadNotificationAction(notif.id),
      ]);
      const itemId =
        notif.type === "LOST_ITEM" ? match.lostItemId : match.foundItemId;
      router.push(`/my-items/${itemId}`);
    }
  };

  return (
    <Dropdown>
      <DropdownTrigger>
        <div className="relative inline-flex cursor-pointer p-1 rounded-full hover:bg-slate-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6 text-white"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
            />
          </svg>
          {notifications.length > 0 && (
            <span className="absolute top-1.5 right-1.5 flex size-4 translate-x-2/4 -translate-y-2/4 items-center justify-center rounded-full bg-red-600 py-1 px-1 text-xs text-white">
              {notifications.length}
            </span>
          )}
        </div>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Dropdown menu with description"
        onAction={(key) => onCornerMenuAction(key)}
      >
        {notifications.map((e, idx) => (
          <DropdownItem key={idx + 1} description={e.message}>
            Lost item match
          </DropdownItem>
        ))}

        {notifications.length > 4 && (
          <DropdownItem key="notif-5" className="text-blue-600" color="primary">
            See all notification
          </DropdownItem>
        )}
      </DropdownMenu>
    </Dropdown>
  );
};
