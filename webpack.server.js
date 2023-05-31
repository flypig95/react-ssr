const path = require("path");
const nodeExternals = require("webpack-node-externals");

const isDev = process.env.NODE_ENV === "dev";
const isPrd = process.env.NODE_ENV === "prd";
process.env.BABEL_ENV = "node"; //设置 babel 的运行环境

module.exports = {
  mode: isDev ? "development" : "production",
  entry: "./src/server/index.js",
  externalsPresets: { node: true },
  externals: [nodeExternals()],
  module: {
    rules: [
      {
        test: /\.[j|t]sx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            cacheDirectory: true,
          },
        },
      },
      {
        test: /\.(css|less)?$/,
        use: [
          "isomorphic-style-loader",
          {
            loader: "css-loader",
            options: {
              esModule: false,
              modules: true,
            },
          },
          "postcss-loader",
          "less-loader",
        ],
      },
    ],
  },
  output: {
    filename: "app.js",
    path: path.resolve(__dirname, "./dist"),
  },
  devtool: isDev ? "eval-cheap-module-source-map" : false,
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
    alias: {
      "~": path.resolve(__dirname, "./src"),
    },
  },
  watch: isDev,
};
