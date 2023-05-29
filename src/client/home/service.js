import axios from "axios";

export const getNewData = () =>
  axios.get("//localhost:9002/json").then((res) => {
    return res.data;
  });
