import React from 'react';
import Avatar from '@material-ui/core/Avatar';

const AvatarField = ({ agent, size }) => (
    <Avatar
        src={`${agent.avatar}?size=${size}x${size}`}
        size={size}
        style={{ width: size, height: size }}
    />
);

AvatarField.defaultProps = {
    size: 25,
};

export default AvatarField;
