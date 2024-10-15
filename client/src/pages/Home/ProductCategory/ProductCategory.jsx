import NewImportedGoods from "./NewImportedGoods/NewImportedGoods";
import FeaturedProducts from "./FeaturedProducts/FeaturedProducts";
// eslint-disable-next-line no-unused-vars
import { Link } from "react-router-dom";
const ProductCategory =() => {
  return (
    <div>
      <NewImportedGoods/>
      <FeaturedProducts/>
    </div>
  );
}
export default  ProductCategory;