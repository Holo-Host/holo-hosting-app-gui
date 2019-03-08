/*  HomeReducer :  The reducer takes care of our data. Using actions, we can change our
 * application state.
 * To add a new action, add it to the switch statement in the reducer function
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return state.set('yourStateVariable', true);
 */

// Main Imports :
import { fromJS } from 'immutable';
/* HC Action Constants Import: */
import { DNA_INSTANCE, HOST_ZOME_NAME, WHOAMI_ZOME_NAME } from './constants';
/* NON-HC Action Constants Import: */
import { CHANGE_USERNAME } from './constants';

// The initial state of the App
export const INITIAL_STATE = fromJS({
  username: '',
  my_agent_string: '',
  my_agent_hash: '',
});

function homeReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case CHANGE_USERNAME:
      // Delete prefixed '@' from the github username
      console.log('Reducer Changes username');
      return state.set('username', action.name.replace(/@/gi, ''));

    // FETCH_AGENT_STRING  >> Success message & Result
    case `${DNA_INSTANCE}/${WHOAMI_ZOME_NAME}/whoami_SUCCESS`: {
      console.log('FETCH_AGENT_STRING_SUCCESS payload', payload);
      const my_agent_string = payload.name;
      const my_agent_hash = payload.hash;
      return {
        ...state,
        my_agent_string,
        my_agent_hash,
      };
    }

    // FETCH_AGENT_STRING >> Failure message
    case `${DNA_INSTANCE}/${WHOAMI_ZOME_NAME}/whoami_FAILURE`: {
      console.log('FETCH_AGENT_STRING_SUCCESS payload', payload);
    }

    default:
      return state;
  }
}

export default homeReducer;
