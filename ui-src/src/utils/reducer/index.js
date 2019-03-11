/* Under the hood, the react-admin uses Redux to manage state.
*
* The state has the following keys:
*/
const defaultReducerState = {
    admin: {}, // used by react-admin
    form: {}, // used by redux-form
    routing: {}, // used by react-router-redux
  }

const reducerState = defaultReducerState;
export default reducerState;
