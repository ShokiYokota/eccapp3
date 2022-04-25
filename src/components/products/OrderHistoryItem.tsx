import { Divider } from "@material-ui/core"
import { OrderedProducts } from "./OrderedProducts"
import { OrderHistory } from "../../reducks/products/types"
import { TextDetail } from "../UIkit"


export type OrderHistoryItemProps ={
  order: OrderHistory
}

const dateTimeToString = (date: Date) => {
  return (
    date.getFullYear() +
    '-' +
    `00${date.getMonth() + 1}`.slice(-2) +
    '-' +
    `00${date.getDay() + 1}`.slice(-2) +
    ' ' +
    `00${date.getHours() + 1}`.slice(-2) +
    ':' +
    `00${date.getMinutes() + 1}`.slice(-2) +
    ':' +
    `00${date.getSeconds() + 1}`.slice(-2)
  )
}

const dateToString = (date: Date) => {
  return (
    date.getFullYear() +
    '-' +
    `00${date.getMonth() + 1}`.slice(-2) +
    '-' +
    `00${date.getDay() + 1}`.slice(-2)
  )
}

export const OrderHistoryItem = (props:OrderHistoryItemProps) => {
  const order = props.order;
  const orderdDatetime = dateTimeToString(order.updated_at.toDate());
  const shippingDate = dateToString(order.shippingDate.toDate())
  const price = '¥' + order.amount.toLocaleString();
  return(
    <div>
      <div className="module-spacer--small"/>
      <TextDetail label={"注文ID"} value={order.id} />
      <TextDetail label={"注文日時"} value={orderdDatetime} />
      <TextDetail label={"発送予定日"} value={shippingDate} />
      <TextDetail label={"注文金額"} value={price} />
      {order.products.length > 0 && (
        <OrderedProducts products={order.products} />
      )}
      <div className="module-spacer--extra-small" />
      <Divider />
    </div> 
  )
}