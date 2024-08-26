import TaskBar from "./TaskBar/TaskBar";
import BackgroundImage from "./BackgroundImage/BackgroundImage";
import ImageColumn from "./ImageColumn/ImageColumn";
import ImageRow from "./ImageRow/ImageRow";
import LogonButton from "./LogoButton/LogoButton";
import BusinessLaptop from "./ProductCategory/BusinessLaptop/BusinessLaptop";
import GamingLaptop from "./ProductCategory/GamingLaptop/GamingLaptop";
import PcFlex from "./ProductCategory/PcFlex/PcFlex";
import { Link } from 'react-router-dom';


export default function Home() {
  // const navigate = useNavigate();
  // const link = Link();

  return (
    <div className="flex flex-col items-center justify-center space-y-6 ">
      <div className="w-full h-[635px]">
        <div className=" relative w-full h-[566px]  flex items-center justify-center ">
          <BackgroundImage />

          <div className="w-10/12 h-full  flex items-center justify-between">
            <TaskBar />
          </div>
          <div className="flex-grow min-w-0 h-full overflow-hidden mx-[10px] z-10">
            {/* <button onClick={() => navigate('/product')} className="btn-primary bg-[#fff]">
              Go to Product Detail
            </button> */}
            <Link to="/product" className="bg-[#fff]">
              Xem chi tiết sản phẩm
            </Link>
          </div>
          <div className="w-[200px] flex-shrink-0 pr-[5px]">
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
