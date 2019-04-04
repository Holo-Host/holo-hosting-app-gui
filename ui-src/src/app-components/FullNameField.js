import React from 'react';
import AvatarField from './AvatarField';
import pure from 'recompose/pure';

const FullNameField = ({ agent = {}, size }) => (
    <div style={{ display: 'flex', flexWrap: 'nowrap', alignItems: 'center' }}>
        <AvatarField agent={agent} size={size} />
        &nbsp;{agent.first_name} {agent.last_name}
    </div>
);

const PureFullNameField = pure(FullNameField);

PureFullNameField.defaultProps = {
    source: 'last_name',
    label: 'resources.customers.fields.name',
};

export default PureFullNameField;
