import React from 'react';
import pure from 'recompose/pure';
// local component imports:
import AvatarField from './AvatarField';

const FullNameField = ({ record = {}, size }) => (
    <div style={{ display: 'flex', flexWrap: 'nowrap', alignItems: 'center' }}>
        <AvatarField record={record} size={size} />
        &nbsp;{record.first_name} {record.last_name}
    </div>
);

const PureFullNameField = pure(FullNameField);

PureFullNameField.defaultProps = {
    source: 'last_name',
    label: 'resources.users.fields.name',
};

export default PureFullNameField;
