module.exports = (api) => {
  api.cache.using(() => process.env.NODE_ENV === "dev");

  const config = {
    env: {
      browsers: {
        presets: [
          [
            "@babel/preset-env",
            {
              useBuiltIns: "usage", // 根据targets目标浏览器按需加载polyfill, 会自动的引入@babel/polyfill
              corejs: {
                version: 3,
                proposals: false, // 是否实现提案阶段中的特性/功能
              },
              targets: {
                browsers: [
                  ">1%",
                  "last 4 versions",
                  "Firefox ESR",
                  "not ie < 9",
                ], // 浏览器配置也可以写成 .browserslistrc文件
              },
              modules: false, // es模块转换成其他的模块语法
            },
          ],
          "@babel/preset-react",
        ],
        plugins: [
          [
            "@babel/plugin-transform-runtime",
            {
              corejs: false,
            },
          ],
          // "@babel/plugin-syntax-dynamic-import",
          // "@babel/plugin-proposal-class-properties",
        ],
      },
      node: {
        presets: [
          [
            "@babel/preset-env",
            {
              targets: {
                node: "current",
              },
            },
          ],
          "@babel/preset-react",
        ],
        plugins: [
          "@babel/plugin-transform-runtime",
          // "@babel/plugin-syntax-dynamic-import",
          // "@babel/plugin-proposal-class-properties",
        ],
      },
    },
  };

  return config;
};
