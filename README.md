# React 服务端渲染
使用react18中的renderToPipeableStream流式渲染，以支持服务端渲染时能够使用react.lazy和Suspense进行代码拆分。（react18、redux、less、express、webpack）

## 启动项目

1. node 版本 v16.13
2. npm install nodemon -g
3. cd node_server，node app.js 启动 mock 数据服务，npm run dev 启动项目，浏览器访问地址 localhost:8080/demo

## 开发事项

1. router.js 中的路由，有 ssr：true 或者 loadData 时相应的页面会进行服务端渲染
2. 有初始化页面的 http 请求，在 loadData 中 promise.all 中调用并且返回 promise.all，结合 redux 初始化数据。例如：

```js
import React from "react";
import { useSelector } from "react-redux";
import { GET_LIST } from "./reducer";
import * as service from "./service";
import Header from "./Header";
import "../styles/base.less";
export default function Demo() {
  const state = useSelector((state) => state.demo) || {};
  return (
    <div className="page-home">
      <Header />
    </div>
  );
}

Demo.loadData = (store, { req }) => {
  return Promise.all([service.getNewData()]).then(([data]) => {
    store.dispatch({
      type: GET_LIST,
      payload: data,
    });
  });
};
```

## 保证 node 服务器稳定的措施

1. express 同步代码的错误，错误处理中间件
2. 异步代码（promise）错误，loadData 中所有的请求都要放在 promise.all 中，并且返回 promise.all()
3. 生产环境部署阶段，使用docker-compose启动应用容器，配置restart: always，让容器停止运行后能够自动重启。还可启动多个应用容器，配合nginx的负载均衡。
