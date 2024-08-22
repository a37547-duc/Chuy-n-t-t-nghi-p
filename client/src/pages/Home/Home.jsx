import Carousel from "./Carousel/Carousel";
import BestSeller from "./BestSeller/BestSeller";
import TaskBar from "./TaskBar/TaskBar";
import BackgroundImage from "./BackgroundImage/BackgroundImage";
import ProductCategory from "./ProductCategory/ProductCategory";
import ImageColumn from "./ImageColumn/ImageColumn";
import ImageRow from "./ImageRow/ImageRow";
import LogonButton from "./LogoButton/LogoButton";
import BusinessLaptop from "./ProductCategory/BusinessLaptop/BusinessLaptop";

export default function Home() {
  return (
    <div>
      <BackgroundImage />
      <div className="flex justify-center mx-auto">
        <div className="flex w-full max-w-[1100px] h-[420px] flex-nowrap">
          <div className="w-[200px] flex-shrink-0 pl-[5px]">
            <TaskBar />
          </div>
          <div className="flex-grow min-w-0 h-full overflow-hidden mx-[10px]">
            {/* Nội dung phần giữa */}
          </div>
          <div className="w-[200px] flex-shrink-0 pr-[5px]">
            <ImageRow />
          </div>
        </div>
      </div>
      <div className="flex justify-center mx-auto">
        <div className="w-full max-w-[1100px] h-[136px]">
          <ImageColumn />
        </div>
      </div>
      <div className="mt-[50px] mb-[20px]">
        <div className="max-w-[1100px] mx-auto">
          <div>
            <h2 className="text-[24px] font-bold my-[20px] mx-[10px]">
              Laptop - Máy tính xách tay
            </h2>
          </div>
          <div>
            <LogonButton />
          </div>
        </div>
      </div>
      <BusinessLaptop></BusinessLaptop>
    </div>
  );
}
