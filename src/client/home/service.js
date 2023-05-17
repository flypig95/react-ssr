import axios from "axios";

export const getNewData = () => axios.get("//localhost:9002/api/newData.json");
