import { configureStore } from "@reduxjs/toolkit";
import productsSlice from "../products/productsSlice";
import cartSlice from "../carts/cartSlice";

const store = configureStore({
    reducer:{
        product: productsSlice,
        cart : cartSlice
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;