import path from "path";
import express from "express";
import routes from "../src/routes";
import { matchPath } from "react-router-dom";
import cookieParser from "cookie-parser";
import favicon from "serve-favicon";
import store from "~/store";
import { getOutputDir } from "./helper";
import { render } from "./render";
/*
 保证node服务器稳定
 1、同步代码的错误，错误处理中间件
 2、异步代码（promise）错误，loadData中所有的请求都要放在promise.all中，并且返回promise.all()
 */

// process.on("uncaughtException", function (err) {
//   console.log("Caught exception: " + err);
// });

const app = express();
app.disable("x-powered-by");
app.enable("trust proxy");
app.use(favicon(path.resolve(process.cwd(), "public/favicon.ico")));
app.use(express.static("public"));
app.use(express.static(getOutputDir()));
app.use(cookieParser());
app.use(
  express.json({
    type: "*/*",
  })
);

// 此中间件不要加async，否则错误处理中间件无法执行
app.get("*", function (req, res, next) {
  const url = req.path;
  const route = routes.filter((route) => matchPath(route, url))[0];
  if (route) {
    let { loadData, ssr } = route;
    if (loadData) ssr = true;
    if (loadData) {
      const unsubscribe = store.subscribe(() => {
        const bootstrapScriptContent = `window.__data=${JSON.stringify(
          store.getState()
        )}`;
        render({
          req,
          res,
          ssr,
          renderToPiStrProps: { bootstrapScriptContent },
        });
        unsubscribe();
      });
      route.loadData(store, { req }).catch(() => {
        render({ req, res, ssr: false });
        unsubscribe();
      });
    } else {
      render({ req, res, ssr });
    }
  } else {
    next();
  }
});

// 错误处理中间件
app.use((err, req, res, next) => {
  console.log("错误处理中间件", err);
  render({ req, res, ssr: false });
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, function (err) {
  console.info(
    `==> 🍺  Express server running at port ${PORT}, at ${new Date().toLocaleString()}`
  );
});
