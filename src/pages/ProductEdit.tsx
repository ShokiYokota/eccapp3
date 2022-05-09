import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import ImageArea from "../components/products/ImageArea";
import { TextInput ,SelectBox ,PrimaryButton} from "../components/UIkit";
import { saveProduct } from "../reducks/products/operations";
import {Image,Size} from "../components/products/types"
import { db } from "../firebase";
import { SetSizeArea } from "../components/products";

export const ProductEdit = () => {
  const dispatch = useDispatch();
  let id = window.location.pathname.split('/product/edit')[1];
  
  if(id !== ""){
    id = id.split('/')[1]
  }

  const [name, setName] = useState(""),
    [description, setDescription] = useState(""),
    [category, setCategory] = useState(""),
    [gender, setGender] = useState(""),
    [images, setImages] = useState<Image[]>([]),
    [price, setPrice] = useState(""),
    [sizes, setSizes] = useState<Size[]>([])

  const inputName = useCallback((event:ChangeEvent<HTMLInputElement>)=>{
    setName(event.target.value);
  },[setName])

  const inputDescription = useCallback((event:ChangeEvent<HTMLInputElement>)=>{
    setDescription(event.target.value);
  },[setDescription])

  const inputPrice = useCallback((event:ChangeEvent<HTMLInputElement>)=>{
    setPrice(event.target.value);
  },[setPrice])

 

  const categories = [
    {
      id: 'tops',
      name: 'トップス',
    },
    {
      id: 'bottom',
      name: 'ボトム',
    },
    {
      id: 'shirt',
      name: 'シャツ',
    },
  ]
  const genders = [
    {
      id: 'male',
      name: 'メンズ',
    },
    {
      id: 'female',
      name: 'レディース',
    },
    {
      id: 'all',
      name: '全て',
    },
  ]

useEffect(()=>{
  if(id !== ""){
    db.collection('products').doc(id).get()
      .then((snapshot: any)=> {
        const data = snapshot.data()
        setImages(data.images);
        setName(data.name);
        setDescription(data.description);
        setCategory(data.category);
        setGender(data.gender);
        setPrice(data.price);
        setSizes(data.sizes);
      })
  }
}, [id]);  //第二引数には[]は初回のレンダリングのみ実行、[id]はidが変更されるたびに実行される



  return (
    <section>
      <h2 className="u-text__headline u-text-center">商品の登録・編集</h2>
      <div className="c-secton-container">
        <ImageArea images={images} setImages={setImages} />
        <TextInput label="商品名" value={name} onChange={inputName} />
        <TextInput label="商品説明" value={description} onChange={inputDescription} multiline={true} rows={5} />
        <SelectBox label="カテゴリー" required={true} options={categories} select={setCategory} value={category}/>
        <SelectBox label="性別" required={true} options={genders} select={setGender} value={gender} />
        <TextInput label="価格" value={price} onChange={inputPrice} type="number" />
        <div className="module-spacer--small" />
        <SetSizeArea sizes={sizes} setSizes={setSizes} />
        <div className="module-spacer--small" />
        <div className="center">
          <PrimaryButton
            label="商品情報を保存"
            
            onClick={() => dispatch(saveProduct(id, name, description, category, gender, price, images,sizes))}

          ></PrimaryButton>
        </div>
      </div>
    </section>
  )
}