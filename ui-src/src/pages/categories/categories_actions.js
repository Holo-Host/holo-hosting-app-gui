/* HC Action Constants Import: */
import { DNA_INSTANCE, WHOAMI_ZOME_NAME } from '../../utils/constants';
/*  React Admin Imports  */
// import { UPDATE } from 'react-admin';

/* HC Action Constants Export: */
export const FETCH_AGENT = 'FETCH_AGENT';

/** *************************** HC ACTIONS: ************************************ */
// Call for FETCH_AGENT_STRING ()
 // add basePath
export function fetchAgent() {
  return {
    type: FETCH_AGENT,
    payload: {
      instance_id:DNA_INSTANCE,
      zome:WHOAMI_ZOME_NAME,
      function:"get_user",
      params:{}
    },
    meta: {
      holochainAction: true,
      callString: `call`,
      // fetch: UPDATE,
      // resource: 'categories'
    },
    onSuccess: {
       notification: {
           body: 'resources.comments.notification.approved_success',
           level: 'info',
       },
       redirectTo: '/',
       // basePath
     },
     onFailure: {
       notification: {
           body: 'resources.comments.notification.approved_failure',
           level: 'warning'
       }
     }
  }
};
