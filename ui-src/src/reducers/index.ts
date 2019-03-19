import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router'
import transactionReducer from "./transactionReducer";

const createRootReducer = (history: any) => {
  return combineReducers({
    router: connectRouter(history),
    transactionReducer
  });
};

export default createRootReducer;
