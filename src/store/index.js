import { createStore, combineReducers } from "redux";
import demoReducer from "~/client/demo/reducer";

const rootReducer = combineReducers({
  demo: demoReducer,
});

const initState = typeof window === "undefined" ? {} : window.__data || {};

export default createStore(rootReducer, initState);
