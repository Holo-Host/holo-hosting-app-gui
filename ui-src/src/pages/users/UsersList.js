import React from 'react';

import memoize from 'lodash/memoize';
import UsersEditEmbedded from './UsersEditEmbedded';
import PeopleIcon from '@material-ui/icons/People';

import Aside from './Aside';
import {
    BulkDeleteWithConfirmButton,
    Datagrid,
    Filter,
    List,
    Responsive,
    SearchInput,
    SimpleList,
    TextField,
    TextInput,
} from 'react-admin';
export const UserIcon = PeopleIcon;


const UsersFilter = ({ permissions, ...props }) => (
    <Filter {...props}>
        <SearchInput source="q" alwaysOn />
        <TextInput source="name" />
        {permissions === 'admin' ? <TextInput source="role" /> : null}
    </Filter>
);

const UsersBulkActionButtons = props => (
    <BulkDeleteWithConfirmButton {...props} />
);

const rowClick = memoize(permissions => (id, basePath, record) => {
    return permissions === 'admin'
        ? Promise.resolve('edit')
        : Promise.resolve('show');
});

const UsersList = ({ permissions, ...props }) => (
    <List
        {...props}
        filters={<UsersFilter permissions={permissions} />}
        filterDefaultValues={{ role: 'user' }}
        sort={{ field: 'name', order: 'ASC' }}
        aside={<Aside />}
        bulkActionButtons={<UsersBulkActionButtons />}
    >
        <Responsive
            small={
                <SimpleList
                    primaryText={record => record.name}
                    secondaryText={record =>
                        permissions === 'admin' ? record.role : null
                    }
                />
            }
            medium={
                <Datagrid
                    rowClick={rowClick(permissions)}
                    expand={<UsersEditEmbedded />}
                >
                    <TextField source="id" />
                    <TextField source="name" />
                    {permissions === 'admin' && <TextField source="role" />}
                </Datagrid>
            }
        />
    </List>
);

export default UsersList;
