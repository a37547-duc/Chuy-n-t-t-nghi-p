import ProductDetailTop from "./ProductDetailTop/ProductDetailTop";
import ProductDetailMiddle from "./ProductMiddle/ProductMiddle";
import { useParams } from "react-router-dom";
import { useEffect, useState } from 'react';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`https://laptech4k.onrender.com/api/v1/products/${id}`);
        const data = await response.json();
        setProduct(data);
        setSelectedVariant(data.variants[0]); // Chọn variant mặc định
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu sản phẩm:", error);
      }
    };

    fetchProduct();
    window.scrollTo(0, 0);
  }, [id]);

  if (!product) {
    return <div>Đang tải dữ liệu sản phẩm...</div>;
  }

  return (
    <div className="px-2 bg-[#F5F5F5]">      
      <div className="mb-6">
        <ProductDetailTop product={product} onVariantChange={setSelectedVariant}/>
      </div>
      <div className="mb-4">
        <ProductDetailMiddle product={product} selectedVariant={selectedVariant}/>
      </div>
    </div>
  );
}

export default ProductDetail;