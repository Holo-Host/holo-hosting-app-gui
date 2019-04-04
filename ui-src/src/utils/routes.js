// main app imports:
import React from 'react';
import { Route } from 'react-router-dom';

// app page imports:
import Configuration from '../pages/configuration/Configuration';
import Register from '../pages/register/Register';

export default [
    <Route exact path="/configuration" component={Configuration} />,
    <Route exact path="/register" component={Register} />,
];
