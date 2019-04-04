import React from 'react';
import PropTypes from 'prop-types';
import { Show, Tab, TabbedShowLayout, TextField } from 'react-admin'; // eslint-disable-line import/no-unresolved

import UsersTitle from './UsersTitle';
import Aside from './Aside';

const UsersShow = ({ permissions, ...props }) => (
    <Show title={<UsersTitle />} aside={<Aside />} {...props}>
        <TabbedShowLayout>
            <Tab label="user.form.summary">
                <TextField source="id" />
                <TextField source="name" />
            </Tab>
            {permissions === 'admin' && (
                <Tab label="user.form.security" path="security">
                    <TextField source="role" />
                </Tab>
            )}
        </TabbedShowLayout>
    </Show>
);

UsersShow.propTypes = {
    location: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
    permissions: PropTypes.string,
};

export default UsersShow;
