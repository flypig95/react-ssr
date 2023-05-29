import React from "react";
import Home from "./client/home";
import Login from "./client/login";

const routers = [
  {
    path: "/",
    exact: true,
    // element: <Home />,
    Component: Home,
    loadData: Home.loadData,
  },
  {
    path: "/login",
    exact: true,
    Component: Login,
  },
];

export default routers;
