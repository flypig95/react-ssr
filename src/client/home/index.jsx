import React from "react";
import * as service from "./service";

export default function Home() {
  return <div>home</div>;
}

Home.loadData = () => {
  return service.getNewData().then((res) => {
    console.log(res.data);
    return res.data;
  });
};
