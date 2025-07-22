"use client";

import { useState } from "react";
import {
  useCreateProductMutation,
  useGetProductsQuery,
} from "../../redux/state/api";
import { useAppSelector } from "../../redux/hooks";
import { useTranslation } from "react-i18next";
import CreateProductModal from "./CreateProductModal";
import { PlusCircleIcon, SearchIcon } from "lucide-react";
import Rating from "../components/Rating";
import Loader from "../components/Loading";
import ErrorLoading from "../components/Error";

type ProductFormData = {
  name: string;
  price: number;
  stockQuantity: number;
  rating: number;
};

const Products = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    data: products,
    isLoading,
    isError,
  } = useGetProductsQuery(searchTerm);

  const [createProduct] = useCreateProductMutation();
  const handleCreateProduct = async (productData: ProductFormData) => {
    await createProduct(productData);
  };

  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

  const { t } = useTranslation();

  if (isLoading) {
    return <Loader />;
  }

  if (isError || !products) {
    return <ErrorLoading refetch={() => {}} message="Error loading products" />;
  }

  return (
    <div className="mx-auto pb-5 w-full">
      <div className="mb-6">
        <div className="flex items-center border-2 border-gray-200 rounded">
          <SearchIcon
            className={`${
              isDarkMode ? "text-gray-50" : "text-gray-500"
            } w-5 h-5 m-2`}
          />
          <input
            className="w-full py-2 px-4 rounded bg-white placeholder:text-gray-600 text-gray-900"
            placeholder={t("searchProducts")}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="flex justify-between items-center mb-6">
        <h2
          className={`${
            isDarkMode ? "text-gray-50" : "text-gray-900"
          } text-2xl font-semibold`}
        >
          {t("products")}
        </h2>
        <button
          className="flex items-center bg-blue-500 hover:bg-blue-700 text-gray-200 font-bold py-2 px-4 rounded cursor-pointer"
          onClick={() => setIsModalOpen(true)}
        >
          <PlusCircleIcon className="w-5 h-5 mr-2 !text-gray-200" />{" "}
          {t("createProduct")}
        </button>
      </div>

      <div
        className={`grid ${
          products.length === 0
            ? "grid-cols-1"
            : "grid-cols-1 sm:grid-cols-2 lg-grid-cols-3 gap-10 justify-between"
        } `}
      >
        {isLoading && <Loader />}

        {products.length === 0 ? (
          <div className="mt-16">
            <p className="text-center ml-7 text-4xl text-red-600">
              {t("noProductsFound")}
            </p>
          </div>
        ) : (
          products?.map((product) => (
            <div
              key={product.productId}
              className="border shadow rounded-md p-4 max-w-full w-full mx-auto"
            >
              <div className="flex flex-col items-center">
                <h3
                  className={`${
                    isDarkMode ? "text-gray-50" : "text-gray-800"
                  } text-lg font-semibold`}
                >
                  {product.name}
                </h3>
                <p
                  className={`${
                    isDarkMode ? "text-gray-100" : "text-gray-800"
                  } text-sm mt-1`}
                >
                  ${product.price.toFixed(2)}
                </p>
                <div
                  className={`${
                    isDarkMode ? "text-gray-50" : "text-gray-600"
                  } text-sm mt-1`}
                >
                  Stock: {product.stockQuantity}
                </div>
                {product.rating && (
                  <div
                    className={`${
                      isDarkMode ? "text-gray-50" : "text-gray-600"
                    } flex items-center mt-2`}
                  >
                    <Rating rating={product.rating} />
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      <CreateProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreate={handleCreateProduct}
      />
    </div>
  );
};

export default Products;
