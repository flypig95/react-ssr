import { createStore, combineReducers } from "redux";
import homeReducer from "~/client/home/reducer";

const rootReducer = combineReducers({
  home: homeReducer,
});

const initState = typeof window === "undefined" ? {} : window.__data || {};

export default createStore(rootReducer, initState);
