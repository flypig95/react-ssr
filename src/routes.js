import { lazy } from "react";
import Demo from "./demo";

const routers = [
  {
    path: "/login",
    exact: true,
    ssr: false,
    Component: lazy(() => import("./login")),
  },
  {
    path: "/demo",
    Component: Demo,
    ssr: true,
    loadData: Demo.loadData,
  },
];

export default routers;
