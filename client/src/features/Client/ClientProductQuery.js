import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productApi = createApi({
  reducerPath: "productApi", // Đặt tên cho reducerPath
  baseQuery: fetchBaseQuery({ baseUrl: "https://laptech4k.onrender.com/api/v1" }), // Cấu hình baseUrl đúng
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: (params) => {
        // Chuyển params thành query string và lọc các tham số có giá trị thực sự
        const queryString = new URLSearchParams(
          Object.fromEntries(
            Object.entries(params).filter(([key, value]) => value != null && value !== '')
          )
        ).toString(); // Lọc các tham số có giá trị thực sự

        return `/products?${queryString ? queryString : ''}`; // Thêm query string vào URL nếu có
      },
    }),
  }),
});

export const { useGetAllProductsQuery } = productApi;
