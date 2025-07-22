"use client";

import { useState } from "react";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { SerializedError } from "@reduxjs/toolkit";
import { useForm } from "react-hook-form";
import { v4 } from "uuid";
import { useTranslation } from "react-i18next";
import Header from "../components/Header";

type CustomError = FetchBaseQueryError | SerializedError;

type ProductFormData = {
  name: string;
  price: number;
  stockQuantity: number;
  rating: number;
  productId?: string;
};

type CreateProductModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (formData: ProductFormData) => Promise<void>;
};

const CreateProductModal = ({
  isOpen,
  onClose,
  onCreate,
}: CreateProductModalProps) => {
  const { t } = useTranslation();

  const [productId] = useState(v4());

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting, isValid },
  } = useForm<ProductFormData>({
    mode: "onChange",
    defaultValues: {
      productId,
      name: "",
      price: 0,
      stockQuantity: 0,
      rating: 0,
    },
  });

  const onSubmit = async (data: ProductFormData) => {
    try {
      await onCreate(data);
      reset();
      onClose();
    } catch (err) {
      const error = err as CustomError;

      if (
        "data" in error &&
        typeof error.data === "object" &&
        error.data !== null &&
        "message" in error.data
      ) {
        const backendError = error.data as { message: string };

        const messageString = backendError.message;

        const cleaned = messageString.replace(/^Validation failed:\s*/, "");

        const entries = cleaned.split(",").map((e) => e.trim());

        entries.forEach((entry) => {
          const match = entry.match(/^body\.(\w+):\s*(.+)$/);
          if (match) {
            const [, field, message] = match;
            if (field in data) {
              setError(field as keyof ProductFormData, {
                type: "server",
                message,
              });
            }
          }
        });
      }
    }
  };

  if (!isOpen) return null;

  const labelCss = "block text-sm font-medium text-gray-700";
  const inputCss =
    "block w-full mb-1 p-2 border-gray-500 border-2 rounded-md placeholder:text-gray-600 text-gray-900";
  const errorCss = "text-red-600 text-sm mb-2";

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-20">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <Header name="Create New Product" />
        <form onSubmit={handleSubmit(onSubmit)} className="mt-5">
          <label className={labelCss}>{t("productName")}</label>
          <input
            type="text"
            {...register("name", {
              required: t("formNameRequired"),
              maxLength: {
                value: 255,
                message: t("formName"),
              },
            })}
            className={inputCss}
            placeholder={t("productName")}
          />

          {errors.name && (
            <span className={errorCss}>{errors.name.message}</span>
          )}

          <label className={labelCss}>{t("productPrice")}</label>
          <input
            type="number"
            {...register("price", {
              required: t("formPriceRequired"),
              valueAsNumber: true,
              min: { value: 0, message: t("formPrice") },
            })}
            className={inputCss}
            placeholder="Price"
          />

          {errors.price && (
            <span className={errorCss}>{errors.price.message}</span>
          )}

          <label className={labelCss}>{t("stockQuantity")}</label>
          <input
            type="number"
            {...register("stockQuantity", {
              required: t("formStockRequired"),
              valueAsNumber: true,
              min: { value: 0, message: t("formStock") },
            })}
            className={inputCss}
            placeholder="Stock Quantity"
          />

          {errors.stockQuantity && (
            <span className={errorCss}>{errors.stockQuantity.message}</span>
          )}

          <label className={labelCss}>{t("rating")}</label>
          <input
            type="number"
            step={"0.1"}
            {...register("rating", {
              required: t("formRatingRequired"),
              valueAsNumber: true,
              min: { value: 0, message: t("formRatingMin") },
              max: { value: 5, message: t("formRatingMax") },
            })}
            className={inputCss}
            placeholder="Rating"
          />

          {errors.rating && (
            <span className={errorCss}>{errors.rating.message}</span>
          )}

          <div className="mt-4">
            <button
              type="submit"
              disabled={!isValid || isSubmitting}
              className={`mt-4 px-4 py-2 rounded text-white cursor-pointer ${
                !isValid || isSubmitting
                  ? "bg-blue-300 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-700"
              }`}
            >
              {t("create")}
            </button>

            <button
              onClick={onClose}
              type="button"
              className="ml-2 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700 cursor-pointer"
            >
              {t("cancel")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateProductModal;
