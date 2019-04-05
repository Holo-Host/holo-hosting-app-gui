// GLOBAL NAMING CONSTANTS
export const APP_TITLE = "Holo Hosting";

// saga constants
export const RESTART_ON_REMOUNT = '@@saga-injector/restart-on-remount';
export const DAEMON = '@@saga-injector/daemon';
export const ONCE_TILL_UNMOUNT = '@@saga-injector/once-till-unmount';

// NODE environment constants
export const setInstance = () => {
  if (process.env.REACT_APP_DNA_INSTANCE)
    return process.env.REACT_APP_DNA_INSTANCE;
  return 'ERROR: MOCK INSTANCE';
};

export const setPort = () => {
  if (process.env.REACT_APP_NODE_PORT) return process.env.REACT_APP_NODE_PORT;
  return 'ERROR: REACT_APP_NODE_PORT not found at '+ process.env.REACT_APP_NODE_PORT;
};

/** ************************** HC ACTION Constants: ******************************** */
// DNA_INSTANCE is now a env.process variable set within the package.json scripts:
export const DNA_INSTANCE = setInstance();
export const WHOAMI_ZOME_NAME = 'whoami';
export const PROVIDER_ZOME_NAME = 'provider';
export const HOST_ZOME_NAME = 'host';

// SET CALLSTRINGS
// export const REGISTER_PROVIDER = DNA_INSTANCE+'/provider/register_as_provider'
// export const REGISTER_HOST = DNA_INSTANCE+'/host/register_as_host'


/** ************************** Happs Reducer Constants: ******************************** */
export const refactorAllApps = ( payload ) => {
  console.log("allApps payload : ", payload)
  let all_apps=[];
  payload.forEach(app=>{
    all_apps.push({
      hash: app.hash,
      details: JSON.parse(app.details).Ok
    });
  })
  return all_apps;
}
