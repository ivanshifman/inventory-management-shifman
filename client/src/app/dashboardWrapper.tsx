"use client";

import { useEffect } from "react";
import Navbar from "@/app/components/NavBar";
import SideBar from "@/app/components/SideBar";
import StoreProvider from "@/redux/store";
import { useAppSelector } from "@/redux/hooks";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const isSidebarCollapsed = useAppSelector(
    (state) => state.global.isSidebarCollapsed
  );
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

  useEffect(() => {
    const html = document.documentElement;
    html.classList.remove("dark", "light");
    html.classList.add(isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  return (
    <div
      className={`${
        isDarkMode
          ? "dark dark:bg-gray-900 dark:text-gray-50"
          : "light bg-gray-50 text-gray-900"
      } flex  w-full min-h-screen`}
    >
      <SideBar />
      <main
        className={`flex flex-col w-full h-full py-7 px-9 ${
          isDarkMode ? "bg-gray-900" : "bg-gray-50"
        }  ${isSidebarCollapsed ? "md:pl-24" : "md:pl-72"}`}
      >
        <Navbar />
        {children}
      </main>
    </div>
  );
};

const DashboardWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <StoreProvider>
      <DashboardLayout>{children}</DashboardLayout>
    </StoreProvider>
  );
};

export default DashboardWrapper;
