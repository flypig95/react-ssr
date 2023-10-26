import React from "react";
import { hydrateRoot, createRoot } from "react-dom/client";
import { matchPath } from "react-router-dom";
import App from "./App";
// import "~/utils/flex";
import "./styles/base.less";
import routes from "./routes";

const rootDom = document.getElementById("root");

const route =
  routes.filter((r) => matchPath(r, window.location.pathname))[0] || {};
if (route.ssr) {
  hydrateRoot(rootDom, <App />);
} else {
  const root = createRoot(rootDom);
  root.render(<App />);
}
