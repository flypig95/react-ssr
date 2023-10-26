import React, { Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import routes from "./routes";
import store from "~/store";

const router = createBrowserRouter(routes);

export default function App() {
  return (
    <Suspense fallback={<div>loading...</div>}>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </Suspense>
  );
}
