import path from "path";
import fs from "fs";
import express from "express";
import routes from "../routes";
import { matchPath } from "react-router-dom";
import render from "./render";
import store from "~/store";
const app = express();
app.use(express.static("dist"));

app.get("*", function (req, res, next) {
  console.log(req.url);
  const route = routes.filter((route) => matchPath(route, req.url))[0];
  if (route) {
    const { loadData } = route;
    if (typeof loadData === "function") {
      loadData(store);
      const unsubscribe = store.subscribe(() => {
        let html = "";
        try {
          html = render(req);
        } catch (err) {
          html = fs.readFileSync(
            path.resolve(process.cwd(), "dist/ssr.html"),
            "utf8"
          );
        }
        res.send(html);
        unsubscribe();
      });
    } else {
      res.sendFile(path.resolve(process.cwd(), "dist/ssr.html"));
    }
  } else {
    res.sendStatus(404);
  }
});

const server = app.listen(9001, function () {
  const host = server.address().address;
  const port = server.address().port;
  console.log("应用实例，访问地址为 http://%s:%s", host, port);
});
