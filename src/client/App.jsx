import React from "react";
import {
  createHashRouter,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import routes from "../routes";
// import "./App.less";

const router = createBrowserRouter(routes);

export default function App() {
  return <RouterProvider router={router} />;
}
