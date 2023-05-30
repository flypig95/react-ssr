import React from "react";
import {
  createHashRouter,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { Provider } from "react-redux";
import StyleContext from "isomorphic-style-loader/StyleContext";
import routes from "../routes";
import store from "~/store";

const isStyleIsomorphic = false; // 样式同构
const insertCss = (...styles) => {
  const isServerRender = window.__data;
  if (isServerRender) {
    return () => {};
  } else {
    const removeCss = styles.map((style) => {
      return style._insertCss();
    });
    return () => removeCss.forEach((dispose) => dispose());
  }
};

const router = createBrowserRouter(routes);

export default function App() {
  return isStyleIsomorphic ? (
    <StyleContext.Provider value={{ insertCss }}>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </StyleContext.Provider>
  ) : (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}
