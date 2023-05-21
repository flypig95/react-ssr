import express from "express";
import routes from "../routes";
import { matchPath } from "react-router-dom";
import render from "./render";
const app = express();
app.use(express.static("dist"));

app.get("*", function (req, res) {
  console.log(routes, req.url);
  const route = routes.filter((route) => matchPath(route, req.url))[0] || {};
  const { loadData } = route;
  let html = "";
  if (typeof loadData === "function") {
    const data = loadData();
    const isPromise =
      Object.prototype.toString.call(data) === "[object Promise]";
    if (isPromise) {
      data
        .then((result) => {
          html = render(req, result);
          res.send(html);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
  html = render(req, {});
  res.send(html);
});

const server = app.listen(9001, function () {
  const host = server.address().address;
  const port = server.address().port;
  console.log("应用实例，访问地址为 http://%s:%s", host, port);
});
