import React from 'react'
import IconButton from '@material-ui/core/IconButton'
import { Badge } from '@material-ui/core'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'
import MenuIcon from '@material-ui/icons/Menu'
import { getProductsInCart, getUserId } from 'reducks/users/selectors'
import { useDispatch, useSelector } from 'react-redux'
import { AppState } from 'reducks/store/store'
import { useEffect } from 'react'
import { db } from '../../firebase'
import { AddedProduct } from 'reducks/users/types'
import { fetchProductsInCart } from 'reducks/users/operations'
import { push } from 'connected-react-router'

export const HeaderMenus = (props:any) =>{
  return (
    <>
      <IconButton>
        <Badge badgeContent={3} color="secondary">
          <ShoppingCartIcon />
        </Badge>
      </IconButton>
      <IconButton>
        <FavoriteBorderIcon/>
      </IconButton>
      <IconButton> 
        <MenuIcon/>
      </IconButton>
    </>
  )
}