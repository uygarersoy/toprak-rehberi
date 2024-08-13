import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const locationApi = createApi({
    reducerPath: "location",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:8080/api/location"
    }),
    endpoints(builder) {
        return {
            fetchProvinces: builder.query({
                query: () => {
                    return {
                        url: "/province",
                        method: "GET"
                    };
                }
            }),
            fetchDistricts: builder.query({
                query: (provinceId) => {
                    return {
                        url: "/district",
                        method: "GET",
                        params: {
                            provinceId: provinceId  
                        }
                    };
                }
            }),
            fetchNeighborhoods: builder.query({
                query: (districtId) => {
                    return {
                        url: "/neighborhood",
                        method: "GET",
                        params: {
                            districtId: districtId
                        }
                    };
                }
            })
        };
    }
});

export const { useFetchProvincesQuery, useFetchDistrictsQuery, useFetchNeighborhoodsQuery } = locationApi;
export { locationApi };