import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { removeUser, userReducer } from "./slices/userSlice";
import { fieldsApi } from "./apis/fieldApi";
import { harvestApi } from "./apis/harvestApi";
import { locationApi } from "./apis/locationApi";
import { productApi } from "./apis/productApi";
import { fractionApi } from "./apis/fractionApi";

const store = configureStore({
    reducer: {
        user: userReducer,
        [fieldsApi.reducerPath]: fieldsApi.reducer,
        [harvestApi.reducerPath]: harvestApi.reducer,
        [locationApi.reducerPath]: locationApi.reducer,
        [productApi.reducerPath]: productApi.reducer,
        [fractionApi.reducerPath]: fractionApi.reducer
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(fieldsApi.middleware).concat(harvestApi.middleware)
            .concat(locationApi.middleware).concat(productApi.middleware).concat(fractionApi.middleware);
    }
});

setupListeners(store.dispatch);

export { store };
export * from "./thunks/fetchUser";
export * from "./thunks/registerUser";
export * from "./thunks/updateUser";
export { removeUser };
export { useAddFieldMutation, useFetchFieldsQuery, useRemoveFieldMutation, useFetchFieldTypesQuery, useUpdateFieldMutation } from "./apis/fieldApi";
export { useFetchHarvestsQuery, useAddHarvestMutation, useRemoveHarvestMutation, useAddFeedBackMutation } from "./apis/harvestApi";
export { useFetchProvincesQuery, useFetchDistrictsQuery, useFetchNeighborhoodsQuery } from "./apis/locationApi";
export { useFetchProductsQuery } from "./apis/productApi";
export { useFetchGuidenessQuery, useUpdateFractionsMutation, useGetFractionQuery }from "./apis/fractionApi";