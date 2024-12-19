import ProductDetailTop from "./ProductDetailTop/ProductDetailTop";
import ProductDetailMiddle from "./ProductMiddle/ProductMiddle";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { setOriginalPrice } from "../../../features/Client/discountSlice";
import { useDispatch } from "react-redux";

const ProductDetail = () => {
  const { id } = useParams(); // Lấy ID từ URL
  const [product, setProduct] = useState(null); // Trạng thái sản phẩm
  const [selectedVariant, setSelectedVariant] = useState(null); // Biến thể được chọn
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        // Fetch dữ liệu sản phẩm từ API
        const response = await fetch(`https://laptech4k.onrender.com/api/v1/products/${id}`);

        if (!response.ok) {throw new Error(`Failed to fetch product: ${response.statusText}`);}

        const data = await response.json();

        // Cập nhật sản phẩm và biến thể mặc định
        setProduct(data);
        const initialVariant = data?.variants?.[0] || null;
        setSelectedVariant(initialVariant);

        // Cập nhật giá gốc vào Redux nếu biến thể mặc định tồn tại
        if (initialVariant && initialVariant.price) {
          dispatch(setOriginalPrice(initialVariant.price));
        }
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu sản phẩm:", error);
      }
    };

    fetchProduct();
    window.scrollTo(0, 0);
  }, [id, dispatch]);

  // Kiểm tra sản phẩm trước khi render
  if (!product) {
    return (
      <div className="flex justify-center items-center mt-6 min-h-[500px]">
        <svg
          className="animate-spin h-8 w-8 text-blue-500"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v8H4z"
          ></path>
        </svg>
        <span className="ml-2 text-blue-500">Loading...</span>
      </div>
    );
  }

  return (
    <div className="px-2 bg-[#F5F5F5]">
      <div className="mb-6">
        <ProductDetailTop
          product={product}
          onVariantChange={(variant) => {
            setSelectedVariant(variant);

            // Cập nhật giá gốc khi biến thể thay đổi
            if (variant && variant.price) {
              dispatch(setOriginalPrice(variant.price));
            }
          }}
        />
      </div>
      <div className="mb-4">
        <ProductDetailMiddle
          product={product}
          selectedVariant={selectedVariant}
        />
      </div>
    </div>
  );
};

export default ProductDetail;