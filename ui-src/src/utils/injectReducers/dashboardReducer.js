const previousProviderRegState = {
  confirmed: false,
  provider_address: null
}
export const registered_as_provider = (previousState = previousProviderRegState, { type, payload }) => {
    if (type === "IS_REGISTERED_AS_PROVIDER_SUCCESS") {
      const provider_info = {
        confirmed: true,
        provider_address: payload
      }
      return provider_info;
    }
    return previousState;
}


const previousHostRegState = {
  confirmed: false,
  host_address: null
}
export const registered_as_host = (previousState = previousHostRegState, { type, payload }) => {
    if (type === "IS_REGISTERED_AS_HOST_SUCCESS") {
      const host_info = {
        confirmed: true,
        host_address: payload
      }
      return host_info;
    }
    return previousState;
}
