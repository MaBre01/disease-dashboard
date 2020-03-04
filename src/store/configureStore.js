import { applyMiddleware, createStore } from "redux";
import { loadState } from "./localStorage";
import { createBrowserHistory } from "history";
import thunk from "redux-thunk";
import routerMiddleware from "react-router-redux/lib/middleware";
import logger from "redux-logger";
import rootReducer from '../reducers';

const persistedStore = loadState();
export const history = createBrowserHistory();

export default createStore(
    rootReducer,
    persistedStore,
    applyMiddleware(thunk, routerMiddleware(history), logger)
);