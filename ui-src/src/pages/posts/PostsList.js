import React from 'react';
import { List, Datagrid, TextField } from 'react-admin';

export const PostsList = (props) => (
    <List {...props}>
        <Datagrid>
            <TextField source="id" />
            <TextField source="title" />
            <TextField source="body" />
        </Datagrid>
    </List>
);
