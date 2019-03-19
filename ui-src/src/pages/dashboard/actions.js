/* HC Action Constants Import: */
import { REGISTER_PROVIDER, REGISTER_HOST } from '../../utils/constants';
/*  React Admin Imports  */
// import { UPDATE } from 'react-admin';

/** *************************** HC ACTIONS: ************************************ */

export function registerProvider() {
  return {
    type: 'REGISTER_PROVIDER',
    payload: {provider_doc:{
      kyc_proof:""
    }},
    meta: {
      holochainAction: true,
      callString:REGISTER_PROVIDER,
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
    type: 'REGISTER_HOST',
    payload: {provider_doc:{
      kyc_proof:""
    }},
    meta: {
      holochainAction: true,
      callString:REGISTER_HOST,
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
