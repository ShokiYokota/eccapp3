import { Divider, List, makeStyles} from "@material-ui/core";
import { useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CartListItem } from "../components/products";
import { PrimaryButton, TextDetail } from "../components/UIkit";
import { orderProduct } from "../reducks/products/operations";
import { AppState } from "../reducks/store/store";
import { getProductsInCart } from "../reducks/users/selectors";


const useStyles = makeStyles((theme) =>({
  detailBox: {
    margin: '0 auto',
    [theme.breakpoints.down('sm')]: {
      width: 320
    },
    [theme.breakpoints.up('sm')]:{
      width: 512
    }
  },
  orderBox: {
    border: '1px solid rgba(0,0,0,2)',
    borderRadius: 4,
    boxShadow: '0 4px 2px 2px rgba(0,0,0,2)',
    height: 256,
    margin: '24px auto 16px auto',
    padding: 16,
    width: 288
  }
}));

export const OrderConfirm = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const selector = useSelector((state:AppState) => state);
  const producutsInCart = getProductsInCart(selector);

  const subtotal = useMemo(()=>{
    return producutsInCart.reduce((sum,product)=> sum += product.price,0) //subtotalにsumでぐるぐる回した商品の値段の合計を代入
  },[producutsInCart])

  const shippingFee = (subtotal >= 10000) ? 0: 400; //１万未満なら送料４４０円プラスする
  const tax = (subtotal + shippingFee) * 0.1; //消費税
  const total = subtotal + shippingFee + tax; //商品の総合計

  const order = useCallback(()=>{
    dispatch(orderProduct(producutsInCart, total))
  },[producutsInCart,total]);

  return (
    <section className="c-section-wrapin">
      <h2 className="g-text__headline">注文の確認</h2>
      <div className="p-grid__row">
        <div className={classes.detailBox}>
          <List>
            {producutsInCart.length > 0 &&(
              producutsInCart.map(product => <CartListItem key={product.cartId} product={product}/>)
            )}
          </List>
        </div>
        <div className={classes.orderBox}>
          <TextDetail label={"商品合計"} value={"¥" + subtotal.toLocaleString()} />
          <TextDetail label={"送料"} value={"¥" + shippingFee.toLocaleString()} />
          <TextDetail label={"消費税"} value={"¥" + tax} />
          <Divider />
          <TextDetail label={"合計(税込)"} value={"¥" + total.toLocaleString()} />
          <PrimaryButton label={"注文する"} onClick={order} />
        </div>
      </div>
    </section>
  )
}