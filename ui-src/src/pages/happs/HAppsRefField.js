import React from 'react';
import { Link } from 'react-router-dom';

const HAppsRefField = ({ record }) => (
    <Link to={`happs/${record.id}`}>{record.reference}</Link>
);

HAppsRefField.defaultProps = {
    source: 'id',
    label: 'Reference',
};

export default HAppsRefField;
