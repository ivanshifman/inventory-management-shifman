import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  DashboardMetrics,
  ExpenseByCategorySummary,
  Notification,
  NewProduct,
  Product,
  User,
} from "../api.interface";

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL }),
  reducerPath: "api",
  tagTypes: [
    "DashboardMetrics",
    "Products",
    "Users",
    "Expenses",
    "Notifications",
  ],
  endpoints: (build) => ({
    getDashboardMetrics: build.query<DashboardMetrics, void>({
      query: () => "/dashboard",
      providesTags: ["DashboardMetrics"],
    }),
    getProducts: build.query<Product[], string | void>({
      query: (search) => ({
        url: "/products",
        params: search ? { search } : {},
      }),
      providesTags: ["Products"],
    }),
    createProduct: build.mutation<Product, NewProduct>({
      query: (newProduct) => ({
        url: "/products",
        method: "POST",
        body: newProduct,
      }),
      invalidatesTags: ["Products"],
    }),
    getUsers: build.query<User[], void>({
      query: () => "/users",
      providesTags: ["Users"],
    }),
    getExpensesByCategory: build.query<ExpenseByCategorySummary[], void>({
      query: () => "/expenses",
      providesTags: ["Expenses"],
    }),
    getNotifications: build.query<Notification[], void>({
      query: () => "/notifications",
      providesTags: ["Notifications"],
    }),

    markAllAsRead: build.mutation<void, void>({
      query: () => ({
        url: "/notifications/mark-all-read",
        method: "PATCH",
      }),
      invalidatesTags: ["Notifications"],
    }),

    deleteNotification: build.mutation<void, string>({
      query: (id) => ({
        url: `/notifications/${id}`,
        method: "PUT",
      }),
      invalidatesTags: ["Notifications"],
    }),
  }),
});

export const {
  useGetDashboardMetricsQuery,
  useGetProductsQuery,
  useCreateProductMutation,
  useGetUsersQuery,
  useGetExpensesByCategoryQuery,
  useGetNotificationsQuery,
  useMarkAllAsReadMutation,
  useDeleteNotificationMutation,
} = api;
