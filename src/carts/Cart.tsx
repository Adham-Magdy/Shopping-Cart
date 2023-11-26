import React from 'react'
import { useAppDispatch, useAppSelector } from '../stores/storeHooks'
import { getCartProducts, getTotalPrices, removeFromCart } from './cartSlice'

const Cart = () => {
    const getProducts = useAppSelector(getCartProducts);
    const totalPrice = useAppSelector(getTotalPrices);
    const dispatch = useAppDispatch();
    const handleRemove = (productID: string)=>{
        dispatch(removeFromCart(productID));
    }
  return (
    <div>
        <h2>Cart</h2>
        <h5>{totalPrice}</h5>
        {
            getProducts.map(product => (
                <div key={product.id} className="card-cart">
                    <div>{product.tittle}</div>
                    <div>{product.price}</div>
                    <button className="delete-btn-cart" onClick={()=> handleRemove(product.id)}>Remove From Cart</button>

                </div>
            ))
        }
      
    </div>
  )
}

export default Cart
