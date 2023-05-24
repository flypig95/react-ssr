import axios from "axios";

export const getNewData = () =>
  axios.get("//localhost:9002/json").then((res) => {
    console.log(res.data);
    return res.data;
  });
