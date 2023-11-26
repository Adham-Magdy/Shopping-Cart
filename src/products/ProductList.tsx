import React from 'react'
import { Product,  removeProduct, selectAllProducts } from './productsSlice'
import { useAppDispatch, useAppSelector } from '../stores/storeHooks'
import { addToCart } from '../carts/cartSlice'

interface productProps{

}

const ProductList: React.FC<productProps> = () => {
    const dispatch = useAppDispatch();
    const products = useAppSelector(selectAllProducts);
    const removeFromStore = (id:string)=>{
      dispatch(removeProduct(id));
    }
    const addingCart = (product: Product)=>{
      dispatch(addToCart(product))
    }
  return (
    <>
    <div>
      <label><h1>Products List</h1></label>
      {
        products.map((product)=>(
          <section className="card" key={product.id}>
                <h4>Product: {product.tittle}</h4>
                <p>Price : {product.price}</p>
                <button className="delete-btn" onClick={()=> removeFromStore(product.id)}>DELETE</button>
                <button className="cart-btn" onClick={()=> addingCart(product)}>Add To Cart</button>

            </section>
        ))
      }
      
      </div>
    </>
  )
}

export default ProductList
