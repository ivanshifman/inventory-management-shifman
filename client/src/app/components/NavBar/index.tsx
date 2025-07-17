"use client";

import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  setIsDarkMode,
  setIsSidebarCollapsed,
} from "@/redux/state/globalSlice";
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

        <div className="relative">
          <input
            type="search"
            placeholder={t("searchNav")}
            className="pl-10 pr-4 py-2 w-50 md:w-60 border-2 border-gray-300 bg-white rounded-lg focus:outline-none focus:border-blue-500 placeholder:text-gray-600 text-gray-900"
          />

          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-non">
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
          <div className="relative">
            <Bell
              className={`cursor-pointer ${
                isDarkMode ? "  text-gray-50" : " text-gray-500"
              }`}
              size={24}
            />
            <span className="absolute -top-2 -right-2 inline-flex items-center justify-center px-[0.4rem] py-1 text-xs font-semibold leading-none text-red-100 bg-red-400 rounded-full">
              3
            </span>
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
