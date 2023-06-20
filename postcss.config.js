const px2rem = require("postcss-pxtorem");

module.exports = (api) => {
  // `api.file` - path to the file
  // `api.mode` - `mode` value of webpack, please read https://webpack.js.org/configuration/mode/
  // `api.webpackLoaderContext` - loader context for complex use cases
  // `api.env` - alias `api.mode` for compatibility with `postcss-cli`
  // `api.options` - the `postcssOptions` options

  const plugins = [
    [
      "postcss-preset-env",
      {
        autoprefixer: {
          flexbox: "no-2009",
        },
        stage: 3,
      },
    ],
  ];

  // if (!/node_modules/.test(api.file)) {
  //   plugins.unshift(px2rem({ rootValue: 100, propList: ["*"] }));
  // }
  return {
    // You can specify any options from https://postcss.org/api/#processoptions here
    plugins,
  };
};
