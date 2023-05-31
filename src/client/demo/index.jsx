import React, { useState } from "react";
import { useSelector } from "react-redux";
import useStyles from "isomorphic-style-loader/useStyles";
import { GET_LIST } from "./reducer";
import * as service from "./service";
import Header from "./Header";
import s from "../common/base.less";
export default function Demo() {
  useStyles(s);
  const state = useSelector((state) => state.demo) || {};
  return (
    <div className="page-home">
      <Header />
    </div>
  );
}

Demo.loadData = (store) => {
  return Promise.all([service.getNewData()]).then(([data]) => {
    store.dispatch({
      type: GET_LIST,
      payload: data,
    });
  });
};
