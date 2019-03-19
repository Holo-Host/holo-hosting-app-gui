import { FETCH_AGENT } from '../../pages/categories/categories_actions';

export default (previousState = null, { type, payload }) => {
    if (type === FETCH_AGENT) {
        return payload;
    }
    return previousState;
}
