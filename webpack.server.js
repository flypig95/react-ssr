const path = require("path");
const nodeExternals = require("webpack-node-externals");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const webpack = require("webpack");

const isDev = process.env.NODE_ENV === "dev";
const isPrd = process.env.NODE_ENV === "prd";
process.env.BABEL_ENV = "node"; //设置 babel 的运行环境
const isStyleIsomorphic = process.env.NODE_STYLE_ISOMORPHIC === "true"; // 是否样式同构

const config = {
  mode: isDev ? "development" : "production",
  entry: "./server/index.js",
  externalsPresets: { node: true },
  externals: [nodeExternals({ allowlist: [/\.css$/] })],
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
        test: /\.(png|jpg|gif|jpeg|svg|webp)$/,
        type: "asset",
        parser: {
          dataUrlCondition: {
            maxSize: 8 * 1024, // 8kb
          },
        },
        generator: {
          publicPath: "/images/",
          outputPath: "images/",
        },
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
  plugins: [
    // new CleanWebpackPlugin({
    //   cleanOnceBeforeBuildPatterns: ["**/*", "!app*", "!ssr.html", '!favicon.icon'],
    // }),
    new webpack.DefinePlugin({
      __STYLE_ISOMORPHIC__: JSON.stringify(isStyleIsomorphic),
      __dev__: JSON.stringify(isDev),
    }),
  ],
  watch: isDev,
};

if (isStyleIsomorphic)
  config.module.rules.push({
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
  });

module.exports = config;
