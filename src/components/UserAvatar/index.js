import React, { memo } from 'react';
import PropTypes from 'prop-types';
import './index.scss';

const UserAvatar = memo(({ profilePhotoUrl }) => (
  <img
    data-test="UserAvatar"
    className="user-avatar"
    alt=""
    src={`${profilePhotoUrl}`}
  />
));

UserAvatar.propTypes = {
  profilePhotoUrl: PropTypes.string,
};

UserAvatar.defaultProps = {
  profilePhotoUrl: '',
};

export default UserAvatar;
