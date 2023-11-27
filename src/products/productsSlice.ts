import { createAsyncThunk, createEntityAdapter, createSlice , PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../stores/store";
import validation from "../API/validateAPI";

export interface Product{
    tittle:string;
    price:number;
    id:string;
}

enum ValidationState {
    FullFilled,
    Pending,
    Rejected
} 

interface ProductSliceState{
    // product: Product[];
    validationState ?: ValidationState;
    errorMessage?: string;

}

const initialProducts: Product[] = [
    {
        tittle:"Product one",
        price:50,
        id:"1"
    },
    {
        tittle:"Product Two",
        price:60,
        id:"2"
    },
    {
        tittle:"Product Three",
        price:70,
        id:"3"
    },

]
// const initialState: ProductSliceState = {
//     product: initialProducts,
//     validationState: undefined,
//     errorMessage: undefined
// }
export const addProductAsync = createAsyncThunk("product/addNewProduct",async(initialProduct: Product)=>{
    const product = await validation(initialProduct);
    return product;
})

// using createEntityAdapter for more dynamic and secure CRUD operation
const productAdapter = createEntityAdapter<Product>();
const initialState = productAdapter.getInitialState<ProductSliceState>({
    validationState:undefined,
    errorMessage:undefined
});
const finalInitialState = productAdapter.upsertMany(initialState,initialProducts);
const productReducer = createSlice({
    name:"product",
    initialState: finalInitialState,
    reducers:{
        addProduct : (state, action: PayloadAction<Product>)=>{
            // return [action.payload, ...state]
            // state.product.push(action.payload);
            productAdapter.upsertOne(state,action.payload);
        },
        removeProduct: (state, action: PayloadAction<string>)=>{
            productAdapter.removeOne(state,action.payload);
            // ...state, product:state.product.filter(product => product.id !== action.payload)

        }
    }, // end reducers
    extraReducers: builder=>{
        builder.addCase(addProductAsync.fulfilled,(state,action)=>{
            productAdapter.upsertOne(state,action.payload);
            state.validationState = ValidationState.FullFilled;
            state.errorMessage = undefined;
            // ...state,
            // validationState: ValidationState.FullFilled,
            // errorMessage:undefined,
            // product:[...state.product, action.payload]
        }) // end addProductAsync.fulfilled
        builder.addCase(addProductAsync.rejected,(state,action)=>({
            ...state,
            validationState:ValidationState.Rejected,
            errorMessage:action.error.message
        })) // end addProductAsync.rejected
        builder.addCase(addProductAsync.pending,(state)=>({
            ...state,
            validationState:ValidationState.Pending,
            errorMessage:undefined
        })) // end addProductAsync.rejected
        

    }

})

// export const getProducts = (state: RootState)=>  state.product;
export const getProducts = (state: RootState)=>  state.product.entities;

export const getErrorMessage = (state: RootState)=> state.product.errorMessage;
export const {addProduct,removeProduct} = productReducer.actions;
export default productReducer.reducer;

// adding all functionalities of adapter selectors
export const {
    selectAll: selectAllProducts,
    selectById: selectProductByID,
    selectEntities: selectProductEntities,
    selectIds: selectProductID,
    selectTotal: selectTotalProducts

} = productAdapter.getSelectors<RootState>(state=> state.product);
