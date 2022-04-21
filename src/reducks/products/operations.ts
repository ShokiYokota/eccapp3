import{db,FirebaseTimestamp} from "../../firebase"
import {push} from 'connected-react-router'
import { ThunkAction } from "redux-thunk"
import { AnyAction } from "redux"
import { ProductData, ProductsState } from "./types"
import { Image,Size } from "../../components/products/types"
import { fetchProductsAction } from "./actions"

const productsRef = db.collection('products')

export const fetchProducts = ():ThunkAction<void,void,unknown,AnyAction> =>{
  return async (dispacth) => {
    productsRef.orderBy('updated_at','decs').get() //更新日付で降順で＝新しい順で並び替え
      .then((snapshots:any) =>{
        const productsList: ProductData[] = []
        snapshots.forEach((snapshot:any)=>{
          const productData = snapshot.data()
          productsList.push(productData as ProductData)
        })
        dispacth(fetchProductsAction(productsList))
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
  sizes: Size[]) :ThunkAction<void,ProductsState,unknown,AnyAction> => {

  return async(dispatch) => {
    const timestamp = FirebaseTimestamp.now()

    const data = {
      id:'',
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
    if(id === "") {
    const ref = productsRef.doc()
    id = ref.id //引数で渡ってきたidに入れる
    data.id = id
    data.created_at = timestamp
  }

    return productsRef.doc(id).set(data, {marge:true})
    .then(() =>{
      dispatch((push('/')))
    }).cathch((error:any)=>{
      throw new Error(error)
      
    })
  }
}