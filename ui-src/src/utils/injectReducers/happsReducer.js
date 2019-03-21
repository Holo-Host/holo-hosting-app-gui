/***************************************************** HAPP PROVIDER REDUCERS *****************************************************/
export const registered_hApp_bundles = (previousState = null, { type, payload }) => {
    if (type === "FETCH_HAPP_BUNDLES_SUCCESS") {
        return payload;
    }
    return previousState;
}

export const current_hApp_bundle_details = (previousState = null, { type, payload }) => {
  if (type === "FETCH_HAPP_BUNDLE_DETAILS_SUCCESS") {
    return payload;
  }
  return previousState;
}


/***************************************************** HOST REDUCERS *****************************************************/
export const all_hApp_bundles = (previousState = null, { type, payload }) => {
    if (type === "FETCH_ALL_HAPP_BUNDLES_SUCCESS") {
        return payload;
    }
    return previousState;
}
