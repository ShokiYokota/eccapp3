import React, { useCallback } from "react";
import { useSelector,useDispatch} from "react-redux";
import { List, makeStyles } from "@material-ui/core";
import { AppState } from "../reducks/store/store";
import { getProducts } from "../reducks/products/selectors";
import { getProductsInCart } from "../reducks/users/selectors";
import { CartListItem } from "../components/products";
import { PrimaryButton, GreyButton} from "../components/UIkit";
import { push } from "connected-react-router";

const useStyles = makeStyles({
  root: {
    margin: '0 auto',
    maxWidth: 512,
    width: '100%'
  }
})

export const CartList = () =>{
  const classes = useStyles();
  const dispatch = useDispatch();
  const selector = useSelector((state:AppState)=>state);
  const producutsInCart = getProductsInCart(selector); //現在のカートにある商品情報
  
  const goToOrder = useCallback(()=>{
    dispatch((push('./order/confirm')))
  },[]);

  const backToHome = useCallback(()=>{
    dispatch((push('/')))
  },[]);

   return(
     <section className="c-section-wrapoin">
       <h2 className="u-text__headline">
         ショッピングカート
       </h2>
      <List className={classes.root}>
        {producutsInCart.length > 0 && (
          producutsInCart.map(product => <CartListItem key={product.cartId} product={product}/>)
        )}
      </List>
      <div className="module-spacer--medium" />
      <div className="p-grid__calumn">
        <PrimaryButton label={"レジへ進む"} onClick={goToOrder} />
        <div className="module-spacer--extra-extra-small" />
        <GreyButton label={"ショッピングを続ける"} onClick={backToHome}/>
      </div>
     </section>
   )
 }