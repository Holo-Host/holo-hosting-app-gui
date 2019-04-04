/* HC Action Constants Import: */
import { DNA_INSTANCE, PROVIDER_ZOME_NAME, HOST_ZOME_NAME } from '../../utils/constants';

/* HC Action Constants Export: */
// PROVIDER Action Consts:
export const REGISTER_AS_PROVIDER = 'REGISTER_AS_PROVIDER';
export const IS_REGISTERED_AS_PROVIDER = 'IS_REGISTERED_AS_PROVIDER';
// HOST Action Consts
export const REGISTER_AS_HOST = 'REGISTER_AS_HOST';
export const IS_REGISTERED_AS_HOST = 'IS_REGISTERED_AS_HOST';

/*  React Admin Imports  */
// import { UPDATE } from 'react-admin';

/** *************************** HC ACTIONS: ************************************ */
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
    payload: {
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
