import { useState, useEffect } from 'react';
import ProductListSideBar from '../ProductListSideBar/ProductListSideBar';
import ProductListShow from './ProductListShow/ProductListShow';

const ProductList =() => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="bg-[#F5F5F5]">
      <div className="flex justify-center mx-auto">
        <div className="flex w-full max-w-[1100px] h-420px flex-nowrap md:my-6 md:p-6">
          {!isMobile && (
            <div className="w-[20%] flex-shrink-0 pl-[5px] rounded overflow-y-auto">
              <ProductListSideBar />
            </div>
          )}

          <div className="w-full md:w-[80%] flex-grow min-w-0 h-full overflow-hidden mx-[10px] rounded">
            <ProductListShow />
          </div>
        </div>
      </div>
    </div>
  );
}
export default ProductList;