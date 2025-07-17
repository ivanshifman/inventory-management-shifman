"use client";

import React from "react";
import { useGetDashboardMetricsQuery } from "@/redux/state/api";
import { useTranslation } from "react-i18next";
import {
  CheckCircle,
  LucideIcon,
  Package,
  Tag,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import CardExpenseSummary from "./CardExpenseSummary";
import CardPopularProducts from "./CardPopularProducts";
import CardPurchaseSummary from "./CardPurchaseSummary";
import CardSalesSummary from "./CardSalesSummary";
import StatCard from "./StatCard";

const ICONS: Record<string, LucideIcon> = {
  Package,
  CheckCircle,
  Tag,
  TrendingUp,
  TrendingDown,
};

const Dashboard = () => {
  const { data: dashboardMetrics } = useGetDashboardMetricsQuery();
  const { t } = useTranslation();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 xl:overflow-auto gap-10 pb-4 custom-grid-rows">
      <CardPopularProducts />
      <CardSalesSummary />
      <CardPurchaseSummary />
      <CardExpenseSummary />
      {dashboardMetrics?.statCards.map((card) => (
        <StatCard
          key={card.statCardId}
          title={t(card.title)}
          primaryIcon={React.createElement(ICONS[card.primaryIcon] || Package, {
            className: "text-blue-600 w-6 h-6",
          })}
          dateRange={t(card.dateRange)}
          details={card.details.map((d) => ({
            title: t(d.title),
            amount: d.amount.toFixed(2),
            changePercentage: d.changePercentage,
            IconComponent: ICONS[d.icon] || TrendingUp,
          }))}
        />
      ))}
    </div>
  );
};

export default Dashboard;
