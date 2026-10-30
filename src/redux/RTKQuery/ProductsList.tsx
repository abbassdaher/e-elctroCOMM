// import ProductInfo from "@/pages/ProductInfo";
// import { data } from "react-router-dom";
import CookieServices from "../../components/sevices/CookieServices";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const ProductsList = createApi({
  refetchOnReconnect: true,
  // refetchOnMountOrArgChange: true,
  reducerPath: "ProductsList",
  tagTypes: ["Products"],
  // baseQuery: fetchBaseQuery({ baseUrl: "https://dummyjson.com" }),
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:1337/api",
    // prepareHeaders: (headers) => {
    //   const token = CookieServices.getCookie("jwt");
    //   if (token) {
    //     headers.set("Authorization", `Bearer ${token}`);
    //   }
    //   // 👈 تم إزالة فرض application/json من هنا نهائياً لكي لا يدمر الـ FormData
    //   return headers;
    // },
  }),
  endpoints: (build) => ({
    getProductsList: build.query({
      query: () => `/products?populate=*&sort=productID:asc`,
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
          body: { data: updatedFields },

          headers: {
            Authorization: `Bearer ${CookieServices.getCookie("jwt")}`,
          },
        };
      },
      async onQueryStarted(
        { documentID, updatedFields },
        { dispatch, queryFulfilled },
      ) {
        const patchResult = dispatch(
          ProductsList.util.updateQueryData(
            "getProductsList",
            documentID,
            (draft) => {
              // البحث عن المنتج وتعديله داخل الـ Cache
              Object.assign(draft, updatedFields);
            },
          ),
        );

        try {
          // 2. انتظر حتى ينتهي طلب الشبكة الفعلي في الخلفية
          await queryFulfilled;
        } catch {
          // 3. إذا فشل الطلب بالسيرفر، قم بإلغاء التعديل فوراً (Rollback)
          patchResult.undo();

          // هنا يمكنك إظهار رسالة خطأ للمستخدم (مثلا Notification)
          console.error("فشل التحديث في السيرفر، تم التراجع عن التغيير!");
        }
      },
      // Auto-Refetching when editing a product
      invalidatesTags: [{ type: "Products", id: "LIST" }],
    }),
    // using form-data
    updateProductByDocumentID: build.mutation({
      query: ({ documentID, ...updatedFields }) => ({
        url: `/products/${documentID}`,
        method: "PUT",
        headers: {
          Authorization: `Bearer ${CookieServices.getCookie("jwt")}`,
        },
        body: { data: updatedFields },
      }),

      async onQueryStarted(
        { documentID, updatedFields },
        { dispatch, queryFulfilled },
      ) {
        const patchResult = dispatch(
          ProductsList.util.updateQueryData(
            "getProductsList",
            documentID,
            (draft) => {
              Object.assign(draft, updatedFields);
            },
          ),
        );
        console.log(patchResult);

        try {
          // 4️⃣ انتظار الاستجابة من السيرفر
          await queryFulfilled;
          console.log("تم التحديث بنجاح في السيرفر!");
        } catch {
          // 5️⃣ التراجع عن التعديل في حال حدوث خطأ
          patchResult.undo();
          console.error("فشل التحديث في السيرفر، تم التراجع عن التغيير!");
        }
      },
      invalidatesTags: [{ type: "Products", id: "LIST" }],
    }),
    createProduct: build.mutation({
      query: (newProduct) => ({
        url: `/products`,
        method: "POST",
        headers: {
          Authorization: `Bearer ${CookieServices.getCookie("jwt")}`,
        },
        body: { data: newProduct },
      }),
      // async onQueryStarted(
      //   { documentID, ...patch },
      //   { dispatch, queryFulfilled },
      // ) {
      //   const patchResult = dispatch(
      //     ProductsList.util.updateQueryData(
      //       "getProductsList",
      //       documentID,
      //       (draft) => {
      //         Object.assign(draft, patch);
      //       },
      //     ),
      //   );
      //   try {
      //     await queryFulfilled;
      //   } catch {
      //     patchResult.undo();
      //     console.error("فشل إنشاء المنتج في السيرفر!");
      //   }
      // },
      invalidatesTags: [{ type: "Products", id: "LIST" }],
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetProductsListQuery,
  useDeleteProductMutation,
  useEditProductbyDocumentIDMutation,
  useGetProductByIdQuery,
  useUpdateProductByDocumentIDMutation,
  useCreateProductMutation,
} = ProductsList;
