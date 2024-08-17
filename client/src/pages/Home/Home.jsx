import Carousel from "./Carousel/Carousel";
import BestSeller from "./BestSeller/BestSeller";
import TaskBar from "./TaskBar/TaskBar";
import BackgroundImage from "./BackgroundImage/BackgroundImage";
import ProductCategory from "./ProductCategory/ProductCategory";

export default function Home() {
  return (
    <div>
      <BackgroundImage></BackgroundImage>
      <TaskBar></TaskBar>
      <BestSeller></BestSeller>
      <Carousel></Carousel>

      <ProductCategory></ProductCategory>
    </div>
  );
}
