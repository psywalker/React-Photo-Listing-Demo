import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Link, Route, Switch } from 'react-router-dom';
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
}) => {
  const generationButton = (className, href, onclick, datatest, text) => (
    <div>
      <Button
        data-test={datatest}
        className={className}
        href={href}
        onClick={onclick}
      >
        {text}
      </Button>
    </div>
  );

  const menuWithProfile = (
    <Switch>
      <Route
        exact
        path="/profile"
        component={() => (
          <Menu>
            <Menu.Item key="0">
              { generationButton('btn-logout', null, handleLoguotHeader, 'btnLogout', 'Logout') }
            </Menu.Item>
          </Menu>
        )}
      />
      <Route
        path="*"
        component={() => (
          <Menu>
            <Menu.Item key="1">
              <Link
                data-test="linkProfileName"
                to="/profile"
              >
                Profile
              </Link>
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item key="2">
              { generationButton('btn-logout', null, handleLoguotHeader, 'btnLogout', 'Logout') }
            </Menu.Item>
          </Menu>
        )}
      />
      )
    </Switch>
  );
  const menuWithoutProfile = (
    <Menu>
      <Menu.Item key="3">
        { generationButton('btn-login', URL_FOR_LOGIN, null, 'btnLogin', 'Login') }
      </Menu.Item>
    </Menu>
  );

  const menu = profileName ? menuWithProfile : menuWithoutProfile;
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
};

DropdownLogin.defaultProps = {
  profilePhotoUrl: '',
  profileName: '',
  profileFullName: '',
  handleLoguotHeader: () => {},
};

export default DropdownLogin;
