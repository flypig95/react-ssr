import React, { useState } from "react";
import { useSelector } from "react-redux";
import { GET_LIST } from "./reducer";
import * as service from "./service";
import Header from "./Header";
import Content from "./Content";
export default function Home() {
  const state = useSelector((state) => state.home) || {};
  return (
    <div className="page-home">
      {/* <Header /> */}
      <Content />
    </div>
  );
}

Home.loadData = (store) => {
  return Promise.all([service.getNewData()]).then(([data]) => {
    store.dispatch({
      type: GET_LIST,
      payload: data,
    });
  });
};
