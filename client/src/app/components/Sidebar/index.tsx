"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { setIsSidebarCollapsed } from "../../../redux/state/globalSlice";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import {
  Archive,
  CircleDollarSign,
  Clipboard,
  Layout,
  LucideIcon,
  SlidersHorizontal,
  User,
  X,
} from "lucide-react";

interface SidebarLinkProps {
  href: string;
  icon: LucideIcon;
  label: string;
  isCollapsed: boolean;
}

const SidebarLink = ({
  href,
  icon: Icon,
  label,
  isCollapsed,
}: SidebarLinkProps) => {
  const pathname = usePathname();
  const isActive =
    pathname === href || (pathname === "/" && href === "/dashboard");

  return (
    <Link href={href} aria-current={isActive ? "page" : undefined}>
      <div
        className={`cursor-pointer flex items-center ${
          isCollapsed ? "justify-center py-4" : "justify-start px-8 py-4"
        } hover:text-blue-500 hover:bg-blue-100 gap-3 transition-colors ${
          isActive ? "bg-blue-200 text-white" : ""
        }`}
      >
        <Icon className="w-6 h-6 !text-gray-700" />
        {!isCollapsed && (
          <span className="font-medium text-gray-700">{label}</span>
        )}
      </div>
    </Link>
  );
};

const SideBar = () => {
  const dispatch = useAppDispatch();
  const isSidebarCollapsed = useAppSelector(
    (state) => state.global.isSidebarCollapsed
  );

  const { t } = useTranslation();

  const toggleSidebar = () => {
    dispatch(setIsSidebarCollapsed(!isSidebarCollapsed));
  };

  const sidebarLinks = [
    { href: "/dashboard", icon: Layout, label: t("dashboard") },
    { href: "/inventory", icon: Archive, label: t("inventory") },
    { href: "/products", icon: Clipboard, label: t("products") },
    { href: "/users", icon: User, label: t("users") },
    { href: "/settings", icon: SlidersHorizontal, label: t("settings") },
    { href: "/expenses", icon: CircleDollarSign, label: t("expenses") },
  ];

  const sidebarClassNames = `fixed flex flex-col ${
    isSidebarCollapsed ? "w-0 md:w-16" : "w-72 md:w-64"
  } bg-white transition-all duration-300 overflow-hidden h-full shadow-md z-40`;

  const sidebarRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(e.target as Node)
      ) {
        dispatch(setIsSidebarCollapsed(true));
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dispatch]);

  useEffect(() => {
    dispatch(setIsSidebarCollapsed(true));
  }, [pathname, dispatch]);

  return (
    <nav ref={sidebarRef} className={sidebarClassNames}>
      <div
        className={`flex gap-3 justify-between md:justify-normal items-center pt-8 ${
          isSidebarCollapsed ? "px-5" : "px-8"
        }`}
      >
        {!isSidebarCollapsed && (
          <h1 className="font-extrabold text-2xl text-gray-900">SHIFMAN</h1>
        )}
        <button
          className="md:hidden px-3 py-3 bg-gray-100 rounded-full hover:bg-blue-100"
          onClick={toggleSidebar}
          aria-label="menu"
        >
          <X className="w-4 h-4 text-gray-800" />
        </button>
      </div>

      <div className="flex-grow mt-8">
        {sidebarLinks.map(({ href, icon, label }) => (
          <SidebarLink
            key={href}
            href={href}
            icon={icon}
            label={label}
            isCollapsed={isSidebarCollapsed}
          />
        ))}
      </div>

      <div className={`${isSidebarCollapsed ? "hidden" : "block"} mb-10`}>
        <p className="text-center text-xs text-gray-500">
          &copy; {new Date().getFullYear()} Ivan Shifman
        </p>
      </div>
    </nav>
  );
};

export default SideBar;
