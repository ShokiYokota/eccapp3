import React from "react";
import { Divider } from "@material-ui/core";
import { ListItem } from "@material-ui/core";
import { ListItemText } from "@material-ui/core";
import { ListItemAvatar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete'
import { IconButton } from "@material-ui/core";
import { AddedProduct } from "../../reducks/users/types";
import { useSelector } from "react-redux";
import { AppState } from "../../reducks/store/store";
import { getUserId } from "../../reducks/users/selectors";
import { db } from "../../firebase";

type CartListItemProps = {
  product: AddedProduct;
}

const useStyles = makeStyles({
  list: {
    height: 128
  },
  image: {
    objectFit: 'cover',
    margin: 16,
    height: 96,
    width: 96
  },
  text: {
    width: '100%'
  }
});

export const  CartListItem = (props:CartListItemProps) => {
    const classes = useStyles();
    const selector = useSelector((state:AppState)=>state);
    const uid = getUserId(selector);

    const image = props.product.images[0].path;
    const name = props.product.name;
    const price = props.product.price.toLocaleString();
    const size = props.product.size;

    const removeProductFromCart = (id:string) =>{
        return db
        .collection('users') //ユーザーのid = ユーザーのカート
        .doc(uid)
        .collection('cart') //サブコレクションであるカートの商品id = そのユーザーのカートの商品
        .doc(id)
        .delete();
    };
    return(
      <>
        <ListItem className={classes.list}>
          <ListItemAvatar>
            <img className={classes.image} src={image} alt="商品画像" />
          </ListItemAvatar>
          <div className={classes.text}>
            <ListItemText primary={name} secondary={"サイズ：" + size} />
            <ListItemText primary={"¥" + price} />
          </div>
          <IconButton onClick = {() => removeProductFromCart(props.product.cartId)}>
            <DeleteIcon  />
          </IconButton>
        </ListItem>
        <Divider />
      </>
    )
}
