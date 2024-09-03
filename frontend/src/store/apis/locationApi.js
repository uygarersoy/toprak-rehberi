import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const locationApi = createApi({
    reducerPath: "location",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:8080/api/location",
        prepareHeaders: (headers) => {
            const token = localStorage.getItem("token");
            if (token) {
                headers.set("Authorization", `Bearer ${token}`);
            }
            return headers;
        }
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
            }),
            getLocationInformation: builder.query({
                query: (neighborhoodId) => {
                    return {
                        url: "/location-info",
                        method: "GET",
                        params: {
                            neighborhoodId
                        }
                    };
                }
            })
        };
    }
});

export const { 
    useFetchProvincesQuery,
    useFetchDistrictsQuery,
    useFetchNeighborhoodsQuery,
    useGetLocationInformationQuery
    } = locationApi;
export { locationApi };