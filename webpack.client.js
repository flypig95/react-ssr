const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const webpack = require("webpack");
// const { ModuleFederationPlugin } = require('webpack').container;

const isDev = process.env.NODE_ENV === "dev";
const isPrd = process.env.NODE_ENV === "prd";
process.env.BABEL_ENV = "browsers"; //指定 babel 编译环境
const isStyleIsomorphic = process.env.NODE_STYLE_ISOMORPHIC === "true"; // 是否样式同构

const config = {
  mode: isDev ? "development" : "production",
  entry: "./src/client/index.jsx",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].[contenthash:6].js",
    chunkFilename: "[name].[contenthash:6].js",
    // publicPath: '/dist',
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
        test: /\.(png|jpg|gif|jpeg|svg)$/,
        type: "asset/resource",
        parser: {
          detaUrlCondition: {
            maxSize: 1 * 1024, // 1kb
          },
        },
      },
      {
        test: /\.(ttf|otf|woff|woff2|eot)$/,
        type: "asset/inline",
        parser: {
          detaUrlCondition: {
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
    minimizer: isStyleIsomorphic ? [`...`] : [`...`, new CssMinimizerPlugin()],
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
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ["**/*", "!app.js"],
    }),
    new HtmlWebpackPlugin({
      title: "react-ssr",
      template: "./index.html",
      favicon: "./favicon.ico",
      filename: "ssr.html",
      // minify: {
      //   collapseWhitespace: true, //删除空格、换行
      // },
    }),
    new webpack.DefinePlugin({
      __STYLE_ISOMORPHIC__: JSON.stringify(isStyleIsomorphic),
    }),
    // new MiniCssExtractPlugin({
    //   filename: `[name].[contenthash:6].css`,
    //   chunkFilename: `[name].[contenthash:6].css`,
    // }),
    // new ModuleFederationPlugin({
    //   name: 'pc',
    //   filename: 'remoteEntry.js',
    //   exposes: {
    //     './Footer': './src/home/Footer.jsx'
    //   },
    //   remote: {},
    //   // shared: ['react']
    // })
  ],
  cache: {
    type: "filesystem",
    cacheDirectory: path.join(__dirname, "node_modules/.cac/webpack"),
  },
  watch: isDev,
  // devServer: {
  //   static: path.resolve(__dirname, "dist"),
  //   open: true,
  //   port: 9000,
  //   // proxy: {
  //   //   '/app-api': {
  //   //     target: 'http://api.gymuseum.cn',
  //   //     secure: false,
  //   //     changeOrigin: true,
  //   //   },
  //   // },
  //   // historyApiFallback: {
  //   //   rewrites:[
  //   //     { from: /./, to: '/index.html' },
  //   //   ]
  //   // },
  // },
};

// 样式处理start
function getStyleLoaders(useCss = false) {
  const loaders = [
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
      },
    },
  ];
  if (useCss) {
    loaders.pop();
  }
  if (isPrd) {
    loaders.unshift({
      loader: MiniCssExtractPlugin.loader,
    });
  }
  if (isDev) {
    loaders.unshift({ loader: "style-loader" });
  }
  return loaders;
}

const styleIsomorphicRules = {
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
};
const styleRules = [
  {
    test: /\.less$/,
    use: getStyleLoaders(),
  },
  {
    test: /\.css$/,
    use: getStyleLoaders(true),
  },
];
if (isStyleIsomorphic) {
  config.module.rules.push(styleIsomorphicRules);
} else {
  config.module.rules = config.module.rules.concat(styleRules);
  config.plugins.push(
    new MiniCssExtractPlugin({
      filename: `[name].[contenthash:6].css`,
      chunkFilename: `[name].[contenthash:6].css`,
    })
  );
}
// 样式处理end

module.exports = config;
