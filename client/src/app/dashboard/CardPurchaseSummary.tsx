import { useGetDashboardMetricsQuery } from "../../redux/state/api";
import { useTranslation } from "react-i18next";
import { TrendingDown, TrendingUp } from "lucide-react";
import numeral from "numeral";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import Loader from "../components/Loading";

const CardPurchaseSummary = () => {
  const { data, isLoading } = useGetDashboardMetricsQuery();

  const { t } = useTranslation();

  const purchaseData = data?.purchaseSummary || [];

  const lastDataPoint = purchaseData[purchaseData.length - 1] || null;

  return (
    <div className="flex flex-col justify-between row-span-2 xl:row-span-3 col-span-1 md:col-span-2 xl:col-span-1 bg-white shadow-md rounded-2xl xl:pb-14 text-gray-800">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div>
            <h2 className="text-lg font-semibold mb-2 px-7 pt-5 text-gray-800">
              {t("purchaseSummary")}
            </h2>
            <hr />
          </div>

          <div>
            <div className="mb-4 mt-7 px-7">
              <p className="text-xs text-gray-400">{t("purchased")}</p>
              <div className="flex items-center">
                <p className="text-2xl font-bold">
                  {lastDataPoint
                    ? numeral(lastDataPoint.totalPurchased).format("$0.00a")
                    : "0"}
                </p>
                {lastDataPoint && (
                  <p
                    className={`text-sm ${
                      lastDataPoint.changePercentage! >= 0
                        ? "text-green-500"
                        : "text-red-500"
                    } flex ml-3`}
                  >
                    {lastDataPoint.changePercentage! >= 0 ? (
                      <TrendingUp className="w-5 h-5 mr-1" />
                    ) : (
                      <TrendingDown className="w-5 h-5 mr-1" />
                    )}
                    {Math.abs(lastDataPoint.changePercentage!)}%
                  </p>
                )}
              </div>
            </div>
            <ResponsiveContainer width="100%" height={200} className="p-2 resize-none">
              <AreaChart
                data={purchaseData}
                margin={{ top: 0, right: 0, left: -50, bottom: 45 }}
              >
                <XAxis dataKey="date" tick={false} axisLine={false} />
                <YAxis tickLine={false} tick={false} axisLine={false} />
                <Tooltip
                  formatter={(value: number) => [
                    `$${value.toLocaleString("en")}`,
                  ]}
                  labelFormatter={(label) => {
                    const date = new Date(label);
                    return date.toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    });
                  }}
                />
                <Area
                  type="linear"
                  dataKey="totalPurchased"
                  stroke="#8884d8"
                  fill="#8884d8"
                  dot={true}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </>
      )}
    </div>
  );
};

export default CardPurchaseSummary;
