import { db, FirebaseTimestamp } from "../../firebase"
import { push } from 'connected-react-router'
import { ThunkAction } from "redux-thunk"
import { AnyAction } from "redux"
import { OrderedProduct, ProductData, ProductsState } from "./types"
import { Image, Size } from "../../components/products/types"
import { fetchProductsAction } from "./actions"
import { ProductList } from "../../pages/ProductList"
import { AppState } from "../store/store"
import { deleteProductAction } from "./actions"
import { AddedProduct } from "../users/types"
import { time } from "console"

const productsRef = db.collection('products')

export const fetchProducts = (): ThunkAction<void, void, unknown, AnyAction> => {
  return async (dispacth) => {
    productsRef.orderBy('updated_at', 'desc').get() //更新日付で降順で＝新しい順で並び替え
      .then((snapshots: any) => {
        const productsList: ProductData[] = []
        snapshots.forEach((snapshot: any) => {
          const productData = snapshot.data()
          productsList.push(productData as ProductData)
        })
        dispacth(fetchProductsAction(productsList))
      })
  }
}

export const orderProduct = (getProductsInCart: AddedProduct[], amount: number): ThunkAction<void, AppState, unknown, AnyAction> => {
  return async (dispatch, getState) => {
    const uid = getState().users.uid;
    const userRef = db.collection('users').doc(uid);
    const timestamp = FirebaseTimestamp.now();

    const orderedPproducts: OrderedProduct[] = [];
    const soldOutProducts: string[] = [];

    const batch = db.batch();

    for (const product of getProductsInCart) {
      const snapshot = await productsRef.doc(product.productId).get();
      const sizes = snapshot.data()?.sizes as Size[];

      const updatedSizes: Size[] = sizes.map((size) => {
        if (size.size === product.size) {
          if (size.quantity < product.quantity) {
            soldOutProducts.push(product.name);
            return size
          }
          return {
            size: size.size,
            quantity: size.quantity - product.quantity,
          }
        }
        return size
      })
      orderedPproducts.push({
        id: product.productId,
        images: product.images,
        name: product.name,
        price: product.price,
        size: product.size
      })

      batch.update(
        productsRef.doc(product.productId),
        { sizes: updatedSizes }
      )

      batch.delete(
        userRef
          .collection('cart')
          .doc(product.cartId)
      )
    }
    if (soldOutProducts.length > 0) { //複数在庫切れになったら　errorMessage = ’商品名’＋’と’＋’商品名’
      const errorMessage = (soldOutProducts.length > 1) ? soldOutProducts.join('と') : soldOutProducts[0];
      alert('大変申し訳ございません。' + errorMessage + ' が在庫切れとなったため、注文処理を中断致しました。')
      return false
    } else {
      batch.commit()
      .then(()=>{
        const orderRef = userRef.collection('orders').doc();
        const date = timestamp.toDate();
        const shippingDate = FirebaseTimestamp.fromDate(new Date(date.setDate(date.getDate() + 3)));

        const history = {
          amount: amount,
          created_at: timestamp,
          id: orderRef.id,
          products: orderedPproducts,
          shippingDate: shippingDate,
          updated_at: timestamp
        }

        orderRef.set(history)

        dispatch(push('/order/history'))

      }).catch(()=>{
        alert('注文処理に失敗しました。通信環境をご確認のうえ、もう一度お試しください。')
        return false
      })
    }
  }
}

export const deleteProduct = (id: string): ThunkAction<void, AppState, unknown, AnyAction> => {
  return async (dispatch, getState) => {
    productsRef.doc(id).delete()
      .then(() => {
        const prevProducts = getState().products.list;
        const nextProducts = prevProducts.filter(product => product.id !== id)
        dispatch(deleteProductAction(nextProducts))
      })
  }
}

export const saveProduct = (
  id: string,
  name: string,
  description: string,
  category: string,
  gender: string,
  price: string,
  images: Image[],
  sizes: Size[]): ThunkAction<void, ProductsState, unknown, AnyAction> => {

  return async (dispatch) => {
    const timestamp = FirebaseTimestamp.now()

    const data = {
      id: '',
      category: category,
      description: description,
      gender: gender,
      images: images,
      name: name,
      price: parseInt(price, 10), //10進数
      sizes: sizes,
      updated_at: timestamp,
      created_at: timestamp
    }
    if (id === "") {
      const ref = productsRef.doc()
      id = ref.id //引数で渡ってきたidに入れる
      data.id = id
      data.created_at = timestamp
    }

    return productsRef.doc(id).set(data, { merge: true })
      .then(() => {
        dispatch((push('/')))
      }).catch((error) => {
        throw new Error(error)

      })
  }
}