import React from "react";
import { renderToString } from "react-dom/server";
import { Route, Routes } from "react-router-dom";
import { StaticRouter } from "react-router-dom/server";
import routes from "../routes";

const render = (req, data) => {
  const content = renderToString(
    <StaticRouter location={req.url}>
      <Routes>
        {routes.map((route) => (
          <Route {...route} key={route.path} />
        ))}
      </Routes>
    </StaticRouter>
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
        <script src="/index.js"></script>
      </body>
    </html>
  `;
};

export default render;
