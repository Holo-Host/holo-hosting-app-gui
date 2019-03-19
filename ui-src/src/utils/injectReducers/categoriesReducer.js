export default (previousState = null, { type, payload }) => {
    if (type === "FETCH_AGENT_SUCCESS") {
        return payload;
    }
    return previousState;
}
