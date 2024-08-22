import TaskBar from "./TaskBar/TaskBar";
import BackgroundImage from "./BackgroundImage/BackgroundImage";
import ImageColumn from "./ImageColumn/ImageColumn";
import ImageRow from "./ImageRow/ImageRow";
import LogonButton from "./LogoButton/LogoButton";
import BusinessLaptop from "./ProductCategory/BusinessLaptop/BusinessLaptop";
import GamingLaptop from "./ProductCategory/GamingLaptop/GamingLaptop";
import PcFlex from "./ProductCategory/PcFlex/PcFlex";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center space-y-6 ">
      <div className="w-full h-[635px]">
        <div className=" relative w-full h-[566px]  flex items-center justify-center ">
          <BackgroundImage />

          <div className="w-10/12 h-full  flex items-center justify-between">
            <TaskBar />
            <ImageRow />
          </div>
          <ImageColumn />
        </div>
      </div>
      <LogonButton />
      <BusinessLaptop></BusinessLaptop>
      <GamingLaptop></GamingLaptop>
      <PcFlex></PcFlex>
    </div>
  );
}
