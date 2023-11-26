import React, { useState } from 'react'
import { Product, addProductAsync, getErrorMessage } from './productsSlice'
import { useAppDispatch, useAppSelector } from '../stores/storeHooks';

const ProductForm = () => {
    const dispatch = useAppDispatch();
    const errorMessage = useAppSelector(getErrorMessage);
    const[product,setProducts] = useState<Product>({
        tittle:"",
        price:0,
        id:""
    });
    const {tittle,price,id} = product;
    const handleChange = ({target:{name,value}}: React.ChangeEvent<HTMLInputElement>)=> setProducts(prev =>{
        /* eslint-disable @typescript-eslint/no-explicit-any */

        (prev as any)[name] = value;
        const newValue = {...prev};
        return newValue;
    })
    
    const handleSubmit = (e :React.FormEvent)=>{
            // console.log({product});
            e.preventDefault();
            dispatch(addProductAsync(product));
            setProducts({
                tittle:"",
                price:0,
                id:"" 
            });
            
           
    }       
    
  return (
    <div>
        <h1>Add Products To List</h1>
        {errorMessage&&<span>error: {errorMessage}</span>}
        <form  onSubmit={handleSubmit}>
            <input style={{border: errorMessage ? '1px solid red':'1px solid black'}} className="data-input" type="text"  placeholder='Product Title' name="tittle" value={tittle} onChange={handleChange}/>
            <input style={{border: errorMessage ? '1px solid red':'1px solid black'}} className="data-input" type="number" placeholder='Product Price' name="price" value={price} onChange={handleChange}/>
            <input style={{border: errorMessage ? '1px solid red':'1px solid black'}} className="data-input"  type="text" placeholder='Product ID' name='id' value={id} onChange={handleChange}/>
            <button style={{backgroundColor: errorMessage? 'red':'#f2f5f9'}} type="submit" className="add-price">Add Price</button>
        </form>
      
    </div>
  )
}

export default ProductForm
