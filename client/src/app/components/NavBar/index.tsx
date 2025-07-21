"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  setIsDarkMode,
  setIsSidebarCollapsed,
} from "@/redux/state/globalSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  useGetNotificationsQuery,
  useMarkAllAsReadMutation,
  useDeleteNotificationMutation,
} from "@/redux/state/api";
import { useTranslation } from "react-i18next";
import { Bell, Menu, Moon, Settings, Sun } from "lucide-react";

const NavBar = () => {
  const dispatch = useAppDispatch();
  const isSidebarCollapsed = useAppSelector(
    (state) => state.global.isSidebarCollapsed
  );

  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

  const { t } = useTranslation();

  const toggleSidebar = () => {
    dispatch(setIsSidebarCollapsed(!isSidebarCollapsed));
  };

  const toggleDarkMode = () => {
    dispatch(setIsDarkMode(!isDarkMode));
  };

  const { data: notifications = [] } = useGetNotificationsQuery(undefined, {
    pollingInterval: 10000,
  });
  const [markAllAsRead] = useMarkAllAsReadMutation();
  const [deleteNotification] = useDeleteNotificationMutation();

  const visibleNotifications = notifications.filter((n) => !n.isDeleted);
  const unreadCount = visibleNotifications.filter((n) => !n.isRead).length;
  const bellRef = useRef<HTMLDivElement>(null);

  const [isOpen, setIsOpen] = useState(false);
  const [shouldMarkAsRead, setShouldMarkAsRead] = useState(false);

  const handleBellClick = () => {
    setIsOpen((prev) => {
      const isOpening = !prev;
      if (isOpening) {
        setShouldMarkAsRead(true);
      }
      return isOpening;
    });
  };

  useEffect(() => {
    if (shouldMarkAsRead) {
      markAllAsRead();
      setShouldMarkAsRead(false);
    }
  }, [shouldMarkAsRead, markAllAsRead]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (bellRef.current && !bellRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex justify-between items-center w-full mb-7">
      <div className="flex justify-between items-center gap-5">
        <button
          className="px-3 py-3 bg-gray-100 rounded-full hover:bg-blue-100"
          onClick={toggleSidebar}
          aria-label="Toggle sidebar"
        >
          <Menu
            className={`w-4 h-4 ${
              isDarkMode ? "text-gray-900" : "text-gray-500"
            }`}
            size={24}
          />
        </button>

        <div className="relative" onMouseDown={(e) => e.preventDefault()}>
          <input
            type="search"
            placeholder={t("searchNav")}
            className="pl-10 pr-4 py-2 w-50 md:w-60 border-2 border-gray-300 bg-white rounded-lg focus:outline-none focus:border-blue-500 placeholder:text-gray-600 text-gray-900"
          />

          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Bell className="text-gray-500" size={20} />
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center gap-5">
        <div className="hidden md:flex justify-between items-center gap-5">
          <div>
            <button onClick={toggleDarkMode}>
              {isDarkMode ? (
                <Sun className="cursor-pointer text-gray-50" size={24} />
              ) : (
                <Moon className="cursor-pointer text-gray-500" size={24} />
              )}
            </button>
          </div>
          <div className="relative" ref={bellRef}>
            <Bell
              className={`cursor-pointer ${
                isDarkMode ? "  text-gray-50" : " text-gray-500"
              }`}
              size={24}
              onClick={handleBellClick}
            />
            {unreadCount > 0 && (
              <span className="absolute -top-2 -right-2 inline-flex items-center justify-center px-[0.4rem] py-1 text-xs font-semibold leading-none text-red-100 bg-red-400 rounded-full">
                {unreadCount}
              </span>
            )}
            {isOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-white shadow-lg rounded-lg z-50 p-4">
                <h3 className="font-bold mb-2 text-gray-800">
                  {t("notifications")}
                </h3>
                <ul className="max-h-60 overflow-y-auto">
                  {visibleNotifications && visibleNotifications.length > 0 ? (
                    visibleNotifications.map((n) => (
                      <li
                        key={n.id}
                        className={`flex justify-between items-center p-2 my-2 rounded ${
                          n.isRead ? "bg-gray-200" : "bg-blue-400"
                        }`}
                      >
                        <span className="text-sm text-gray-700">
                          {n.message}
                        </span>
                        <button
                          onClick={() => deleteNotification(n.id)}
                          className="text-red-500 hover:underline text-sm cursor-pointer"
                          aria-label="Delete notification"
                        >
                          {t("delete")}
                        </button>
                      </li>
                    ))
                  ) : (
                    <li className="flex justify-between items-center p-2 my-2 rounded bg-gray-200">
                      <span className="text-sm text-red-500 font-bold">
                        {t("noNotification")}
                      </span>
                    </li>
                  )}
                </ul>
              </div>
            )}
          </div>
          <hr className="w-0 h-7 border border-solid border-l border-gray-300 mx-3" />
          <div className="flex items-center gap-3 cursor-pointer">
            img
            <span className="font-semibold">Ivan Shifman</span>
          </div>
        </div>
        <Link href="/settings">
          <Settings
            className={`cursor-pointer ${
              isDarkMode ? "  text-gray-50" : " text-gray-500"
            }`}
            size={24}
          />
        </Link>
      </div>
    </div>
  );
};

export default NavBar;
