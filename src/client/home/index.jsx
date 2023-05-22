import React, { useState } from "react";
import { useSelector } from "react-redux";
import * as service from "./service";
export default function Home() {
  const state = useSelector((state) => state);
  console.log(state);
  // const [state, setState] = useState();
  return <div>home{state.name}</div>;
}

Home.loadData = () => {
  return service.getNewData().then((res) => {
    return res.data;
  });
};
