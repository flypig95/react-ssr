module.exports = {
  root: true, // 所有的文件都使用这个eslintrc配置，不进行就近父级查找
  // parser: '@typescript-eslint/parser',
  plugins: ["react"], //'prettier' '@typescript-eslint'
  settings: {
    react: {
      version: "detect",
    },
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    // 'plugin:@typescript-eslint/recommended',
    // 'plugin:prettier/recommended',
    // "prettier",
  ],
  env: { browser: true, node: true, es6: true, commonjs: true },
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module", // es module的模块语法
    // ecmaFeatures: {
    //   jsx: true, // 启用对jsx语法的支持，默认启用
    // },
  },
  globals: {
    // 全局变量
    __env__: true, // 全局变量__dev__就不会eslint报错
    __STYLE_ISOMORPHIC__: true,
  },
  rules: {
    // 'prettier/prettier': 'error', // 开启规则
    // "prettier/prettier": [
    //   "error",
    //   {
    //     // singleQuote: false,
    //   },
    //   {
    //     usePrettierrc: true,
    //   },
    // ],
    semi: 1, // 分号
    "@typescript-eslint/no-unused-vars": 0,
    "@typescript-eslint/no-var-requires": 0,
    "no-unused-vars": 1,
    "react/jsx-no-target-blank": 0,
  },
};
