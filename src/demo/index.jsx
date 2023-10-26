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
