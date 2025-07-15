"use client";

import { useGetProductsQuery } from "@/redux/state/api";
import { Product } from "@/redux/api.interface";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Header from "@/app/components/Header";
import Loader from "@/app/components/Loading";
import ErrorLoading from "@/app/components/Error";

const generateColumns = (product: Product): GridColDef[] => {
  const keys = Object.keys(product) as (keyof Product)[];
  return keys
    .filter((key) => key !== "productId")
    .map((key) => {
      switch (key) {
        case "price":
          return {
            field: key,
            headerName: "Price",
            width: 110,
            type: "number",
            valueGetter: (params: { row: Product }) => `$${params.row.price}`,
          };
        case "rating":
          return {
            field: key,
            headerName: "Rating",
            width: 110,
            type: "number",
            valueGetter: (params: { row: Product }) =>
              params.row.rating ?? "N/A",
          };
        default:
          return {
            field: key,
            headerName:
              key.charAt(0).toUpperCase() +
              key.slice(1).replace(/([A-Z])/g, " $1"),
            width: 150,
            type: typeof product[key] === "number" ? "number" : "string",
          };
      }
    });
};

const Inventory = () => {
  const { data: products, isError, isLoading, refetch } = useGetProductsQuery();

  if (isLoading) return <Loader />;
  if (isError || !products || products.length === 0)
    return <ErrorLoading refetch={refetch} message="Error loading products" />;

  const columns: GridColDef[] = [
    {
      field: "productId",
      headerName: "ID",
      width: 90,
      sortable: false,
      editable: false,
      disableColumnMenu: true,
    },
    ...generateColumns(products[0]),
  ];

  return (
    <div className="flex flex-col">
      <Header name="Inventory" />
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
