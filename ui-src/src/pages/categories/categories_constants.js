/** *************************** HC Constants: ************************************ */
import { setInstance } from '../../utils/constants';
// DNA_INSTANCE is now a env.process variable set within the package.json scripts:
export const DNA_INSTANCE = setInstance();

export const WHOAMI_ZOME_NAME = 'whoami';
export const HOST_ZOME_NAME = 'host';
