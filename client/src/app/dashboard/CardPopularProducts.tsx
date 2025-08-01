import { useGetDashboardMetricsQuery } from "../../redux/state/api";
import { useTranslation } from "react-i18next";
import { ShoppingBag } from "lucide-react";
import Rating from "../components/Rating";
import Loader from "../components/Loading";

const CardPopularProducts = () => {
  const { data: dashboardMetrics, isLoading } = useGetDashboardMetricsQuery();

  const { t } = useTranslation();

  return (
    <div className="row-span-3 xl:row-span-6 bg-white shadow-md rounded-2xl pb-16 text-gray-800">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <h3 className="text-lg font-semibold px-7 pt-5 pb-2 text-gray-800">
            {t("popularProducts")}
          </h3>
          <hr />
          <div className="overflow-auto h-full text-gray-800">
            {dashboardMetrics?.popularProducts?.length &&
              dashboardMetrics?.popularProducts.map((product) => (
                <div
                  key={product.productId}
                  className="flex items-center justify-between gap-3 px-5 py-7 border-b"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex flex-col justify-between gap-1">
                      <div className="font-bold text-gray-700">
                        {product.name}
                      </div>
                      <div className="flex text-sm items-center">
                        <span className="font-bold text-blue-500 text-xs">
                          ${product.price}
                        </span>
                        <span className="mx-2 text-gray-800">|</span>
                        <Rating rating={product.rating || 0} />
                      </div>
                    </div>
                  </div>

                  <div className="text-xs flex items-center">
                    <button
                      className="p-2 rounded-full bg-blue-100 text-blue-600 mr-2"
                      aria-label={`Add ${product.name} to cart`}
                    >
                      <ShoppingBag className="w-4 h-4" />
                    </button>
                    <p className="text-gray-800">
                      {Math.round(product.stockQuantity / 1000)}
                      {t("kSold")}
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </>
      )}
    </div>
  );
};

export default CardPopularProducts;
