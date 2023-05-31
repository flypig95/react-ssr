import React, { useState } from "react";
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

Demo.loadData = (store) => {
  return Promise.all([service.getNewData()]).then(([data]) => {
    store.dispatch({
      type: GET_LIST,
      payload: data,
    });
  });
};
