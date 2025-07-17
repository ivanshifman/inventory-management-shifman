"use client";

import { useGetUsersQuery } from "@/redux/state/api";
import { useAppSelector } from "@/redux/hooks";
import { useTranslation } from "react-i18next";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Loader from "@/app/components/Loading";
import ErrorLoading from "@/app/components/Error";

const Users = () => {
  const { data: users, isError, isLoading } = useGetUsersQuery();

  const { t } = useTranslation();

  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

  if (isLoading) {
    return <Loader />;
  }

  if (isError || !users) {
    return <ErrorLoading refetch={() => {}} message="Error loading users" />;
  }

  const columns: GridColDef[] = [
    { field: "userId", headerName: "ID", width: 90 },
    { field: "name", headerName: t("name"), width: 200 },
    { field: "email", headerName: t("email"), width: 200 },
  ];

  return (
    <div className="flex flex-col">
      <h2
        className={`${
          isDarkMode ? "text-gray-50" : "text-gray-900"
        } text-2xl font-semibold`}
      >
        {t("users")}
      </h2>
      <DataGrid
        rows={users}
        columns={columns}
        getRowId={(row) => row.userId}
        checkboxSelection
        className="bg-white shadow rounded-lg border border-gray-200 mt-5 !text-gray-700"
      />
    </div>
  );
};

export default Users;
