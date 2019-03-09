/* HomeConstants */

/** *************************** HC Constants: ************************************ */
import { setInstance } from '../../utils/constants'
export const DNA_INSTANCE = setInstance();
// export const DNA_INSTANCE = 'holo-hosting-app_instance';

export const WHOAMI_ZOME_NAME ='whoami';
export const HOST_ZOME_NAME = 'host';

/** *************************** NON-HC ACTIONS: ************************************ */
/* Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

export const CHANGE_USERNAME = 'holo-hosting-app/HostHomePage/CHANGE_USERNAME';
