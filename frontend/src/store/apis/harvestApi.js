import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


const harvestApi = createApi({
    reducerPath: "harvests",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:8080/api/harvest",
        prepareHeaders: (headers) => {
            const token = localStorage.getItem("token");
            if (token) {
                headers.set("Authorization", `Bearer ${token}`);
            }
            return headers;
        }
    }),
    tagTypes: ["Harvest"],
    endpoints(builder) {
        return {
            addFeedBack: builder.mutation({
                query: (result) => {
                    return {
                        url: "/feedback",
                        method: "POST",
                        body: result
                    };
                }
            }),
            addHarvest: builder.mutation({
                query: (harvest) => {
                    return {
                        url: "/add",
                        method: "POST",
                        body: harvest
                    };
                },
                invalidatesTags: (result, error, harvest) => [
                    {type: "Harvest", id: harvest.landId}
                ]
            }),
            fetchHarvests: builder.query({
                query: (land) => {
                    return {
                        url: "/fetch-land-harvest",
                        method: "POST",
                        body: land
                    };
                },
                providesTags: (result, error, land) => [
                    {type: "Harvest", id: land.id}
                ]
            }),
            removeHarvest: builder.mutation({
                query: ({harvest, harvestedOrDeleted, harvestAmount}) => {
                    return {
                        url: `/delete/${harvest.id}`,
                        method: "DELETE",
                        params: { harvestedOrDeleted, harvestAmount }
                    };
                },
                invalidatesTags: (result, error, harvest) => [
                    {type: "Harvest", id: harvest.landId}
                ]
            }),
            getPastHarvets: builder.query({
                query: (land) => {
                    return {
                        url: "/get-past-harvests",
                        method: "GET",
                        params: {adaNo: land.adaNo, parcelNo: land.parcelNo}
                    };
                },
                invalidatesTags: (result, error, land) => [
                    {type: "Harvest", id: land.id}
                ]

            })
        }
    }
});

export const { 
            useFetchHarvestsQuery,
            useAddHarvestMutation,
            useRemoveHarvestMutation,
            useAddFeedBackMutation,
            useGetPastHarvetsQuery
            } = harvestApi;

export { harvestApi };