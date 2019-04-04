import React from 'react';
import { translate } from 'react-admin';

const UsersTitle = translate(({ record, translate }) => (
    <span>
        {record ? translate('user.edit.title', { title: record.name }) : ''}
    </span>
));

export default UsersTitle;
