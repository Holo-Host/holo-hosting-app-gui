/* HC Action Constants Import: */
import { DNA_INSTANCE, HOST_ZOME_NAME, WHOAMI_ZOME_NAME } from './constants';
/*  React Admin Imports  */
import { UPDATE } from 'react-admin';

/** *************************** NON-HC ACTIONS: ************************************ */
/* NON-HC Action Constants Import: */
// import { CHANGE_USERNAME } from './constants';

/** *************************** HC ACTIONS: ************************************ */
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
