import React from "react";
import {Route,Switch} from "react-router";
import {SignIn,Home,SignUp,Reset,ProductEdit,ProductList,ProductDetail,OrderConfirm} from "./pages/Index";
import { Auth } from "./Auth";
import { CartList } from "./pages/CartList";


export const Router = (): JSX.Element => {
  return (
    <Switch>
      <Route exact path={'/signup'} component={SignUp} />
      <Route exact path={'/signin'} component={SignIn} />
      <Route exact path={'/signin/reset'} component={Reset} />
       
      <Auth>
        <Route exact path={'(/)?'} component={ProductList} />
        <Route exact path="/product/detail/:id" component={ProductDetail} />
        <Route path="/product/edit(/:id)?" component={ProductEdit} />
        <Route exact path="/cart" component={CartList} />
        <Route exact path="/order/confirm" component={OrderConfirm} />
        {/* <Route exact path="/order/history" component={OrderHistory} /> */}
      </Auth>
    </Switch>
  )
}