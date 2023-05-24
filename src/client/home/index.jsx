import React, { useState } from "react";
import { useSelector } from "react-redux";
import { GET_LIST } from "./reducer";
import * as service from "./service";
export default function Home() {
  const state = useSelector((state) => state.home) || {};
  return <div>home{state.name}</div>;
}

Home.loadData = (store) => {
  service.getNewData().then((res) => {
    store.dispatch({
      type: GET_LIST,
      payload: res,
    });
  });
};
