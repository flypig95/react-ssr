import fs from "fs";
import path from "path";
import React from "react";
import { renderToString } from "react-dom/server";
import { Route, Routes } from "react-router-dom";
import { StaticRouter } from "react-router-dom/server";
import { Provider } from "react-redux";
import store from "~/store";
import routes from "../routes";

const render = (req) => {
  const state = store.getState();
  const dataStr = `<script>window.__data = ${JSON.stringify(state)}</script>`;
  const content = renderToString(
    <Provider store={store}>
      <StaticRouter location={req.url}>
        <Routes>
          {routes.map((route) => (
            <Route {...route} key={route.path} />
          ))}
        </Routes>
      </StaticRouter>
    </Provider>
  );
  const templateStr = fs.readFileSync(
    path.resolve(process.cwd(), "dist/ssr.html"),
    "utf8"
  );

  const htmlStr = templateStr
    .replace(/(<div id="root">).*(<\/div>)/g, `$1${content}$2`)
    .replace(/<\/body>/g, `${dataStr}\n</body>`);

  return htmlStr;
};

export default render;
