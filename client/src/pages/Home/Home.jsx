import Carousel from "./Carousel/Carousel";
import BestSeller from "./BestSeller/BestSeller";
import TaskBar from "./TaskBar/TaskBar";
import BackgroundImage from "./BackgroundImage/BackgroundImage";
import ProductCategory from "./ProductCategory/ProductCategory";
import ImageColumn from "./ImageColumn/ImageColumn";
import ImageRow from "./ImageRow/ImageRow";
import LogonButton from "./LogoButton/LogoButton";

// import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Home() {
  // const navigate = useNavigate();
  // const link = Link();

  return (
    <div>
      <BackgroundImage />
      <div className="flex justify-center mx-auto">
        <div className="flex w-full max-w-[1100px] h-[420px] flex-nowrap">
          <div className="w-[200px] flex-shrink-0 pl-[5px]">
            <TaskBar />
          </div>
          <div className="flex-grow min-w-0 h-full overflow-hidden mx-[10px] z-10">
            {/* <button onClick={() => navigate('/product')} className="btn-primary bg-[#fff]">
              Go to Product Detail
            </button> */}
            <Link to="/productDetails" className="bg-[#fff]">
              Xem chi tiết sản phẩm
            </Link>
            <Link to="/productList" className="bg-[#fff] ml-1">
              Danh sách sản phẩm
            </Link>
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
            <h2 className="text-[24px] font-bold my-[20px] mx-[10px]">Laptop - Máy tính xách tay</h2>
          </div>
          <div>
            <LogonButton />
          </div>
        </div>
      </div>
      <ProductCategory />
      <BestSeller />
      <Carousel />
    </div>
  );
}


// export default function Home() {
//   return (
//     <div>
//       <BackgroundImage />
//       <div style={{ width: '80%', height: '430px', display: 'flex', justifyContent: 'center', textAlign: 'center', margin: '0 auto' }}>
//         <div style={{ width: '200px'}}>
//           <TaskBar />
//         </div>
//         <div style={{ flexGrow: 1, height: '100%', margin: '0 10px' }}>
//           {/* Thêm nội dung cho phần giữa ở đây */}
//         </div>
//         <div style={{ width: '200px'}}>
//           <ImageRow />
//         </div>
//       </div>
//       <div style={{display: 'flex', width: '80%', height:'100px', margin:'0 auto'}}>
//         <ImageColumn />
//       </div>
//       <ProductCategory />
//       <BestSeller />
//       <Carousel />
      
//     </div>
//   );
// }
