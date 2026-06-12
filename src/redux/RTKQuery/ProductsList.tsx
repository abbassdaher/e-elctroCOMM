import CookieServices from "../../components/sevices/CookieServices";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const ProductsList = createApi({
  refetchOnReconnect: true,
  // refetchOnMountOrArgChange: true,
  reducerPath: "ProductsList",
  tagTypes: ["Products"],
  // baseQuery: fetchBaseQuery({ baseUrl: "https://dummyjson.com" }),
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:1337/api" }),
  endpoints: (build) => ({
    getProductsList: build.query({
      query: () => `/products`,
      providesTags: (result) =>
        // is result available?
        result
          ? // successful query
            [
              ...result.data.map(
                ({ id }: { id: number }) => ({ type: "Products", id }) as const,
              ),
              { type: "Products", id: "LIST" },
            ]
          : // an error occurred, but we still want to refetch this query when `{ type: 'Products', id: 'LIST' }` is invalidated
            [{ type: "Products", id: "LIST" }],
    }),
    getProductById: build.query({
      query: (id: number) => `/products/${id}`,
    }),
    deleteProduct: build.mutation({
      query(documentID: string) {
        return {
          url: `/products/${documentID}`,
          method: "DELETE",
          body: documentID,
          headers: {
            Authorization: `Bearer ${CookieServices.getCookie("jwt")}`,
          },
        };
      },
      // Auto-Refetching when deleting a product
      invalidatesTags: [{ type: "Products", id: "LIST" }],
    }),
    editProductbyDocumentID: build.mutation({
      query({ documentID, ...updatedFields }) {
        return {
          url: `/products/${documentID}`,
          method: "PUT",
          body: {
            data: updatedFields,
          },
          headers: {
            Authorization: `Bearer ${CookieServices.getCookie("jwt")}`,
          },
        };
      },
      // Auto-Refetching when editing a product
      invalidatesTags: ["Products"],
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetProductsListQuery,
  useDeleteProductMutation,
  useEditProductbyDocumentIDMutation,
} = ProductsList;
