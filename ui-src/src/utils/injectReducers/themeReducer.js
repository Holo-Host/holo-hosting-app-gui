import { CHANGE_THEME } from '../../pages/configuration/configuration_actions';

export default (previousState = 'light', { type, payload }) => {
    if (type === CHANGE_THEME) {
        return payload;
    }
    return previousState;
};
