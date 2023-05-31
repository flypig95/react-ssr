# React 服务端渲染
react、redux、less、express、webpack

## 启动项目

1. node 版本 v16.13
2. npm install nodemon pm2 -g
3. cd node_server，node app.js 启动 mock 数据服务，npm run dev 启动项目，浏览器访问地址 localhost:3000/demo

## 开发事项

1. router.js 中的路由，有 ssr：true 或者 loadData 时相应的页面会进行服务端渲染
2. 有初始化页面的 http 请求，在 loadData 中 promise.all 中调用并且返回 promise.all，结合 redux 初始化数据。例如：

```js
import React from "react";
import { useSelector } from "react-redux";
import { GET_LIST } from "./reducer";
import * as service from "./service";
import Content from "./Content";
export default function Demo() {
  const state = useSelector((state) => state.demo) || {};
  return (
    <div className="page-home">
      <Content />
    </div>
  );
}

Demo.loadData = (store) =>
  Promise.all([service.getNewData()]).then(([data]) => {
    store.dispatch({
      type: GET_LIST,
      payload: data,
    });
  });
```

3. 支持样式同构，设置 node 环境变量 NODE_STYLE_ISOMORPHIC=true, 如 pacakge.json-->script-->dev:client。然后访问 http://localhost:3000/demo。
样式同构可以避免页面闪动的问题，启用样式同构后需以 css modues 的形式编写样式。
使用 rem 单位时无法避免页面闪动，此时不推荐启用样式同构。

## 保证 node 服务器稳定的措施

1. express 同步代码的错误，错误处理中间件
2. 异步代码（promise）错误，loadData 中所有的请求都要放在 promise.all 中，并且返回 promise.all()
3. 使用 pm2 做 node 进程管理，集群模式创建多个应用实例负载均衡保证服务器的稳定，服务器崩溃后会自动重启
