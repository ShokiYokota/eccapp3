import React from 'react'
import IconButton from '@material-ui/core/IconButton'
import { Badge } from '@material-ui/core'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'
import MenuIcon from '@material-ui/icons/Menu'
import { getProductsInCart, getUserId } from '../../reducks/users/selectors'
import { useDispatch, useSelector } from 'react-redux'
import { AppState } from '../../reducks/store/store'
import { useEffect } from 'react'
import { db } from '../../firebase'
import { AddedProduct } from '../../reducks/users/types'
import { fetchProductsInCart } from '../../reducks/users/operations'
import { push } from 'connected-react-router'
import { fetchProducts } from '../../reducks/products/operations'


export const HeaderMenus = (props:any) =>{
  const dispatch = useDispatch();
  const selector = useSelector((state:AppState)=>state);
  let producutsInCart = getProductsInCart(selector); //producutsInCart.lengthは現在のカートの配列分だけ表示
  const uid = getUserId(selector);

  useEffect(()=>{
    const unsubscribe = db
    .collection('users')
    .doc(uid)
    .collection('cart')
    .onSnapshot((snapshot)=>{
      snapshot.docChanges().forEach((change) => {
        const product = change.doc.data() as AddedProduct
        const changeType = change.type

        switch(changeType){
          case 'added'://カートに追加
            producutsInCart.push(product)
            break;
          case 'modified':{ //中身が変化したら上書きする
            const index = producutsInCart.findIndex((producutsInCart) => producutsInCart.cartId === change.doc.id)
            producutsInCart[index] = product
            break;
          }
          case 'removed': //カートから削除
            producutsInCart = producutsInCart.filter((producutsInCart) => producutsInCart.cartId !== change.doc.id)
            break;
            default:break;
        }
        
      })
      dispatch(fetchProductsInCart(producutsInCart))
    })
    return () => unsubscribe();
  },[])
  return (
    <>
      <IconButton onClick={()=> dispatch(push('/cart'))}>
        <Badge badgeContent={producutsInCart.length} color="secondary"> 
          <ShoppingCartIcon />
        </Badge>
      </IconButton>
      <IconButton>
        <FavoriteBorderIcon/>
      </IconButton>
      <IconButton onClick={(event)=>props.handleDrawerToggle(event)}> 
        <MenuIcon/>
      </IconButton>
    </>
  )
}