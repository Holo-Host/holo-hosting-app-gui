import { createHolochainAsyncAction } from '@holochain/hc-redux-middleware';
import { setInstance, PROVIDER, HOST } from '../utils/constants'
const DNA_INSTANCE = setInstance();


/*WhoAmI Zome calls*/
export const GetAgentDetails = createHolochainAsyncAction<{}, Array<any>>(DNA_INSTANCE, 'whoami', 'get_user');

/*Provider Zome calls*/
export const IsRegisterProviderAction = createHolochainAsyncAction<{}, Array<any>>(DNA_INSTANCE, PROVIDER, 'is_registered_as_provider');
export const RegisterhAppBundle = createHolochainAsyncAction<{}, Array<any>>(DNA_INSTANCE, PROVIDER, 'register_app');
export const GethAppDetails = createHolochainAsyncAction<{}, Array<any>>(DNA_INSTANCE, PROVIDER, 'get_app_details');
export const RegisterProvider = createHolochainAsyncAction<{}, Array<any>>(DNA_INSTANCE, PROVIDER, 'register_as_provider');

/*Host Zome calls*/
export const IsRegisterHostAction = createHolochainAsyncAction<{}, Array<any>>(DNA_INSTANCE, HOST, 'is_registered_as_host');
export const GetAllhApps = createHolochainAsyncAction<{}, Array<any>>(DNA_INSTANCE, HOST, 'get_all_apps');
export const RegisterHost = createHolochainAsyncAction<{}, Array<any>>(DNA_INSTANCE, HOST, 'register_as_host');
