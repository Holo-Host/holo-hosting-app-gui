import configureStoreDev from './configureStore.dev';
import configureStoreProd from './configureStore.prod';

const selectedConfigureStore =
  process.env.NODE_ENV === 'production'
    ? configureStoreProd
    : configureStoreDev;

// export const { history } = selectedConfigureStore;
export const configureStore = selectedConfigureStore;
