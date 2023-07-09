import {
  legacy_createStore as createStore,
  combineReducers,
  applyMiddleware,
} from "redux";
import thunk from "redux-thunk";
import demoReducer from "~/demo/reducer";

const rootReducer = combineReducers({
  demo: demoReducer,
});

const initState = typeof window === "undefined" ? {} : window.__data || {};

export default createStore(rootReducer, initState, applyMiddleware(thunk));
