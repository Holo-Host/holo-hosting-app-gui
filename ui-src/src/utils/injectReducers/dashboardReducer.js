const previousProviderRegState = {
  confirmed: false,
  provider_address: null
}
export const is_registered_as_provider = (previousState = null, { type, payload }) => {
    if (type === "IS_REGISTERED_AS_PROVIDER_SUCCESS") {
      return payload;
    }
    return previousState;
}


const previousHostRegState = {
  confirmed: false,
  host_address: null
}
export const is_registered_as_host = (previousState = null, { type, payload }) => {
  // console.log("_________________________________________---",payload);
    if (type === "IS_REGISTERED_AS_HOST_SUCCESS") {
      return payload;
    }
    return previousState;
}
