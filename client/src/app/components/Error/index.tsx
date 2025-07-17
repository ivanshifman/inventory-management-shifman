import React from "react";
import { useTranslation } from "react-i18next";

type ErrorLoadingProps = {
  refetch: () => void;
  message: string;
};

const ErrorLoading: React.FC<ErrorLoadingProps> = ({ refetch, message }) => {
  const { t } = useTranslation();

  return (
    <div className="m-5 text-red-500 text-center">
      <p>{t(message)}</p>
      <button
        onClick={refetch}
        className="text-blue-500 underline"
        aria-label={t("retry")}
      >
        {t("retry")}
      </button>
    </div>
  );
};

export default ErrorLoading;
