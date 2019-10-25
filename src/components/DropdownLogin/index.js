import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
  Menu,
  Dropdown,
  Avatar,
  Button,
} from 'antd';
import UserAvatar from '../UserAvatar';
import { URL_FOR_LOGIN } from '../../constants';
import './index.scss';

const DropdownLogin = memo(({
  profileName,
  profilePhotoUrl,
  handleLoguotHeader,
  profileFullName,
  isNotProfile,
}) => {
  const menu = (
    <Menu>
      { profileName && isNotProfile && (
        <Menu.Item key="0">
          <Link
            data-test="linkProfileName"
            to="/profile"
          >
            Profile
          </Link>
        </Menu.Item>
      )}
      { profileName && <Menu.Divider /> }
      <Menu.Item key="3">
        <div>
          { !profileName && (
            <Button
              data-test="btnLogin"
              className="btn-login"
              href={URL_FOR_LOGIN}
            >
              Login
            </Button>
          )}
          { profileName && (
            <Button
              data-test="btnLogout"
              className="btn-logout"
              onClick={handleLoguotHeader}
            >
              Logout
            </Button>
          )}
        </div>
      </Menu.Item>
    </Menu>
  );
  return (
    <div
      data-test="Dropdown"
      className="dropdown"
    >
      <Dropdown overlay={menu} trigger={['click']}>
        <div className="dropdown__inner">
          { !profileName && <Avatar icon="user" /> }
          { profileName && (
            <UserAvatar
              profilePhotoUrl={profilePhotoUrl}
              profileFullName={profileFullName}
            />
          )}
        </div>
      </Dropdown>
    </div>
  );
});

DropdownLogin.propTypes = {
  profilePhotoUrl: PropTypes.string,
  profileName: PropTypes.string,
  profileFullName: PropTypes.string,
  handleLoguotHeader: PropTypes.func,
  isNotProfile: PropTypes.bool,
};

DropdownLogin.defaultProps = {
  profilePhotoUrl: '',
  profileName: '',
  profileFullName: '',
  handleLoguotHeader: () => {},
  isNotProfile: false,
};

export default DropdownLogin;
