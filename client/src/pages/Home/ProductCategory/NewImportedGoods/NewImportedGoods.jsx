import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProductsClient } from "../../../../features/Client/ClientProductSlice";
import { getAllCategoriesClient } from "../../../../features/Client/ClientCategorySlice";
import NewImportedLaptop from "./NewImportedLaptop/NewImportedLaptop";

const NewImportedGoods =() => {
  const dispatch = useDispatch();
  const { products, loading: productsLoading, error: productsError } = useSelector((state) => state.clientProduct);
  const { data: categories, loading: categoriesLoading, error: categoriesError} = useSelector((state) => state.clientCategory);
  const colors = ["bg-[#D32F2F]", "bg-blue-700", "bg-gray-500", "bg-green-500"];
  useEffect(() => {
    dispatch(getAllProductsClient());
    dispatch(getAllCategoriesClient());
  }, [dispatch]);
  
  const getProductsByCategory = (categoryName) =>
    products.filter((product) => product.category?.name === categoryName).slice(-10).reverse();

  const categoryConfigs = categories.map((category, index) =>({
    title: `Laptop ${category.name} mới nhập`,
    categoryName: category.name,
    bgColor: colors[index % colors.length], // Thay đổi màu sắc tùy ý
    path: "/productList",
    search: `?categoryName=${category.name}`,
  }));
  
  return (
    <div>
      {(productsLoading || categoriesLoading) && (
        <div className="flex justify-center items-center my-6">
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

      {(productsError || categoriesError) && (
        <div className="mt-4 p-4 bg-red-100 text-red-700 rounded">
          <p>
            Lỗi: {productsError?.message || productsError || categoriesError?.message || categoriesError}
          </p>
        </div>
      )}

      {!productsLoading && !categoriesLoading && !productsError && !categoriesError && (
        <>
          <NewImportedLaptop 
            title="Laptop mới nhập"
            products={products.slice(-10).reverse()}
            bgColor="bg-pink-500"
            path="/productList"
          />

          {categoryConfigs.map((config, index) => {
            const filteredProducts = getProductsByCategory(config.categoryName);
            return (
              <NewImportedLaptop
                key={index}
                title={config.title}
                categoryName={config.categoryName}
                products={filteredProducts}
                bgColor={config.bgColor}
                path={config.path}
                search={config.search}
              />
            );
          })}
        </>
      )}
    </div>
  );
}
export default  NewImportedGoods;