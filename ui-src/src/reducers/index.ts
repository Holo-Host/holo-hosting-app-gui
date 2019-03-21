import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router'
import reducers from "./reducers";

const createRootReducer = (history: any) => {
  return combineReducers({
    router: connectRouter(history),
    reducers
  });
};

export default createRootReducer;
