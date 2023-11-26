import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from "../products/productsSlice";
import { RootState } from '../stores/store';

interface cartProduct extends Product{
    amount:number;
}

const cartSlice = createSlice({
    name:"cart",
    initialState : [] as cartProduct[],
    reducers:{
        addToCart:(state,action: PayloadAction<Product>)=>{
            const productIndex =  state.findIndex((product)=> product.id === action.payload.id);
            console.log(productIndex);
            if(productIndex !== -1 ){
                // product found increasing it's amount by 1
                state[productIndex].amount += 1;
            }else{
                state.push({...action.payload,amount:1});
            }
        }, // end add TO Cart
        removeFromCart:(state, action: PayloadAction<string>)=>{
            const productIndex = state.findIndex((product)=> product.id === action.payload);
            if(state[productIndex].amount > 1){
                state[productIndex].amount -= 1;
            }else{
                return state.filter((product)=> product.id !== action.payload );
            }
        }
    } // end reducers

});
export const getCartProducts = (state: RootState) => state.cart;
export const getTotalPrices = (state: RootState) => state.cart.reduce((acc,next)=> acc+=(next.amount * next.price),0);
export const {addToCart,removeFromCart} = cartSlice.actions;
export default cartSlice.reducer;