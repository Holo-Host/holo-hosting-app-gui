/***************************************************** HAPP PROVIDER REDUCERS *****************************************************/
const previousProviderRegState = {
  confirmed: false,
  provider_address: null
}
export const registered_as_provider = (previousState = previousProviderRegState, { type, payload }) => {
    if (type === "REGISTER_AS_PROVIDER_SUCCESS") {
      const provider_info = {
        confirmed: true,
        provider_address: payload
      }
      return provider_info;
    }
    return previousState;
}

/********************************************************************************/
/********************************************************************************/
export const registered_hApp_bundles = (previousState = null, { type, payload }) => {
    if (type === "FETCH_HAPP_BUNDLES_SUCCESS") {
        return payload;
    }
    return previousState;
}

export const RA_current_hApp_bundle_details = (previousState = null, { type, payload }) => {
  if (type === "RA_FETCH_HAPP_BUNDLES_SUCCESS") {
    return payload;
  }
  return previousState;
}

/********************************************************************************/
/********************************************************************************/

export const current_hApp_bundle_details = (previousState = null, { type, payload }) => {
  if (type === "FETCH_HAPP_BUNDLE_DETAILS_SUCCESS") {
    return payload;
  }
  return previousState;
}


/***************************************************** HOST REDUCERS *****************************************************/
const previousHostRegState = {
  confirmed: false,
  host_address: null
}
export const registered_as_host = (previousState = previousHostRegState, { type, payload }) => {
    if (type === "REGISTER_AS_HOST_SUCCESS") {
      const host_info = {
        confirmed: true,
        host_address: payload
      }
      return host_info;
    }
    return previousState;
}

export const all_hApp_bundles = (previousState = null, { type, payload }) => {
    if (type === "FETCH_ALL_HAPP_BUNDLES_SUCCESS") {
        return payload;
    }
    return previousState;
}
