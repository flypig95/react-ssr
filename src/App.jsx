import React from "react";
import {
  createHashRouter,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { ConfigProvider } from "antd";
import zhCN from "antd/locale/zh_CN";
import { Provider } from "react-redux";
import StyleContext from "isomorphic-style-loader/StyleContext";
import routes from "./routes";
import store from "~/store";

const isStyleIsomorphic = __STYLE_ISOMORPHIC__; // 样式同构
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
  const content = (
    <ConfigProvider locale={zhCN}>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </ConfigProvider>
  );
  return isStyleIsomorphic ? (
    <StyleContext.Provider value={{ insertCss }}>
      {content}
    </StyleContext.Provider>
  ) : (
    content
  );
}
