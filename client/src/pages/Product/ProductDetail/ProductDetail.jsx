import ProductDetailTop from "./ProductDetailTop/ProductDetailTop";
import ProductDetailMiddle from "./ProductMiddle/ProductMiddle";

export default function ProductDetail() {
  return (
    <div className="bg-[#F5F5F5]">      
      <div className="mb-6">
        <ProductDetailTop />
      </div>
      <div className="mb-4">
        <ProductDetailMiddle />
      </div>
    </div>
  );
}
