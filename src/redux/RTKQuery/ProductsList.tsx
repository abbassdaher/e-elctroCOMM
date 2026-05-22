import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const ProductsList = createApi({
  reducerPath: "ProductsList",
  baseQuery: fetchBaseQuery({ baseUrl: "https://dummyjson.com" }),
  endpoints: (build) => ({
    getProductsList: build.query({
      query: () => `/products`,
    }),
    getProductById: build.query({
      query: (id: number) => `/products/${id}`,
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetProductsListQuery } = ProductsList;
