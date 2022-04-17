import React from "react";
import {Route,Routes} from "react-router";
import {Login,Home} from "./pages/index";
import { BrowserRouter } from "react-router-dom";

export const Router = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  </BrowserRouter>
  )
}
