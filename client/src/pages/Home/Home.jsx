import React from "react";
import Carousel from "./Carousel/Carousel";
import BestSeller from "./BestSeller/BestSeller";
import ProductCategory from "./ProductCategory/ProductCategory";

export default function Home() {
  return (
    <div>
      <Carousel></Carousel>
      <BestSeller></BestSeller>
      <ProductCategory></ProductCategory>
    </div>
  );
}
