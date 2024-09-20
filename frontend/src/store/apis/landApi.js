import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const landApi = createApi({
    reducerPath: "lands",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:8080/api/land",
        prepareHeaders: (headers) => {
            const token = localStorage.getItem("token");
            if (token) {
                headers.set("Authorization", `Bearer ${token}`);
            }
            return headers;
        }
    }),
    tagTypes: ["Land"],
    endpoints(builder) {
        return {
            addLand: builder.mutation({
                query: (land) => {
                    return {
                        url: "/add",
                        method: "POST",
                        body: land
                    };
                },
                invalidatesTags: ["Land"]
            }),
            fetchLands: builder.query({
                query: (user) => {
                    return {
                        url: "/fetch-user-lands",
                        method: "POST",
                        body: user
                    };
                },
                providesTags: ["Land"]
            }),
            removeLand: builder.mutation({
                query: (landId) => {
                    return {
                        url: `/${landId}`,
                        method: "DELETE"
                    };
                },
                invalidatesTags: ["Land"]
            }),
            fetchLandTypes: builder.query({
                query: () => {
                    return {
                        url: "/land-type",
                        method: "GET"
                    };
                },
            }),
            updateLand: builder.mutation({
                query: ({landId, sign, area }) => {
                    return {
                        url: "/update-land",
                        method: "PUT",
                        params: {
                            landId,
                            sign,
                            area
                        },
                    };
                },
                invalidatesTags: ["Land"]
            }),
        };
    }
});


export const { useAddLandMutation, useFetchLandsQuery, useRemoveLandMutation, useFetchLandTypesQuery, useUpdateLandMutation } = landApi;
export { landApi };