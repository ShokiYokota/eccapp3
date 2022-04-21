import { db, FirebaseTimestamp } from '../firebase'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { ProductData } from '../reducks/products/types'
import { useDispatch } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import HTMLReactParser from 'html-react-parser'
import { ImageSwiper, SizeTable } from '../components/Products/index'
import { useCallback } from 'react'
import { push } from 'connected-react-router'
import { addProductToCart } from 'reducks/users/operations'
import { useSelector } from 'react-redux'
import { AppState } from '../reducks/store/store'
import path from 'path'

const useStyles = makeStyles((theme) => ({
  sliderBox: {
    [theme.breakpoints.down('sm')]: {
      margin: '0 auto 24px auto',
      height: 320,
      width: 320,
    },
    [theme.breakpoints.up('sm')]: {
      margin: '0 auto',
      height: 400,
      width: 400,
    },
  },
  detail: {
    textAlign: 'left',
    [theme.breakpoints.down('sm')]: {
      margin: '0 auto 16px auto',
      height: 'auto',
      width: 320,
    },
    [theme.breakpoints.up('sm')]: {
      margin: '0 auto',
      height: 'auto',
      width: 400,
    },
  },
  price: {
    fontSize: 36,
  },

}))
const returnCodeToBr = (text: string) => {
  if (text === '') return text
  return HTMLReactParser(text.replace(/\r?\n/g, '<br/>'))
}

export const ProductDetail = () => {
  // const selector = useSelector((state)=>state);
  // const path = selector.router.location.pathname
  // const id = path.split('/product/')[1];
  const classes = useStyles();
  const path = window.location.pathname
  const id = path.split('/product/detail/')[1]

  const [product,setProduct] = useState<ProductData>();

  useEffect(()=>{
    db.collection('products').doc(id).get()
    .then((doc:any) => {
      const data = doc.data();
      setProduct(data)
    }) 
  },[product])

  return(
    <section className='c-section-wrapin'>
      {product && (
         <div className="p-grid__row">
           <div className={classes.sliderBox}>
              <ImageSwiper images={product.images}/>
           </div>
           <div className={classes.detail}>
           <h2 className="u-text__headline">{product.name}</h2>
            <p className={classes.price}>{product.price.toLocaleString()}</p>
            <div className="module-spacer--extra-small" />
            {/* <SizeTable addProduct={addProduct} sizes={product.sizes}></SizeTable> */}
            <div className="module-spacer--extra-small" />
            <p>{returnCodeToBr(product.description)}</p>
            <p></p>
           </div>
         </div>
      )}
    </section>
  )
}