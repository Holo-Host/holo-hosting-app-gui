import { createHolochainAsyncAction } from '@holochain/hc-redux-middleware';
import { setInstance, PROVIDER, HOST } from '../utils/constants'
const DNA_INSTANCE = setInstance();

export const IsRegisterProviderAction = createHolochainAsyncAction<{}, Array<any>>(DNA_INSTANCE, PROVIDER, 'is_registered_as_provider');
export const IsRegisterHostAction = createHolochainAsyncAction<{}, Array<any>>(DNA_INSTANCE, HOST, 'is_registered_as_host');
export const GetAgentDetails = createHolochainAsyncAction<{}, Array<any>>(DNA_INSTANCE, 'whoami', 'get_user');
