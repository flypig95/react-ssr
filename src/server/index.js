import path from "path";
import fs from "fs";
import express from "express";
import routes from "../routes";
import { matchPath } from "react-router-dom";
import render from "./render";
import store from "~/store";

/*
 保证node服务器稳定
 1、同步代码的错误，错误处理中间件
 2、异步代码（promise）错误，loadData中所有的请求都要放在promise.all中，并且返回promise.all()
 3、使用pm2做进程管理，自动重启
 */

// process.on("uncaughtException", function (err) {
//   console.log("Caught exception: " + err);
// });

const app = express();
app.use(express.static("dist"));

// 中间件不要加async，否则错误处理中间件无法执行
app.get("*", function (req, res) {
  const route = routes.filter((route) => matchPath(route, req.url))[0];
  if (route) {
    if (route.loadData) route.ssr = true;
    const { loadData, ssr } = route;
    if (ssr) {
      if (loadData) {
        const unsubscribe = store.subscribe(() => {
          let html = "";
          try {
            html = render({ url: req.url, route });
          } catch (err) {
            html = fs.readFileSync(
              path.resolve(process.cwd(), "dist/ssr.html"),
              "utf8"
            );
          }
          res.send(html);
          unsubscribe();
        });

        loadData(store).catch((err) => {
          toClientRender(res);
          unsubscribe();
        });
      } else {
        res.send(render({ url: req.url, route }));
      }
    } else {
      toClientRender(res);
    }
  } else {
    res.sendStatus(404);
  }
});

// 错误处理中间件
app.use((err, req, res, next) => {
  console.log("错误处理中间件", err);
  toClientRender(res);
});

function toClientRender(res) {
  res.sendFile(path.resolve(process.cwd(), "dist/ssr.html"));
}

const server = app.listen(3000, function (err, a) {
  const host = server.address().address;
  const port = server.address().port;
  console.log("应用实例，访问地址为 http://%s:%s", host, port);
});
