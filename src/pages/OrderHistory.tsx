import { makeStyles } from "@material-ui/core"
import { List } from "@material-ui/core"
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../reducks/store/store";
import { fetchOrdersHistory } from "../reducks/users/operations";
import { getOrdersHistory } from "../reducks/users/selectors";
import { OrderHistoryItem } from "../components/products";


const useStyles = makeStyles((theme)=>({
  orderList: {
    background: theme.palette.grey["100"],
    margin: '0 auto',
    padding: 32,
    [theme.breakpoints.down('md')]: {
      width: '100%'
    },
    [theme.breakpoints.up('md')]: {
      width: 768
    }

  }
}))

export const OrderHistory = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const selector = useSelector((state:AppState)=>state);
  const orders = getOrdersHistory(selector);

  useEffect(()=>{
    dispatch(fetchOrdersHistory())
  },[]);

   return(
    <section className="c-section-wrapin">
      <List className={classes.orderList}>
        {orders.length > 0 && (
          orders.map(order => <OrderHistoryItem order={order} key={order.id}/>)
        )}
      </List>
    </section>
   )
}