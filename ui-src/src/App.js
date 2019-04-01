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
import {  is_registered_provider, is_registered_host } from "./utils/injectReducers/dashboardReducer";
import { whoami } from "./utils/injectReducers/categoriesReducer";
import {  registered_hApp_bundles, current_hApp_bundle_details, all_hApp_bundles } from "./utils/injectReducers/happsReducer";

// import restProvider from 'ra-data-simple-rest';
import dataProviderFactory from './utils/dataProvider';
import fakeServerFactory from './utils/fakeRest';

// app custom layout & style imports:
import { Layout, Menu } from './layout';
import Login from './pages/login/Login';
import './App.css';

// app page imports:
import happs from './pages/happs';
import categories from './pages/categories';
import reviews from './pages/reviews';
import { Dashboard } from './pages/dashboard';
import users from './pages/users';

import { PostsCreate, PostsEdit, PostsShow } from './pages/posts';
// import posts from './pages/posts';


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
        this.restoreFetch = await fakeServerFactory('rest');

        const dataProvider = await dataProviderFactory('rest');
        // const dataProvider = restProvider('http://localhost:8800');
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
                title={this.props.data || ''}
                dataProvider={dataProvider}
                customReducers={{
                  theme: themeReducer,
                  whoami,
                  is_registered_provider,
                  is_registered_host,
                  registered_hApp_bundles,
                  current_hApp_bundle_details,
                  all_hApp_bundles
                }}
                customSagas={sagas}
                customRoutes={customRoutes}
                authProvider={authProvider}
                dashboard={Dashboard}
                loginPage={Login}
                appLayout={Layout}
                menu={Menu}
                locale="en"
                i18nProvider={i18nProvider}
            >
                <Resource name="happs" {...happs} />
                <Resource name="categories" {...categories} />
                <Resource name="users" {...users} />
                <Resource name="reviews" {...reviews} />
                <Resource name="posts" show={PostsShow} create={PostsCreate} edit={PostsEdit} />
            </Admin>
        );
    }
}

export default App;
