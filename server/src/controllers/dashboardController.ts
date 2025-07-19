import { Request, Response, NextFunction } from "express";
import prisma from "../lib/prisma";
import { handlePrismaError } from "../utils/handlePrismaError";

export const getDashboardMetrics = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const [
      popularProducts,
      salesSummary,
      purchaseSummary,
      expenseSummary,
      rawCategory,
      statCards,
    ] = await Promise.all([
      prisma.products.findMany({
        take: 15,
        orderBy: { stockQuantity: "desc" },
      }),
      prisma.salesSummary.findMany({ take: 5, orderBy: { date: "desc" } }),
      prisma.purchaseSummary.findMany({ take: 5, orderBy: { date: "desc" } }),
      prisma.expenseSummary.findMany({ take: 5, orderBy: { date: "desc" } }),
      prisma.expenseByCategory.findMany({ take: 5, orderBy: { date: "desc" } }),
      prisma.statCard.findMany({ include: { details: true } }),
    ]);

    const expenseByCategorySummary = rawCategory.map((item) => ({
      ...item,
      amount: item.amount.toString(),
    }));

    res.json({
      popularProducts,
      salesSummary,
      purchaseSummary,
      expenseSummary,
      expenseByCategorySummary,
      statCards,
    });
  } catch (error) {
    next(handlePrismaError(error));
  }
};
