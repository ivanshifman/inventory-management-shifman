export interface Product {
  productId: string;
  name: string;
  price: number;
  rating?: number;
  stockQuantity: number;
}

export interface NewProduct {
  name: string;
  price: number;
  rating?: number;
  stockQuantity: number;
}

export interface SalesSummary {
  salesSummaryId: string;
  totalValue: number;
  changePercentage?: number;
  date: string;
}

export interface PurchaseSummary {
  purchaseSummaryId: string;
  totalPurchased: number;
  changePercentage?: number;
  date: string;
}

export interface ExpenseSummary {
  expenseSummarId: string;
  totalExpenses: number;
  date: string;
}

export interface ExpenseByCategorySummary {
  expenseByCategorySummaryId: string;
  category: string;
  amount: string;
  date: string;
}

export interface StatCardDetail {
  statCardDetailId: string;
  title: string;
  amount: number;
  changePercentage: number;
  icon: string;
}

export interface StatCard {
  statCardId: string;
  title: string;
  dateRange: string;
  primaryIcon: string;
  details: StatCardDetail[];
}

export interface DashboardMetrics {
  popularProducts: Product[];
  salesSummary: SalesSummary[];
  purchaseSummary: PurchaseSummary[];
  expenseSummary: ExpenseSummary[];
  expenseByCategorySummary: ExpenseByCategorySummary[];
  statCards: StatCard[];
}

export interface User {
  userId: string;
  name: string;
  email: string;
}

export interface Notification {
  id: string;
  message: string;
  type: string;
  entityId?: string;
  isDeleted: boolean;
  isRead: boolean;
  createdAt: Date;
}
