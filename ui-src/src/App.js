// app main imports:
import React, { Component } from 'react';
import { Admin, Resource } from 'react-admin';

// app utils imports:
import customRoutes from './utils/routes';
import authProvider from './utils/authProvider';
import sagas from './utils/injectSagas/review_sagas';
import englishMessages from './utils/i18n/en';

// page reducers
import themeReducer from './utils/injectReducers/themeReducer';
import whoamiReducer from './utils/injectReducers/categoriesReducer';

import restProvider from 'ra-data-simple-rest';
// import dataProviderFactory from './dataProvider';
// import fakeServerFactory from './fakeServer';

// app custom layout & style imports:
import { Login, Layout, Menu } from './layout';
import './App.css';

// app page imports:
import products from './pages/products';
import categories from './pages/categories';
import reviews from './pages/reviews';
import { Dashboard } from './pages/dashboard';
import visitors from './pages/visitors';

const i18nProvider = locale => {
    if (locale === 'fr') {
        return import('./utils/i18n/fr').then(messages => messages.default);
    }
    // Always fallback on english
    return englishMessages;
};

class App extends Component {
    state = { dataProvider: null };

    async componentWillMount() {
        // this.restoreFetch = await fakeServerFactory(
        //     process.env.REACT_APP_DATA_PROVIDER
        // );
        //
        // const dataProvider = await dataProviderFactory(
        //     process.env.REACT_APP_DATA_PROVIDER
        // );

        const dataProvider = restProvider('http://localhost:3000');

        this.setState({ dataProvider });
    }

    componentWillUnmount() {
        this.restoreFetch();
    }

    render() {
        const { dataProvider } = this.state;

        if (!dataProvider) {
            return (
                <div className="loader-container">
                    <div className="loader">Loading...</div>
                </div>
            );
        }

        return (
            <Admin
                title=""
                dataProvider={dataProvider}
                customReducers={{
                  theme: themeReducer,
                  whoami: whoamiReducer
                }}
                customSagas={sagas}
                customRoutes={customRoutes}
                authProvider={authProvider}
                loginPage={Login}
                appLayout={Layout}
                menu={Menu}
                locale="en"
                i18nProvider={i18nProvider}
            >
                <Resource name="products" {...products} />
                <Resource name="categories" {...categories} />
                <Resource name="users" {...visitors} />
            </Admin>
        );
    }
}

export default App;
// <Resource name="reviews" {...reviews} />
