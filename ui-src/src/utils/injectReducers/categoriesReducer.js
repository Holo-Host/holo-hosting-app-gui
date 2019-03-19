export const whoami = (previousState = null, { type, payload }) => {
    if (type === "FETCH_AGENT_SUCCESS") {
        return payload;
    }
    return previousState;
}

export const is_registered_provider = (previousState = null, { type, payload }) => {
    if (type === "REGISTER_PROVIDER_SUCCESS") {
        return payload;
    }
    return previousState;
}

export const is_registered_host = (previousState = null, { type, payload }) => {
    if (type === "REGISTER_PROVIDER_SUCCESS") {
        return payload;
    }
    return previousState;
}
