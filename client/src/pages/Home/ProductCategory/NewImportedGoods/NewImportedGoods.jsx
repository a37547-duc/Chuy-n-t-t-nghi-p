import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProductsClient } from "../../../../features/Client/ClientProductSlice";
import NewImportedLaptop from "./NewImportedLaptop/NewImportedLaptop";
// import NewImportedGamingGear from "./NewImportedGamingGear/NewImportedGamingGear";

const NewImportedGoods =() => {
  const dispatch = useDispatch();

  // Lấy dữ liệu từ Redux store
  const { products, loading, error } = useSelector((state) => state.clientProduct);

  useEffect(() => {
    dispatch(getAllProductsClient());
  }, [dispatch]);

  const GamingProducts = products.filter((product) => product.category?.name === "Gaming").slice(-10).reverse();
  const BusinessProducts = products.filter((product) => product.category?.name === "Business").slice(-10).reverse();
  const OfficeProducts = products.filter((product) => product.category?.name === "Office").slice(-10).reverse();
  const StudentProducts = products.filter((product) => product.category?.name === "Student").slice(-10).reverse();
  
  const limitedProducts = products.slice(-10).reverse();

  return (
    <div>
      {loading && (
        <div className="flex justify-center items-center mt-6">
          <svg className="animate-spin h-8 w-8 text-black-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v8H4z"
            ></path>
          </svg>
          <span className="ml-2 text-black-500">Loading...</span>
        </div>
      )}

      {error && (
        <div className="mt-4 p-4 bg-red-100 text-red-700 rounded">
          <p>Lỗi: {error.message || error}</p>
        </div>
      )}

      {!loading && !error && (
        <>
          <NewImportedLaptop 
            title="Laptop mới nhập"
            products={limitedProducts}
            bgColor="bg-pink-500"
          />

          <NewImportedLaptop 
            title="Laptop Gaming mới nhập"
            products={GamingProducts}
            bgColor="bg-[#D32F2F]"
          />

          <NewImportedLaptop 
            title="Laptop Business mới nhập"
            products={BusinessProducts}
            bgColor="bg-blue-700"
          />

          <NewImportedLaptop 
            title="Laptop Office mới nhập"
            products={OfficeProducts}
            bgColor="bg-gray-500"
          />

          <NewImportedLaptop 
            title="Laptop Student mới nhập"
            products={StudentProducts}
            bgColor="bg-green-500"
          />
        </>
      )}
      {/* <NewImportedGamingGear/> */}
    </div>
  );
}
export default  NewImportedGoods;