import React from "react";
import Home from "./client/home";

const routers = [
  {
    path: "/",
    exact: true,
    // element: <Home />,
    Component: Home,
    loadData: Home.loadData,
  },
];

export default routers;
