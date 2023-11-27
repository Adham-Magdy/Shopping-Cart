import { Product } from "../products/productsSlice";

// validate title and price that user entered
const validation = (product: Product) => new Promise<Product>((resolve,reject)=> setTimeout(()=>{
    if(product.tittle.length === 0){
        reject("NO Title");
    }
    if(product.price <= 0){
        reject("Price Incorrect");
    }
    resolve(product);
},500));

export default validation;