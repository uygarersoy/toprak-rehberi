import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const productSuccessApi = createApi({
    reducerPath: "productSuccess",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:8080/api/product-success",
        prepareHeaders: (headers) => {
            const token = localStorage.getItem("token");
            if (token) {
                headers.set("Authorization", `Bearer ${token}`);
            }
            return headers;
        }
    }),
    tagTypes: ["Guideness"],
    endpoints(builder) {
        return {
            fetchGuideness: builder.query({
                query: ({neighborhoodId, season}) => {
                    return {
                        url: "/guide",
                        method: "GET",
                        params: {
                            neighborhoodId: neighborhoodId,
                            season: season
                        }
                    };
                },
                providesTags: (result, error, {neighborhoodId}) => [{type: "Guideness", id: neighborhoodId}]
            }),
            updateProductSuccessValues: builder.mutation({
                query: (parameters) => {
                    return {
                        url: "/update",
                        method: "PUT",
                        params: {
                            neighborhoodId: parameters.neighborhoodId,
                            productId: parameters.productId,
                            satisfaction: parameters.satisfaction,
                            area: parameters.area,
                            productName: parameters.productName
                        }                           
                    };
                },
                invalidatesTags: (result, error, parameters) => [
                    {type: "Guideness", id: `${parameters.neighborhoodId}:${parameters.productId}`},
                    {type: "Guideness", id: parameters.neighborhoodId}]
            }),
            getProductSuccessValue: builder.query({
                query: ({ neighborhoodId, productId }) => {
                    return {
                        url: "/get-success-value",
                        method: "GET",
                        params: {
                            neighborhoodId,
                            productId
                        }
                    };
                },
                providesTags: (result, error, {neighborhoodId, productId}) => [{type: "Guideness", id: `${neighborhoodId}:${productId}`}]
            })
        };
    }
})

export const { useFetchGuidenessQuery, useUpdateProductSuccessValuesMutation, useGetProductSuccessValueQuery } = productSuccessApi;
export { productSuccessApi };