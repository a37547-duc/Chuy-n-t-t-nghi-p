// import Carousel from "./Carousel/Carousel";
// import BestSeller from "./BestSeller/BestSeller";
// import TaskBar from "./TaskBar/TaskBar";
// import BackgroundImage from "./BackgroundImage/BackgroundImage";
// import ProductCategory from "./ProductCategory/ProductCategory";

// export default function Home() {
//   return (
//     <div>
//       <BackgroundImage></BackgroundImage>
//       <TaskBar></TaskBar>
//       <BestSeller></BestSeller>
//       <Carousel></Carousel>

//       <ProductCategory></ProductCategory>
//     </div>
//   );
// }

import Carousel from "./Carousel/Carousel";
import BestSeller from "./BestSeller/BestSeller";
import TaskBar from "./TaskBar/TaskBar";
import BackgroundImage from "./BackgroundImage/BackgroundImage";
import ProductCategory from "./ProductCategory/ProductCategory";

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      <div className="relative w-full h-[566px]">
        <BackgroundImage />
        <TaskBar />
      </div>
      <div className="relative z-10 w-full">
        <BestSeller />
        <Carousel />
        <ProductCategory />
      </div>
    </div>
  );
}
