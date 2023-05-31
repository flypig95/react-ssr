import Home from "./client/home";
import Login from "./client/login";
import Demo from "./client/demo";

const routers = [
  {
    path: "/",
    exact: true,
    // element: <Home />,
    Component: Home,
    ssr: true,
  },
  {
    path: "/login",
    exact: true,
    Component: Login,
  },
  {
    path: "/demo",
    Component: Demo,
    loadData: Home.loadData,
  },
];

export default routers;
