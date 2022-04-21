import React from "react";
import {Route,Routes} from "react-router";
import {SignIn,Home,SignUp,Reset,ProductEdit,ProductList,ProductDetail} from "./pages/Index";
import { BrowserRouter } from "react-router-dom";
import { Auth } from "./Auth";


export const Router = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/signup" element={<SignUp />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signin/reset" element={<Reset />} />

      <Auth>
        <Route path={"(/)?"} element={<ProductList />} />
        <Route path={"/product/:id"} element={<ProductDetail/>}/>
        <Route path={"/product/edit(/:id)?"} element={<ProductEdit/>}/>
      </Auth>

    </Routes>
  </BrowserRouter>
  )
}
