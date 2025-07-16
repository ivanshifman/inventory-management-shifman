"use client";

import { useGetProductsQuery } from "@/redux/state/api";
import { useAppSelector } from "@/redux/hooks";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Loader from "@/app/components/Loading";
import ErrorLoading from "@/app/components/Error";

const columns: GridColDef[] = [
  { field: "productId", headerName: "ID", width: 90 },
  { field: "name", headerName: "Product Name", width: 200 },
  {
    field: "price",
    headerName: "Price",
    width: 110,
    type: "number",
    valueGetter: (value, row) => `$${row.price}`,
  },
  {
    field: "rating",
    headerName: "Rating",
    width: 110,
    type: "number",
    valueGetter: (value, row) => (row.rating ? row.rating : "N/A"),
  },
  {
    field: "stockQuantity",
    headerName: "Stock Quantity",
    width: 150,
    type: "number",
  },
];

const Inventory = () => {
  const { data: products, isError, isLoading } = useGetProductsQuery();

  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

  if (isLoading) {
    return <Loader />;
  }

  if (isError || !products) {
    return <ErrorLoading refetch={() => {}} message="Error loading products" />;
  }

  return (
    <div className="flex flex-col">
      <h2
        className={`${
          isDarkMode ? "text-gray-50" : "text-gray-900"
        } text-2xl font-semibold`}
      >
        Inventory
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
