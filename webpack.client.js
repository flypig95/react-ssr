const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const webpack = require("webpack");
const pkg = require("./package.json");
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
// const { ModuleFederationPlugin } = require('webpack').container;
process.env.BABEL_ENV = "browsers"; //指定 babel 编译环境
const env = process.env.NODE_ENV;
const isDev = env === "dev";
const isPrd = env === "prd";

const outputPath = {
  dev: `t-dist/${pkg.name}/`,
  test: `t-dist/${pkg.name}/`,
  prd: `dist/${pkg.name}/`,
};
const cdnPath = `https://static.zuifuli.com/${env}/${pkg.name}/`;
const publicPath = isDev ? "/" : cdnPath;
const filenamePrefix = `${env}.pc.[name].[contenthash:6]`;

const config = {
  mode: isDev ? "development" : "production",
  entry: "./src/index.jsx",
  output: {
    path: path.resolve(__dirname, outputPath[env]),
    filename: `${filenamePrefix}.js`,
    chunkFilename: `${filenamePrefix}.js`,
    publicPath,
  },
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
        test: /\.less$/,
        use: getStyleLoaders(),
      },
      {
        test: /\.css$/,
        use: getStyleLoaders(true),
      },
      {
        test: /\.(png|jpg|gif|jpeg|svg|webp)$/,
        type: "asset",
        parser: {
          dataUrlCondition: {
            maxSize: 8 * 1024, // 8kb 默认值
          },
        },
        generator: {
          outputPath: "images/",
          publicPath: isDev ? `/images/` : `${cdnPath}images/`,
        },
      },
      {
        test: /\.(ttf|otf|woff|woff2|eot)$/,
        type: "asset",
        parser: {
          dataUrlCondition: {
            maxSize: 8 * 1024, // 8kb
          },
        },
      },
    ],
  },
  devtool: isDev ? "eval-cheap-module-source-map" : false,
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
    alias: {
      "~": path.resolve(__dirname, "./src"),
    },
  },
  optimization: {
    // mode: production下usedExports、sideEffects、minimize默认为true
    // usedExports: isPrd,
    // sideEffects: isPrd,
    // minimize: isPrd,
    minimizer: [`...`, new CssMinimizerPlugin()],
    splitChunks: {
      name: false,
      cacheGroups: {
        commons: {
          // 公共的业务模块chunk
          name: "commons",
          chunks: "all",
          minChunks: 2,
        },
        vendor: {
          // 第三方模块chunk
          name: "vendor",
          test: /[\\/]node_modules[\\/]/,
          chunks: "all",
          priority: 10,
        },
      },
    },
    // runtimeChunk: {
    //   name: (entrypoint) => `runtimechunk~${entrypoint.name}`,
    // },
  },
  plugins: [
    //     new CleanWebpackPlugin({
    //   cleanOnceBeforeBuildPatterns: ["**/*", "!app*"],
    // }),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: "./index.html",
      filename: "ssr.html",
      // favicon: "./public/favicon.ico",
      // ...htmlWebpackPluginOpts,
      // minify: {
      //   collapseWhitespace: true, //删除空格、换行
      // },
    }),
    new MiniCssExtractPlugin({
      filename: `${filenamePrefix}.css`,
      chunkFilename: `${filenamePrefix}.css`,
    }),
    new webpack.DefinePlugin({
      __dev__: JSON.stringify(isDev),
    }),
    // new BundleAnalyzerPlugin()
  ],
  cache: {
    type: "filesystem",
    cacheDirectory: path.join(__dirname, "node_modules/.cac/webpack"),
  },
  watch: isDev,
};

// 样式处理start
function getStyleLoaders(useCss = false) {
  const loaders = [
    isDev
      ? { loader: "style-loader" }
      : {
          loader: MiniCssExtractPlugin.loader,
        },
    {
      loader: "css-loader",
      options: {
        sourceMap: isDev,
      },
    },
    {
      loader: "postcss-loader",
      options: {
        postcssOptions: {
          sourceMap: isDev,
        },
      },
    },
    {
      loader: "less-loader",
      options: {
        sourceMap: isDev,
        lessOptions: {
          modifyVars: {
            "@primary-color": "#ff5d0d",
          },
        },
      },
    },
  ];
  if (useCss) {
    loaders.pop();
  }
  return loaders;
}

// 样式处理end
module.exports = config;
