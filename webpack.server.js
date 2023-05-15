const path = require('path')
const nodeExternals = require("webpack-node-externals");

module.exports = {
  mode: 'development',
  entry: "./server/index.js",
  externalsPresets: { node: true },
  externals: [nodeExternals()],
  watch: true,
//   module: {
//     rules: [
//       {
//         test: /\.css?$/,
//         use: [
//           "isomorphic-style-loader",
//           {
//             loader: "css-loader",
//             options: {
//               modules: true,
//             },
//           },
//         ],
//       },
//     ],
//   },
  output: {
    filename: "server.js",
    path: path.resolve(__dirname, "dist"),
  },
};
