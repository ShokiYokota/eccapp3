import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProducts } from '../reducks/products/operations'
import { getProducts } from '../reducks/products/selectors'
import { AppState } from '../reducks/store/store'
import { ProductCard } from '../components/products'
import { ProductsReducer } from '../reducks/products/reducers'

export const ProductList = () => {
  const dispatch = useDispatch();
  const selector = useSelector((state:AppState)=>state);
  const products = getProducts(selector); //商品がproductsに入って使える

  //商品情報をとりたい
  useEffect(()=>{
    dispatch(fetchProducts())
  },[])
  return(
    <section className="c-section-wrapin">
      <div className="p-grid__row">
        {products.length > 0 && 
          products.map((product) => (
            <ProductCard key={product.id}/>
          ))}
      </div>
    </section>
  )

}