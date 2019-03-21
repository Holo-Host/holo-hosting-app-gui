/* HC Action Constants Import: */
import { DNA_INSTANCE, PROVIDER_ZOME_NAME, HOST_ZOME_NAME } from '../../utils/constants';

/* HC Action Constants Export: */
export const REGISTER_PROVIDER = 'REGISTER_PROVIDER';
export const REGISTER_HOST = 'REGISTER_HOST';

/*  React Admin Imports  */
// import { UPDATE } from 'react-admin';

/** *************************** HC ACTIONS: ************************************ */

export function registerProvider() {
  return {
    type: REGISTER_PROVIDER,
    payload: {
          provider_doc:{
            kyc_proof:""
        }
      },
    meta: {
      holochainAction: true,
      callString:`${DNA_INSTANCE}/${PROVIDER_ZOME_NAME}/register_as_provider`,
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

export function registerHost() {
  return {
    type: REGISTER_HOST,
    payload: {
        provider_doc:{
          kyc_proof:""
      }
    },
    meta: {
      holochainAction: true,
      callString:`${DNA_INSTANCE}/${HOST_ZOME_NAME}/register_as_host`,
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
