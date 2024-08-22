import ProductDetailTop from "./ProductDetailTop/ProductDetailTop";
import ProductDetailMiddle from "./ProductMiddle/ProductMiddle";

export default function ProductDetail() {
  return (
    <div className="bg-[#F5F5F5]">
      <div>
        <ProductDetailTop />
      </div>
      <div className="mb-6">

      </div>
      <div className="mb-4">
        <ProductDetailMiddle />
      </div>
    </div>
  );
}
