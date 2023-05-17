import express from "express";
import routes from "../routes";
import { StaticRouter, matchPath } from "react-router-dom";
import render from "./render";
const app = express();
app.use(express.static("dist"));

app.get("*", function (req, res) {
  const route = routes.filter((route) => matchPath(route, req.url))[0] || {};
  const { loadData } = route;
  if (typeof loadData === "function") {
    const data = loadData();
    const isPromise =
      Object.prototype.toString.call(data) === "[object Promise]";
    if (isPromise) {
      data.then((result) => {
        const html = render(req, result);
        res.send(html);
      });
    }
  }
});

const server = app.listen(9001, function () {
  const host = server.address().address;
  const port = server.address().port;
  console.log("应用实例，访问地址为 http://%s:%s", host, port);
});
