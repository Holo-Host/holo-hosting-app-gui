/* HC Action Constants Import: */
import { DNA_INSTANCE, PROVIDER_ZOME_NAME, HOST_ZOME_NAME  } from '../../utils/constants';
/*  React Admin Imports  */
import { UPDATE } from 'react-admin';

/* HC Action Constants Export: */
// PROVIDER Action Consts:
export const REGISTER_AS_PROVIDER = 'REGISTER_AS_PROVIDER';
export const IS_REGISTERED_AS_PROVIDER = 'IS_REGISTERED_AS_PROVIDER';
export const REGISTER_HAPP_BUNDLE = 'REGISTER_HAPP_BUNDLE';
export const FETCH_HAPP_BUNDLES = 'FETCH_HAPP_BUNDLES';
export const ADD_HAPP_BUNDLE_DETAILS = 'ADD_HAPP_BUNDLE_DETAILS';
export const FETCH_HAPP_BUNDLE_DETAILS = 'FETCH_HAPP_BUNDLE_DETAILS';
// HOST Action Consts
export const REGISTER_AS_HOST = 'REGISTER_AS_HOST';
export const IS_REGISTERED_AS_HOST = 'IS_REGISTERED_AS_HOST';
export const FETCH_ALL_HAPP_BUNDLES = 'FETCH_ALL_HAPP_BUNDLES';


/***************************************************** HAPP PROVIDER ACTIONS *****************************************************/
// payload: {{provider_doc:{kyc_proof:""}}
export function registerAsProvider(payload) {
  return {
    type: REGISTER_AS_PROVIDER,
    payload:{
      instance_id:DNA_INSTANCE,
      zome:PROVIDER_ZOME_NAME,
      function:"register_as_provider",
      params:payload
    },
    meta: {
      holochainAction: true,
      callString:`call`,
    }
  }
};

export function isRegisteredAsProvider() {
  return {
    type: IS_REGISTERED_AS_PROVIDER,
    payload:{
      instance_id:DNA_INSTANCE,
      zome:PROVIDER_ZOME_NAME,
      function:"is_registered_as_provider",
      params:{}
    },
    meta: {
      holochainAction: true,
      callString:`call`,
    }
  }
};

// payload: { ui_hash:String, dna_list:Array<String> }
export function registerhAppBundle(payload) {
  return {
    type: REGISTER_HAPP_BUNDLE,
    payload:{
      instance_id:DNA_INSTANCE,
      zome:PROVIDER_ZOME_NAME,
      function:"register_app",
      params:payload
    },
    meta: {
      holochainAction: true,
      callString:`call`,
    }
  }
};

// payload: NONE >> RETURNS ALL REGISTERED APP BUNDLES
export function fetchhAppBundles() {
  return {
    type: FETCH_HAPP_BUNDLES,
    payload:{
      instance_id:DNA_INSTANCE,
      zome:PROVIDER_ZOME_NAME,
      function:"get_my_registered_app_list",
      params:{}
    },
    meta: {
      holochainAction: true,
      callString:`call`,
    }
  }
};

// payload: { app_hash:String }
export function gethAppBundleDetails(payload) {
  return {
    type: FETCH_HAPP_BUNDLE_DETAILS,
    payload:{
      instance_id:DNA_INSTANCE,
      zome:PROVIDER_ZOME_NAME,
      function:"get_app_details",
      params:payload
    },
    meta: {
      holochainAction: true,
      callString:`call`,
    }
  }
};


/********************************************************************************/
/********************************************************************************/
export function raFetchhAppBundles(id, data, type, basePath){
  return {
    type: 'RA_FETCH_HAPP_BUNDLES',
    payload: { id, data: { ...data, is_approved: true } },
    meta: {
      fetch: UPDATE,
      resource: 'happs'
    },
    onSuccess: {
       notification: {
           body: 'resources.happs.notification.approved_success',
           level: 'info',
       },
       redirectTo: basePath,
     },
     onFailure: {
       notification: {
           body: `resources.happs.notification.approved_failure`,
           level: 'warning'
       }
     }
  }
};

/********************************************************************************/
/********************************************************************************/

// CALL THIS for the follwing types :
// type: REGISTER_HAPP_BUNDLE,
// type: FETCH_HAPP_BUNDLES,
export function makeCustomRAcall (type, resource, params, basePath) {
  console.log("inside the makeCustomRAcall -> type: ", type);
  console.log("inside the makeCustomRAcall -> resource: ", resource);
  // console.log("basePath Check: ",  basePath);
  // console.log("inside the makeCustomRAcall -> params: ", params);
  const id = params.id;
  const data = params.data;

  return {
    type,
    payload: { id, data: { ...data, is_approved: true } },
    meta: {
      fetch: UPDATE,
      resource
    },
    onSuccess: {
       notification: {
           body: `resources.${resource}.notification.approved_success`,
           level: 'info',
       },
        redirectTo: basePath,
       // redirectTo: `/${resource}`,
     },
     onFailure: {
       notification: {
           body: `resources.${resource}.notification.approved_failure`,
           level: 'warning'
       }
     }
  }
};
/********************************************************************************/
/********************************************************************************/

/***************************************************** HOST ACTIONS *****************************************************/
// payload: {{provider_doc:{kyc_proof:""}}
export function registerAsHost(payload) {
  return {
    type: REGISTER_AS_HOST,
    payload:{
      instance_id:DNA_INSTANCE,
      zome:HOST_ZOME_NAME,
      function:"register_as_host",
      params:payload
    },
    meta: {
      holochainAction: true,
      callString:`call`,
    }
  }
};

export function isRegisteredAsHost() {
  return {
    type: IS_REGISTERED_AS_HOST,
    payload:{
      instance_id:DNA_INSTANCE,
      zome:HOST_ZOME_NAME,
      function:"is_registered_as_host",
      params:{}
    },
    meta: {
      holochainAction: true,
      callString:`call`,
    }
  }
};

// payload: NONE >> RETURNS ALL APP BUNDLES AVAILABLE FOR HOST to HOST
export function fetchAllhAppBundles() {
  return {
    type: FETCH_ALL_HAPP_BUNDLES,
    payload:{
      instance_id:DNA_INSTANCE,
      zome:HOST_ZOME_NAME,
      function:"get_all_apps",
      params:{}
    },
    meta: {
      holochainAction: true,
      callString:`call`   }
  }
};
