import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
//import { userApi } from "./apis/userApi";
import { removeUser, userReducer } from "./slices/userSlice";
//import { fieldsReducer } from "./slices/fieldSlice";
//import { harvestReducer } from "./slices/harvestSlice";
import { fieldsApi } from "./apis/fieldApi";
import { harvestApi } from "./apis/harvestApi";

const store = configureStore({
    reducer: {
        user: userReducer,
        [fieldsApi.reducerPath]: fieldsApi.reducer,
        [harvestApi.reducerPath]: harvestApi.reducer
        //fields: fieldsReducer,
        //harvests: harvestReducer
        //[userApi.reducerPath]: userApi.reducer 
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(fieldsApi.middleware).concat(harvestApi.middleware);
    }
});

setupListeners(store.dispatch);

export { store };
//export * from "./thunks/addField";
export * from "./thunks/fetchUser";
export * from "./thunks/registerUser";
export * from "./thunks/updateUser";
//export * from "./thunks/fetchFields";
//export * from "./thunks/fetchHarvests";
//export * from "./thunks/removeHarvest";
//export * from "./thunks/addHarvest";
export { removeUser };
//export { resetFields };
//export { useFetchUserMutation } from "./apis/userApi";
export { useAddFieldMutation, useFetchFieldsQuery, useRemoveFieldMutation } from "./apis/fieldApi";
export { useFetchHarvestsQuery, useAddHarvestMutation, useRemoveHarvestMutation } from "./apis/harvestApi";