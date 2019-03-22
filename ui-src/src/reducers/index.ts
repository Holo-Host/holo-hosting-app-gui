import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router'
import { reducer as reduxFormReducer } from 'redux-form';
import reducers from "./reducers";

const createRootReducer = (history: any) => {
  return combineReducers({
    router: connectRouter(history),
    form: reduxFormReducer, // mounted under "form"
    reducers
  });
};

export default createRootReducer;
