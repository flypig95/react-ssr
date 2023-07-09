import Login from "./login";
import Demo from "./demo";

const routers = [
  {
    path: "/login",
    exact: true,
    ssr: true,
    Component: Login,
  },
  {
    path: "/demo",
    Component: Demo,
    ssr: true,
    loadData: Demo.loadData,
  },
];

export default routers;
