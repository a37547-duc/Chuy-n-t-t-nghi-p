import Carousel from "./Carousel/Carousel";
import BestSeller from "./BestSeller/BestSeller";
import TaskBar from "./TaskBar/TaskBar";
import BackgroundImage from "./BackgroundImage/BackgroundImage";
import ProductCategory from "./ProductCategory/ProductCategory";
import ImageColumn from "./ImageColumn/ImageColumn";
import ImageRow from "./ImageRow/ImageRow";
import LogonButton from "./LogoButton/LogoButton";

export default function Home() {
  return (
    <div>
      <BackgroundImage />
      <div style={{ display: 'flex', justifyContent: 'center', margin: '0 auto' }}>
        <div style={{ display: 'flex', width: '100%', maxWidth: '1100px', height: '420px', flexWrap: 'nowrap' }}>
          <div style={{ width: '200px', flexShrink: 0,paddingLeft:'5px' }}>
            <TaskBar />
          </div>
          <div style={{ flexGrow: 1, minWidth: '0', height: '100%', margin: '0 10px', overflow: 'hidden' }}>
            {/* Nội dung phần giữa */}
          </div>
          <div style={{ width: '200px', flexShrink: 0, paddingRight:'5px' }}>
            <ImageRow />
          </div>
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', margin: '0 auto' }}>
        <div style={{ width: '100%', maxWidth: '1100px', height: '136px' }}>
          <ImageColumn />
        </div>
      </div>
      <div style={{marginTop:'50px', marginBottom:'20px'}}>
        <div style={{maxWidth:'1100px', margin:'0 auto'}}>
          <div>
            <h2 style={{fontSize:'24px', fontWeight:'700', margin:'20px 10px'}}>Laptop - Máy tính xách tay</h2>
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
