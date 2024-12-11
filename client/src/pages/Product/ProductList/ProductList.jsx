import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { resetFilter } from "../../../features/Client/ClientFilterSlice";
import { useGetAllProductsQuery, useGetBrandsQuery, useGetCategoriesQuery } from "../../../features/Client/ClientProductQuery";
import ProductListSideBar from "../ProductListSideBar/ProductListSideBar";
import GeneralProductMiddle from "../../../components/product/GeneralProductMiddle/GeneralProductMiddle";
import GeneralProductDown from "../../../components/product/GeneralProductDown/GeneralProductDown";
import BrandImageLogo from "../../../components/BrandImageLogo/BrandImageLogo";
import OnDemand from "../../../components/product/OnDemand/OnDemand";

const ProductList = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { state } = location;

  const isFromTaskbar = state?.from === "Taskbar";
  const isFromLogoButton = state?.from === "LogoButton";
  
  const { categoryName, brandName, searchName } = useSelector((state) => state.filter);
  const searchParams = new URLSearchParams(location.search);
  const params = {
    brandName: brandName || searchParams.get("brandName") || null,
    categoryName: categoryName || searchParams.get("categoryName") || null,
    searchName: searchName || searchParams.get("searchName") || null,
  };

  const { data: products = [], isError, error } = useGetAllProductsQuery(params);
  const { data: logos } = useGetBrandsQuery();
  const { data: logoCategory } = useGetCategoriesQuery();

  const [productsState, setProductsState] = useState(products);

  // Kiểm tra lỗi và cập nhật productsState thành mảng rỗng nếu có lỗi
  useEffect(() => {
    if (isError) {
      setProductsState([]);
    } else if (products.length > 0) {
      setProductsState(products); // Cập nhật dữ liệu sản phẩm khi không có lỗi
    }
  }, [isError, error, products]);

  useEffect(() => {window.scrollTo(0, 0);}, [location]);

  useEffect(() => {
    // console.log("Current Path:", location.pathname);
    if (location.pathname === "/") {
      console.log("Resetting filters...");
      dispatch(resetFilter());
    }
  }, [location.pathname, location.key, dispatch]);

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
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
          {isFromTaskbar ? (
              <div className="opacity-100 bg-white mb-0 p-3 px-4">
                <div className="flex items-baseline justify-start flex-wrap opacity-100 bg-white">
                  <h1 className="text-xl leading-8 font-bold text-[#434657]">
                    Laptop - {params.categoryName || params.brandName || "Máy tính xách tay"}
                  </h1>
                  <div className="pl-2 border-none border border-transparent opacity-100 text-[#82869e] font-normal no-underline text-[20px] leading-[28px] overflow-hidden transition-colors duration-300">
                    ({productsState.length > 0 ? productsState.length : 0} sản phẩm)
                  </div>
                </div>
                <BrandImageLogo image={logos?.brands || []} />
              </div>
            ) : isFromLogoButton ? (
              <div className="opacity-100 bg-white mb-0 p-3 px-4">
                <div className="flex items-baseline justify-start flex-wrap opacity-100 bg-white">
                  <h1 className="text-xl leading-8 font-bold text-[#434657]">
                  Laptop - {params.brandName || params.categoryName || "Máy tính xách tay"}
                  </h1>
                  <div className="pl-2 border-none border border-transparent opacity-100 text-[#82869e] font-normal no-underline text-[20px] leading-[28px] overflow-hidden transition-colors duration-300">
                    ({productsState.length > 0 ? productsState.length : 0} sản phẩm)
                  </div>
                </div>
                <OnDemand choose={logoCategory?.category || []} />
              </div>
            ) : (
              <div className="opacity-100 bg-white mb-0 p-3 px-4">
                <div className="flex items-baseline justify-start flex-wrap opacity-100 bg-white">
                  <h1 className="text-xl leading-8 font-bold text-[#434657]">
                    Laptop - Máy tính xách tay
                  </h1>
                  <div className="pl-2 border-none border border-transparent opacity-100 text-[#82869e] font-normal no-underline text-[20px] leading-[28px] overflow-hidden transition-colors duration-300">
                    ({productsState.length > 0 ? productsState.length : 0} sản phẩm)
                  </div>
                </div>
                <BrandImageLogo image={logos?.brands || []} />
                <OnDemand choose={logoCategory?.category || []} />
              </div>
            )}
            <GeneralProductMiddle data={productsState} />
            <GeneralProductDown data={productsState} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
