import React from "react";
import {Route,Routes} from "react-router";
import {SignIn,Home,SignUp} from "./pages/Index";
import { BrowserRouter } from "react-router-dom";

export const Router = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
    </Routes>
  </BrowserRouter>
  )
}
