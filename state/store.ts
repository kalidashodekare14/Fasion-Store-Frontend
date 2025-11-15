import { configureStore } from "@reduxjs/toolkit";
import { productApi } from "./services/productServices";
import { sellerService } from './services/sellerService';



export const store = configureStore({
    reducer: {
        [productApi.reducerPath]: productApi.reducer,
        [sellerService.reducerPath]: sellerService.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(productApi.middleware)
            .concat(sellerService.middleware)
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
