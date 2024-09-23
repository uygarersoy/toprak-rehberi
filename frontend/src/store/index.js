import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { removeUser, userReducer } from "./slices/userSlice";
import { landApi } from "./apis/landApi";
import { harvestApi } from "./apis/harvestApi";
import { locationApi } from "./apis/locationApi";
import { productApi } from "./apis/productApi";
import { productSuccessApi } from "./apis/productSuccessApi";

const store = configureStore({
    reducer: {
        user: userReducer,
        [landApi.reducerPath]: landApi.reducer,
        [harvestApi.reducerPath]: harvestApi.reducer,
        [locationApi.reducerPath]: locationApi.reducer,
        [productApi.reducerPath]: productApi.reducer,
        [productSuccessApi.reducerPath]: productSuccessApi.reducer
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(landApi.middleware).concat(harvestApi.middleware)
            .concat(locationApi.middleware).concat(productApi.middleware).concat(productSuccessApi.middleware);
    }
});

setupListeners(store.dispatch);

export { store };
export * from "./thunks/fetchUser";
export * from "./thunks/registerUser";
export * from "./thunks/updateUser";
export { removeUser };
export { useAddLandMutation, useFetchLandsQuery, useRemoveLandMutation, useFetchLandTypesQuery, useUpdateLandMutation } from "./apis/landApi";
export { useFetchHarvestsQuery, useAddHarvestMutation, useRemoveHarvestMutation, useAddFeedBackMutation, useGetPastHarvetsQuery } from "./apis/harvestApi";
export { useFetchProvincesQuery, useFetchDistrictsQuery, useFetchNeighborhoodsQuery, useGetLocationInformationQuery } from "./apis/locationApi";
export { useFetchProductsQuery } from "./apis/productApi";
export { useFetchGuidenessQuery, useUpdateProductSuccessValuesMutation, useGetProductSuccessValueQuery } from "./apis/productSuccessApi";
