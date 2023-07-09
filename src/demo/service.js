import axios from "axios";

export const getNewData = () =>
  axios.get("//localhost:3001/json").then((res) => {
    return res.data;
  });
