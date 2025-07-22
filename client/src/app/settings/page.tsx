"use client";

import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setIsDarkMode, setLanguage } from "../../redux/state/globalSlice";
import { useTranslation } from "react-i18next";

type UserSetting = {
  label: string;
  value: string | boolean;
  type: "text" | "toggle";
};

const Settings = () => {
  const { t, i18n } = useTranslation();

  const mockSettings: UserSetting[] = [
    { label: "username", value: "ivansh", type: "text" },
    { label: "email", value: "ivansh@example.com", type: "text" },
    { label: "notification", value: true, type: "toggle" },
    { label: "darkMode", value: false, type: "toggle" },
    { label: "language", value: i18n.language, type: "text" },
  ];

  const [userSettings, setUserSettings] = useState<UserSetting[]>(mockSettings);

  const dispatch = useAppDispatch();
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

  const handleToggleChange = (index: number) => {
    const setting = userSettings[index];
    if (setting.label === "darkMode") {
      dispatch(setIsDarkMode(!isDarkMode));
    } else {
      const settingsCopy = [...userSettings];
      settingsCopy[index].value = !(setting.value as boolean);
      setUserSettings(settingsCopy);
    }
  };

  const handleTextChange = (index: number, newValue: string) => {
    const updatedSettings = [...userSettings];
    updatedSettings[index].value = newValue;
    setUserSettings(updatedSettings);

    if (updatedSettings[index].label === "language") {
      dispatch(setLanguage(newValue));
    }
  };

  return (
    <div className="w-full">
      <h2
        className={`${
          isDarkMode ? "text-gray-50" : "text-gray-900"
        } text-2xl font-semibold`}
      >
        {t("userSettings")}
      </h2>
      <div className="overflow-x-auto mt-5 shadow-md">
        <table className="min-w-full bg-white rounded-lg">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
                {t("setting")}
              </th>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
                {t("value")}
              </th>
            </tr>
          </thead>
          <tbody>
            {userSettings.map((setting, index) => (
              <tr className="hover:bg-blue-50" key={setting.label}>
                <td className="py-2 px-4 text-gray-800">{t(setting.label)}</td>
                <td className="py-2 px-4">
                  {setting.type === "toggle" ? (
                    <label className="inline-flex relative items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={
                          setting.label === "darkMode"
                            ? isDarkMode
                            : (setting.value as boolean)
                        }
                        aria-label={setting.label}
                        onChange={() => handleToggleChange(index)}
                      />
                      <div
                        className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-blue-400 peer-focus:ring-4 
                        transition peer-checked:after:translate-x-full peer-checked:after:border-white 
                        after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white 
                        after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all
                        peer-checked:bg-blue-600"
                      ></div>
                    </label>
                  ) : setting.label === "language" ? (
                    <select
                      className="px-4 py-2 border rounded-lg text-gray-500 focus:outline-none focus:border-blue-500"
                      value={setting.value as string}
                      onChange={(e) => handleTextChange(index, e.target.value)}
                      aria-label="Language"
                    >
                      <option value="en">English</option>
                      <option value="es">Español</option>
                    </select>
                  ) : (
                    <input
                      type="text"
                      className="px-4 py-2 border rounded-lg text-gray-500 focus:outline-none focus:border-blue-500"
                      value={setting.value as string}
                      aria-label={setting.label}
                      onChange={(e) => handleTextChange(index, e.target.value)}
                      disabled
                    />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Settings;
