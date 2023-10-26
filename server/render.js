import path from "path";
import fs from "fs";
import React from "react";
import { renderToPipeableStream } from "react-dom/server";
import pkg from "../package.json";
import App from "./App";

const deployEnv = process.env.DEPLOY_ENV; // test、prd
const isDev = process.env.NODE_ENV === "development";
const cdnPath = `https://static.zuifuli.com/${deployEnv}/${pkg.name}`;
const prefix = {
  test: "t-",
  prd: "",
};

const getFilePath = (nameStr, hash) => {
  if (!hash) return "";
  const arr = nameStr.split(".");
  const name = arr[0];
  const suffix = arr[1];
  const filename = `${isDev ? "dev" : deployEnv}.pc.${name}.${hash}.${suffix}`;
  return isDev ? `/${filename}` : `${cdnPath}/${filename}`;
};
const html = fs.readFileSync(
  path.resolve(
    process.cwd(),
    `${prefix[deployEnv]}dist/react-ssr/ssr.html`
  ),
  "utf8"
);

const mainJSHash = /(?<=main.).{6}(?=.js)/.exec(html);
const mainCssHash = /(?<=main.).{6}(?=.css)/.exec(html);
const vendorJSHash = /(?<=vendor.).{6}(?=.js)/.exec(html);
const vendorCssHash = /(?<=vendor.).{6}(?=.css)/.exec(html);
const commonsJSHash = /(?<=commons.).{6}(?=.js)/.exec(html);
const commonsCssHash = /(?<=commons.).{6}(?=.css)/.exec(html);

const mainJs = getFilePath("main.js", mainJSHash);
const mainCss = getFilePath("main.css", mainCssHash);
const vendorJs = getFilePath("vendor.js", vendorJSHash);
const vendorCss = getFilePath("vendor.css", vendorCssHash);
const commonsJs = getFilePath("commons.js", commonsJSHash);
const commonCss = getFilePath("commons.css", commonsCssHash);
export const assetMap = {
  "main.js": mainJs,
  "main.css": mainCss,
  "vendor.js": vendorJs,
  "vendor.css": vendorCss,
  "commons.js": commonsJs,
  "commons.css": commonCss,
};

export function render({ req, res, ssr, renderToPiStrProps = {} }) {
  const appProps = {
    assetMap,
    req,
    ssr,
  };
  const { pipe } = renderToPipeableStream(<App {...appProps} />, {
    onShellReady() {
      res.setHeader("content-type", "text/html;charset=utf-8");
      pipe(res);
    },
    ...renderToPiStrProps,
  });
}
