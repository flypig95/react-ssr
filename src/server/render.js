import fs from "fs";
import path from "path";
import React from "react";
import { renderToString } from "react-dom/server";
import { Route, Routes } from "react-router-dom";
import { StaticRouter } from "react-router-dom/server";
import { Provider } from "react-redux";
import StyleContext from "isomorphic-style-loader/StyleContext";
import { Helmet } from "react-helmet";
import store from "~/store";
import routes from "../routes";

const render = ({ url, route }) => {
  const css = new Set(); // CSS for all rendered React components
  const insertCss = (...styles) => {
    styles.forEach((style) => {
      css.add(style._getCss());
    });
  };
  const helmet = Helmet.renderStatic();
  const helmetStr = `${helmet.title.toString()}\n${helmet.meta.toString()}`;
  const state = store.getState();
  const dataStr =
    route.ssr && !route.loadData
      ? ""
      : `<script>window.__data = ${JSON.stringify(state)}</script>`;
  const content = renderToString(
    <StyleContext.Provider value={{ insertCss }}>
      <Provider store={store}>
        <StaticRouter location={url}>
          <Routes>
            {routes.map((route) => (
              <Route {...route} key={route.path} />
            ))}
          </Routes>
        </StaticRouter>
      </Provider>
    </StyleContext.Provider>
  );
  const templateStr = fs.readFileSync(
    path.resolve(process.cwd(), "dist/ssr.html"),
    "utf8"
  );

  const htmlStr = templateStr
    .replace(/(<div id="root">).*(<\/div>)/g, `$1${content}$2`)
    .replace(/<\/body>/g, `${dataStr}\n</body>`)
    .replace(
      /<\/head>/g,
      `\n${helmetStr}\n<style type="text/css">${[...css].join("")}</style>\n</head>`
    );

  return htmlStr;
};

export default render;
