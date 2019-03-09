export const RESTART_ON_REMOUNT = '@@saga-injector/restart-on-remount';
export const DAEMON = '@@saga-injector/daemon';
export const ONCE_TILL_UNMOUNT = '@@saga-injector/once-till-unmount';


export let setInstance = ()=>{
  if(process.env.REACT_APP_DNA_INSTANCE)
    return process.env.REACT_APP_DNA_INSTANCE
  else
    return "ERROR: MOCK INSTANCE"
};

export let setPort = ()=>{
  if(process.env.PORT)
    return process.env.PORT
  else
    return "ERROR: PORT not found"
};
