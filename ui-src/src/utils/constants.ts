export const TABLE_DATA_BATCH_LIMIT : number = 50;

export let setInstance = ()=>{
  if(process.env.REACT_APP_DNA_INSTANCE)
    return process.env.REACT_APP_DNA_INSTANCE
  else
    return "ERROR: FAKE INSTANCE"
};

export const setPort = () => {
  // return 3000
  console.log("PORT: ",process.env);
  if (process.env.REACT_APP_NODE_PORT) return process.env.REACT_APP_NODE_PORT;
  return 'ERROR: REACT_APP_NODE_PORT not found at '+ process.env.REACT_APP_NODE_PORT;
};
