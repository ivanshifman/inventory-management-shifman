"use client";

import { useAppSelector } from "../redux/hooks";
import i18n from "@/app/lib/i18n";
import { useEffect } from "react";

export function useLanguage() {
  const language = useAppSelector((state) => state.global.language);

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language]);
}
