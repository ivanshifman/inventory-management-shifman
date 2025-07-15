import React from "react";

type ErrorLoadingProps = {
  refetch: () => void;
  message: string;
};

const ErrorLoading: React.FC<ErrorLoadingProps> = ({ refetch, message }) => {
  return (
    <div className="m-5 text-red-500 text-center">
      <p>{message}</p>
      <button
        onClick={refetch}
        className="text-blue-500 underline"
        aria-label="Retry"
      >
        Retry
      </button>
    </div>
  );
};

export default ErrorLoading;
