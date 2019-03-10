export const RESTART_ON_REMOUNT = '@@saga-injector/restart-on-remount';
export const DAEMON = '@@saga-injector/daemon';
export const ONCE_TILL_UNMOUNT = '@@saga-injector/once-till-unmount';

export const setInstance = () => {
  if (process.env.REACT_APP_DNA_INSTANCE)
    return process.env.REACT_APP_DNA_INSTANCE;
  return 'ERROR: MOCK INSTANCE';
};

export const setPort = () => {
  // return 3000
  if (process.env.NODE_PORT) return process.env.NODE_PORT;
  return 'ERROR: NODE_PORT not found at '+ process.env.NODE_PORT;
};
