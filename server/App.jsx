import React, { Suspense } from "react";
import { Route, Routes, matchPath } from "react-router-dom";
import { StaticRouter } from "react-router-dom/server";
import { Provider } from "react-redux";
import store from "~/store";
import routes from "~/routes";
import metas from "~/metas";

export default function App({ req, assetMap = {}, ssr = false }) {
  const route = routes.filter((r) => matchPath(r, req.path))[0] || {};
  const _path = route.path;
  const { title, keywords, desc } = metas[_path] || {};
  const assetMapKeys = Object.keys(assetMap);
  const links = assetMapKeys
    .filter((v) => assetMap[v] && /.css$/.test(v))
    .map((v) => <link rel="stylesheet" href={assetMap[v]} key={v}></link>);
  const scripts = assetMapKeys
    .filter((v) => assetMap[v] && /.js$/.test(v))
    .map((v) => <script defer="defer" src={assetMap[v]} key={v}></script>);

  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{title}</title>
        {keywords && <meta name="keywords" content={keywords} />}
        {desc && <meta name="desc" content={desc} />}
        {links}
        {scripts}
      </head>
      <body>
        <div id="root">
          {ssr && (
            <Suspense fallback={<div>loading...</div>}>
              <Provider store={store}>
                <StaticRouter location={req.path}>
                  <Routes>
                    {routes.map((route) => (
                      <Route {...route} key={route.path} />
                    ))}
                  </Routes>
                </StaticRouter>
              </Provider>
            </Suspense>
          )}
        </div>
      </body>
    </html>
  );
}
