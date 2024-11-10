/* eslint-disable react/prop-types */
import { useMemo } from "react";

const DetailsProduct = ({ data, selectedVariant }) => {
  const productDetails = useMemo(() => {
    if (!data || !selectedVariant) return {
      brand: "N/A",
      color: "N/A",
      cpu: "N/A",
      gpu: "N/A",
      ram: "N/A",
      storage: "N/A",
    };

    return {
      brand: data.product?.brand?.name || "N/A",
      color: selectedVariant.color || "N/A",
      cpu: selectedVariant.cpu?.name || "N/A",
      gpu: selectedVariant.gpu?.name || "N/A",
      ram: selectedVariant.ram?.capacity || "N/A",
      storage: selectedVariant.storage || "N/A",
    };
  }, [data, selectedVariant]);

  const labels = [
    "Thương hiệu",
    "Màu sắc",
    "CPU",
    "GPU",
    "RAM",
    "Bộ nhớ",
  ];

  const values = [
    productDetails.brand,
    productDetails.color,
    productDetails.cpu,
    productDetails.gpu,
    productDetails.ram,
    productDetails.storage,
  ];

  return (
    <div className="w-full md:w-[40%] flex-grow min-w-0 h-full overflow-hidden mx-[10px]">
      <div className="h-[56px] flex px-4">
        <div className="py-4 font-bold text-[20px]">Chi tiết sản phẩm</div>
      </div>
      <div className="p-4">
        {labels.map((label, index) => (
          <div key={index}>
            {index === 2 && (
              <div className="text-[13px] w-full bg-blue-100 text-center py-2 px-4 font-bold">
                Thông tin chung
              </div>
            )}

            <div
              className={`text-[13px] flex py-2 px-4 ${
                index % 2 === 0 ? "bg-gray-100" : "bg-white"
              }`}
            >
              <div className="h-[30%] flex-grow-2 flex-shrink-1 basis-0">{label}</div>
              <div className="h-[70%] flex-grow-3 flex-shrink-1 basis-0">{values[index]}</div>
            </div>

            {index === 3 && (
              <div className="text-[13px] w-full bg-blue-100 text-center py-2 px-4 font-bold">
                Cấu hình chi tiết
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DetailsProduct;
