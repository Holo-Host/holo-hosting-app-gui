import React from 'react';
import { ReferenceField } from 'react-admin';
// local component imports:
import FullNameField from './FullNameField';

const CustomerReferenceField = props => (
    <ReferenceField source="customer_id" reference="users" {...props}>
        <FullNameField />
    </ReferenceField>
);

CustomerReferenceField.defaultProps = {
    source: 'customer_id',
    addLabel: true,
};

export default CustomerReferenceField;
