import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateProduct } from "../../../features/Admin/adminProductsSlice";
import { getAllBrands } from "../../../features/brand/brandsSlice";
import { getAllCategories } from "../../../features/Category/categoriesSlice";
import { getAllUseCase } from "../../../features/usecase/usecaseSlice";
import { getAllProducts } from "../../../features/product/productsSlice";
import ImageUpload from "../../images/ImageUpload";

const UpdateProduct = ({ onClose, data }) => {
  const dispatch = useDispatch();
  const { categories, loading: loadingCategories } = useSelector((state) => state.category);
  const { brands, loading: loadingBrands } = useSelector((state) => state.brand);
  const { useCases, loading: loadingUseCases } = useSelector((state) => state.useCase);
  const { register, handleSubmit, setValue, formState: { errors } } = useForm({
    defaultValues: {
      name: data?.name || "",
      category: data?.category?._id || "",
      brand: data?.brand?._id || "",
      description: data?.description || "",
      use_case_ids: data?.use_cases?._id || "",
      images: data?.images || [],
    },
  });

  const handleImageUpload = (url) => {
    setValue("images", [url]);
  };

  useEffect(() => {
    dispatch(getAllCategories());
    dispatch(getAllBrands());
    dispatch(getAllUseCase());
  }, [dispatch]);

  const onSubmit = async (formData) => {
    console.log(formData)
    try {
      await dispatch(updateProduct({ id: data._id, updatedProduct: formData })).unwrap();
      setTimeout(() => {
        dispatch(getAllProducts());
      }, 2000);
      onClose();
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <h2 className="mb-4 text-xl font-semibold tracking-wide">Cập nhật sản phẩm</h2>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium">Tên sản phẩm</label>
          <input
            type="text"
            {...register("name", { required: "Tên sản phẩm là bắt buộc" })}
            className={`mt-1 block w-full border ${errors.name ? 'border-red-500' : 'border-gray-300'} focus:border-2 focus:border-blue-500 focus:outline-none rounded-md p-2`}
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium">Nhu cầu sử dụng</label>
          <select
            {...register("use_case_ids", { required: "Nhu cầu sử dụng là bắt buộc" })}
            className={`mt-1 block w-full border ${errors.use_case_ids ? 'border-red-500' : 'border-gray-300'} focus:border-2 focus:border-blue-500 focus:outline-none rounded-md p-2`}
          >
            <option disabled value="">Chọn nhu cầu sử dụng</option>
            {loadingUseCases ? (
              <option disabled>Đang tải...</option>
            ) : (
              useCases.map((useCase) => (
                <option key={useCase._id} value={useCase._id}>
                  {useCase.name}
                </option>
              ))
            )}
          </select>
          {errors.use_case_ids && <p className="text-red-500 text-sm">{errors.use_case_ids.message}</p>}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium">Danh mục</label>
          <select
            {...register("category", { required: "Danh mục là bắt buộc" })}
            className={`mt-1 block w-full border ${errors.category ? 'border-red-500' : 'border-gray-300'} focus:border-2 focus:border-blue-500 focus:outline-none rounded-md p-2`}
          >
            <option disabled value="">Chọn danh mục</option>
            {loadingCategories ? (
              <option disabled>Đang tải...</option>
            ) : (
              categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))
            )}
          </select>
          {errors.category && <p className="text-red-500 text-sm">{errors.category.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium">Thương hiệu</label>
          <select
            {...register("brand", { required: "Thương hiệu là bắt buộc" })}
            className={`mt-1 block w-full border ${errors.brand ? 'border-red-500' : 'border-gray-300'} focus:border-2 focus:border-blue-500 focus:outline-none rounded-md p-2`}
          >
            <option disabled value="">Chọn thương hiệu</option>
            {loadingBrands ? (
              <option disabled>Đang tải...</option>
            ) : (
              brands.map((brand) => (
                <option key={brand._id} value={brand._id}>
                  {brand.name}
                </option>
              ))
            )}
          </select>
          {errors.brand && <p className="text-red-500 text-sm">{errors.brand.message}</p>}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium">Mô tả</label>
        <textarea
          {...register("description")}
          className="mt-1 block w-full border border-gray-300 focus:border-2 focus:border-blue-500 focus:outline-none rounded-md p-2"
          rows="4"
        ></textarea>
      </div>

      <div>
        <label className="block text-sm font-medium"></label>
        <ImageUpload onUpload={handleImageUpload} existingImages={data.images} />
      </div>

      <div className="flex justify-end space-x-2">
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Cập nhật sản phẩm
        </button>
        <button
          type="button"
          onClick={onClose}
          className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
        >
          Đóng
        </button>
      </div>
    </form>
  );
};

export default UpdateProduct;
