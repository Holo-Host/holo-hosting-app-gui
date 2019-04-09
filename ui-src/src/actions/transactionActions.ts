import { createHolochainZomeCallAsyncAction } from '@holochain/hc-redux-middleware';
import { setInstance, PROVIDER, HOST } from '../utils/constants'
const DNA_INSTANCE = setInstance();


/*WhoAmI Zome calls*/
export const GetAgentDetails = createHolochainZomeCallAsyncAction<{}, Array<any>>(DNA_INSTANCE, 'whoami', 'get_user');

/*Provider Zome calls*/
export const IsRegisterProviderAction = createHolochainZomeCallAsyncAction<{}, Array<any>>(DNA_INSTANCE, PROVIDER, 'is_registered_as_provider');




// export const RegisterhAppBundle = createHolochainZomeCallAsyncAction<{}, Array<any>>(DNA_INSTANCE, PROVIDER, 'register_app');
export function register_hApp_bundle(payload: any) {
  console.log(">> register_hApp_bundle : payload <<", payload);
  return {
    type: 'REGISTER_HAPP_BUNDLE',
    payload,
    meta: {
    	holochainAction: true,
    	callString:   `${DNA_INSTANCE}/${PROVIDER}/register_app`,
    }
  }
}


export const GethAppDetails = createHolochainZomeCallAsyncAction<{}, Array<any>>(DNA_INSTANCE, PROVIDER, 'get_app_details');
export const RegisterProvider = createHolochainZomeCallAsyncAction<{}, Array<any>>(DNA_INSTANCE, PROVIDER, 'register_as_provider');

export const AddDomainName = createHolochainZomeCallAsyncAction<{}, Array<any>>(DNA_INSTANCE, PROVIDER, 'add_app_domain_name');
export const AddServiceLogDetails = createHolochainZomeCallAsyncAction<{}, Array<any>>(DNA_INSTANCE, PROVIDER, 'add_service_log_details');
export const GetRegisteredApps = createHolochainZomeCallAsyncAction<{}, Array<any>>(DNA_INSTANCE, PROVIDER, 'get_my_registered_app');

/*Host Zome calls*/
export const IsRegisterHostAction = createHolochainZomeCallAsyncAction<{}, Array<any>>(DNA_INSTANCE, HOST, 'is_registered_as_host');
export const GetAllhApps = createHolochainZomeCallAsyncAction<{}, Array<any>>(DNA_INSTANCE, HOST, 'get_all_apps');
export const RegisterHost = createHolochainZomeCallAsyncAction<{}, Array<any>>(DNA_INSTANCE, HOST, 'register_as_host');
