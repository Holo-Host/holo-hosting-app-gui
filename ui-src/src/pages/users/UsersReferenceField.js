import React from 'react';
import { ReferenceField } from 'react-admin';
import FullNameField from '../../app-components/FullNameField';

const UserReferenceField = props => (
    <ReferenceField source="user_id" reference="users" {...props}>
        <FullNameField />
    </ReferenceField>
);

UserReferenceField.defaultProps = {
    source: 'user_id',
    addLabel: true,
};

export default UserReferenceField;
