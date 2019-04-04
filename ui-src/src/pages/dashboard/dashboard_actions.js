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
    payload,
    meta: {
      holochainAction: true,
      callString:`${DNA_INSTANCE}/${PROVIDER_ZOME_NAME}/register_as_provider`,
    }
  }
};

export function isRegisteredAsProvider() {
  return {
    type: IS_REGISTERED_AS_PROVIDER,
    payload: [],
    meta: {
      holochainAction: true,
      callString:`${DNA_INSTANCE}/${PROVIDER_ZOME_NAME}/is_registered_as_provider`,
    }
  }
};

// payload: {{provider_doc:{kyc_proof:""}}
export function registerAsHost(payload) {
  return {
    type: REGISTER_AS_HOST,
    payload,
    meta: {
      holochainAction: true,
      callString:`${DNA_INSTANCE}/${HOST_ZOME_NAME}/register_as_host`,
    }
  }
};

export function isRegisteredAsHost() {
  return {
    type: IS_REGISTERED_AS_HOST,
    payload: [],
    meta: {
      holochainAction: true,
      callString:`${DNA_INSTANCE}/${HOST_ZOME_NAME}/is_registered_as_host`,
    }
  }
};
