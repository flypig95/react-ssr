const path = require("path");
const nodeExternals = require("webpack-node-externals");
const webpack = require("webpack");

process.env.BABEL_ENV = "node"; //设置 babel 的运行环境
const isDev = process.env.NODE_ENV === "dev";

const config = {
  mode: isDev ? "development" : "production",
  entry: "./server/index.js",
  externalsPresets: { node: true },
  externals: [nodeExternals({ allowlist: [/\.css$/] })], // 排除的node_modules中的库（允许animation.css这类的样式库）
  module: {
    rules: [
      {
        test: /\.[j|t]sx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            cacheDirectory: true,
            plugins: [
              [
                "babel-plugin-transform-require-ignore",
                {
                  extensions: [".less", ".css"],
                },
              ],
            ],
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
          publicPath: `/images/`,
          outputPath: `images/`,
        },
      },
    ],
  },
  output: {
    filename: "app.js",
    path: path.resolve(__dirname, "dist-ssr"),
    // publicPath,
  },
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
    alias: {
      "~": path.resolve(__dirname, "./src"),
    },
  },
  plugins: [
    new webpack.DefinePlugin({
      __dev__: JSON.stringify(isDev),
    }),
  ],
  watch: isDev,
};

module.exports = config;
