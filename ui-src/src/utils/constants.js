// title constants
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

export const DNA_INSTANCE = setInstance();


export const REGISTER_PROVIDER = DNA_INSTANCE+'/provider/register_as_provider'
export const REGISTER_HOST = DNA_INSTANCE+'/host/register_as_host'
