import React from 'react';
import { ReferenceField, TextField } from 'react-admin';

const HAppsReferenceField = props => (
    <ReferenceField
        label="happs"
        source="happ_id"
        reference="happs"
        {...props}
    >
        <TextField source="reference" />
    </ReferenceField>
);

HAppsReferenceField.defaultProps = {
    source: 'happ_id',
    addLabel: true,
};

export default HAppsReferenceField;
