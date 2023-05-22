import React from "react";
import { renderToString } from "react-dom/server";
import { Route, Routes } from "react-router-dom";
import { StaticRouter } from "react-router-dom/server";
import { Provider } from "react-redux";
import store from "~/store";
import routes from "../routes";

const render = (req, data) => {
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

  return `
    <html>
      <body>
        <div id="root">${content}</div>
        <script>
          window.context = {
            state: ${JSON.stringify(data)}
          }
        </script>
      </body>
    </html>
  `;
};

export default render;
