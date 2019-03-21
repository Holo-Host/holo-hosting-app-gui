/* HC Action Constants Import: */
import { DNA_INSTANCE, PROVIDER_ZOME_NAME, HOST_ZOME_NAME  } from '../../utils/constants';

/* HC Action Constants Export: */
// PROVIDER Action Consts:
export const REGISTER_HAPP_BUNDLE = 'REGISTER_HAPP_BUNDLE';
export const FETCH_HAPP_BUNDLES = 'FETCH_HAPP_BUNDLES';
export const ADD_HAPP_BUNDLE_DETAILS = 'ADD_HAPP_BUNDLE_DETAILS';
export const FETCH_HAPP_BUNDLE_DETAILS = 'FETCH_HAPP_BUNDLE_DETAILS';
// HOST Action Consts
export const FETCH_ALL_HAPP_BUNDLES = 'FETCH_ALL_HAPP_BUNDLES';

/*  React Admin Imports  */
// import { UPDATE } from 'react-admin';

/***************************************************** HAPP PROVIDER ACTIONS *****************************************************/
// payload: { ui_hash:String, dna_list:Array<String> }
export function registerhAppBundle(payload) {
  return {
    type: REGISTER_HAPP_BUNDLE,
    payload,
    meta: {
      holochainAction: true,
      callString:`${DNA_INSTANCE}/${PROVIDER_ZOME_NAME}/register_app`,
      // fetch: UPDATE,
      // resource: 'categories'
    },
    onSuccess: {
       notification: {
           body: 'resources.comments.notification.approved_success',
           level: 'info',
       },
       redirectTo: '/happs',
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

// payload: NONE >> RETURNS ALL REGISTERED APP BUNDLES
export function fetchhAppBundles() {
  return {
    type: FETCH_HAPP_BUNDLES,
    payload:[],
    meta: {
      holochainAction: true,
      callString:`${DNA_INSTANCE}/${PROVIDER_ZOME_NAME}/get_my_registered_app`,
      // fetch: UPDATE,
      // resource: 'categories'
    },
    onSuccess: {
       notification: {
           body: 'resources.comments.notification.approved_success',
           level: 'info',
       },
       redirectTo: '/happs',
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

// payload: { app_details:{ADD APP DETAIL BODY HERE}, app_hash:String }
export function addhAppDetails(payload) {
  return {
    type: ADD_HAPP_BUNDLE_DETAILS,
    payload,
    meta: {
      holochainAction: true,
      callString:`${DNA_INSTANCE}/${PROVIDER_ZOME_NAME}/add_app_details`,
      // fetch: UPDATE,
      // resource: 'categories'
    },
    onSuccess: {
       notification: {
           body: 'resources.comments.notification.approved_success',
           level: 'info',
       },
       redirectTo: '/happs',
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

// payload: { app_hash:String }
export function gethAppBundleDetails(payload) {
  return {
    type: FETCH_HAPP_BUNDLE_DETAILS,
    payload,
    meta: {
      holochainAction: true,
      callString:`${DNA_INSTANCE}/${PROVIDER_ZOME_NAME}/get_app_details`,
      // fetch: UPDATE,
      // resource: 'categories'
    },
    onSuccess: {
       notification: {
           body: 'resources.comments.notification.approved_success',
           level: 'info',
       },
       redirectTo: '/happs',
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



/***************************************************** HOST ACTIONS *****************************************************/
// payload: NONE >> RETURNS ALL APP BUNDLES AVAILABLE FOR HOST to HOST
export function fetchAllhAppBundles() {
  return {
    type: FETCH_ALL_HAPP_BUNDLES,
    payload: {},
    meta: {
      holochainAction: true,
      callString:`${DNA_INSTANCE}/${HOST_ZOME_NAME}/get_all_apps`,
      // fetch: UPDATE,
      // resource: 'categories'
    },
    onSuccess: {
       notification: {
           body: 'resources.comments.notification.approved_success',
           level: 'info',
       },
       redirectTo: '/happs',
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
