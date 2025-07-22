"use client";

import { useGetProductsQuery } from "../../redux/state/api";
import { useAppSelector } from "../../redux/hooks";
import { useTranslation } from "react-i18next";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Loader from "../components/Loading";
import ErrorLoading from "../components/Error";

const Inventory = () => {
  const { data: products, isError, isLoading } = useGetProductsQuery();

  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

  const { t } = useTranslation();

  if (isLoading) {
    return <Loader />;
  }

  if (isError || !products) {
    return <ErrorLoading refetch={() => {}} message="Error loading products" />;
  }

  const columns: GridColDef[] = [
    { field: "productId", headerName: "ID", width: 90 },
    { field: "name", headerName: t("productName"), width: 200 },
    {
      field: "price",
      headerName: t("price"),
      width: 110,
      type: "number",
      valueGetter: (value, row) => `$${row.price}`,
    },
    {
      field: "rating",
      headerName: t("rating"),
      width: 110,
      type: "number",
      valueGetter: (value, row) => (row.rating ? row.rating : "N/A"),
    },
    {
      field: "stockQuantity",
      headerName: t("stockQuantity"),
      width: 150,
      type: "number",
    },
  ];

  return (
    <div className="flex flex-col">
      <h2
        className={`${
          isDarkMode ? "text-gray-50" : "text-gray-900"
        } text-2xl font-semibold`}
      >
        {t("inventory")}
      </h2>
      <DataGrid
        rows={products}
        columns={columns}
        getRowId={(row) => row.productId}
        checkboxSelection
        className="bg-white shadow rounded-lg border border-gray-200 mt-5 !text-gray-700"
      />
    </div>
  );
};

export default Inventory;
