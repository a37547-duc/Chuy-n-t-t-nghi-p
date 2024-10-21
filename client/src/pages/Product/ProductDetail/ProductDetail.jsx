import ProductDetailTop from "./ProductDetailTop/ProductDetailTop";
import ProductDetailMiddle from "./ProductMiddle/ProductMiddle";
import { useLocation } from "react-router-dom";
import { useEffect } from 'react';


export default function ProductDetail() {
  const location = useLocation();
  const product = location.state?.product;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="px-2 bg-[#F5F5F5]">      
      <div className="mb-6">
        <ProductDetailTop product={product} />
      </div>
      <div className="mb-4">
        <ProductDetailMiddle product={product} />
      </div>
    </div>
  );
}
