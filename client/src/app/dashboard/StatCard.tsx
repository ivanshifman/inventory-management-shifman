import { useTranslation } from "react-i18next";
import { JSX } from "react/jsx-runtime";
import { LucideIcon } from "lucide-react";

type StatDetail = {
  title: string;
  amount: string;
  changePercentage: number;
  IconComponent: LucideIcon;
};

type StatCardProps = {
  title: string;
  primaryIcon: JSX.Element;
  details: StatDetail[];
  dateRange: string;
};

const StatCard = ({
  title,
  primaryIcon,
  details,
  dateRange,
}: StatCardProps) => {

  const {t} = useTranslation();

  const formatPercentage = (value: number) => {
    const signal = value >= 0 ? "+" : "";
    return `${signal}${value.toFixed()}%`;
  };

  const getChangeColor = (value: number) =>
    value >= 0 ? "text-green-500" : "text-red-500";

  return (
    <div className="md:row-span-1 xl:row-span-2 bg-white col-span-1 shadow-md rounded-2xl flex flex-col justify-between text-gray-800">
      <div>
        <div className="flex justify-between items-center mb-2 px-5 pt-4">
          <h2 className="font-semibold text-lg text-gray-700">{t(title)}</h2>
          <span className="text-xs text-gray-400">{t(dateRange)}</span>
        </div>
        <hr />
      </div>

      <div className="flex mb-6 items-center justify-around gap-4 px-5">
        <div className="rounded-full p-5 bg-blue-50 border-sky-300 border-[1px]">
          {primaryIcon}
        </div>
        <div className="flex-1">
          {details.map((detail, index) => (
            <div key={index} className="flex items-center justify-between my-4">
              <span className="text-gray-500">{t(detail.title)}</span>
              <span className="font-bold text-gray-800">{detail.amount}</span>
              <div className="flex items-center">
                <detail.IconComponent
                  className={`w-4 h-4 mr-1 ${getChangeColor(
                    detail.changePercentage
                  )}`}
                />

                <span
                  className={`font-medium ${getChangeColor(
                    detail.changePercentage
                  )}`}
                >
                  {formatPercentage(detail.changePercentage)}
                </span>
              </div>
              {index < details.length - 1 && <hr />}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StatCard;
