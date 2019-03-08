/*  Home Actions:  Actions change things in your application */

// // Action-Middleware Import
//  import { createHolochainAsyncAction } from '@holochain/hc-redux-middleware';

/* HC Action Constants Import: */
import { UPDATE } from 'react-admin';
import { DNA_INSTANCE, HOST_ZOME_NAME, WHOAMI_ZOME_NAME } from './constants';
/*  React Admin Imports  */

/** *************************** NON-HC ACTIONS: ************************************ */
/* NON-HC Action Constants Import: */
import { CHANGE_USERNAME } from './constants';

/** *************************** HC ACTIONS: ************************************ */
// // Call for FETCH_AGENT_STRING ()
// export const FetchAgentStringAsyncAction = createHolochainAsyncAction(DNA_INSTANCE, WHOAMI_ZOME_NAME, 'handle_get_agent');

// Call for FETCH_AGENT_STRING ()
export function fetch_agent() {
  console.log('>> FETCH_AGENT : payload <<');
  return {
    type: 'FETCH_AGENT',
    payload: [],
    meta: {
      holochainAction: true,
      callString: `${DNA_INSTANCE}/${WHOAMI_ZOME_NAME}/handle_get_agent`,
    },
  };
}

/* To add a new 'Non-HC' Action:
* 1) Import your constant
* 2) Add a function like this:
*    export function yourAction(const) {
*        return { type: YOUR_ACTION_CONSTANT, const: const }
*    }
*/

/**
 * Changes the input field of the form
 * @param  {name} name The new text of the input field
 * @return {object}    An action object with a type of CHANGE_USERNAME
 * */

export function changeUsername(username) {
  return {
    type: CHANGE_USERNAME,
    username,
    meta: {
      fetch: UPDATE,
      resource: 'provider',
    },
  };
}
