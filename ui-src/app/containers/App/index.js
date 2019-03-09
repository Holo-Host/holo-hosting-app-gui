/* App Router-Container Page :  This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { Switch, Redirect, Route } from 'react-router-dom';

import HostHomePage from 'containers/HostHomePage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import Header from 'components/Header';
import Footer from 'components/Footer';

import GlobalStyle from '../../global-styles';

const AppWrapper = styled.div`
  max-width: calc(768px + 16px * 2);
  margin: 0 auto;
  display: flex;
  min-height: 100%;
  padding: 0 16px;
  flex-direction: column;s
`;

export default function App() {
  return (
    <AppWrapper>
      <Helmet
        titleTemplate="%s - Holo Hosting App"
        defaultTitle="Holo Hosting Application"
      >
        <meta
          name="description"
          content="Holo Hosting: A more human internet."
        />
      </Helmet>
      <Header />
      <Switch>
        <Redirect exact path="/" to="/holohost" />
        <Route path="/holohost" component={HostHomePage} />
        <Route path="" component={NotFoundPage} />
      </Switch>
      <Footer />
      <GlobalStyle />
    </AppWrapper>
  );
}
