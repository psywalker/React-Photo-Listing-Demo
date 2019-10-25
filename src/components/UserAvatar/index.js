import React, { memo } from 'react';
import PropTypes from 'prop-types';
import './index.scss';

const UserAvatar = memo(({ profilePhotoUrl, profileFullName }) => (
  <div className="user-avatar">
    <div className="user-avatar__name">{ profileFullName }</div>
    <img
      data-test="UserAvatar"
      className="user-avatar__img"
      alt=""
      src={`${profilePhotoUrl}`}
    />
  </div>
));

UserAvatar.propTypes = {
  profilePhotoUrl: PropTypes.string,
  profileFullName: PropTypes.string,
};

UserAvatar.defaultProps = {
  profilePhotoUrl: '',
  profileFullName: '',
};

export default UserAvatar;
