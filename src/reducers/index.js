import { combineReducers } from "redux";
import diseasesReducer from './diseases';

const appReducer = combineReducers({
    diseasesReducer
});

const rootReducer = (state, action) => {
    return appReducer(state, action);
};

export default rootReducer;