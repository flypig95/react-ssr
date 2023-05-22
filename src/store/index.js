import { createStore, combineReducers } from "redux";

const rootReducer = combineReducers({
  home: require("~/client/home/reducer"),
});

const initState =
  typeof window === "undefined" ? {} : window?.context?.state || {};

export default createStore(rootReducer, initState);
