import React, { memo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link, Route, Switch } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation();
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const onVisibleChange = (value) => {
    setDropdownVisible(value);
  };
  const handleScroll = () => {
    setDropdownVisible(false);
  };
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  const renderButton = (className, href, onclick, datatest, text) => (
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
          <Menu onClick={handleScroll}>
            <Menu.Item key="0">
              { renderButton('btn-logout', null, handleLoguotHeader, 'btnLogout', t('logout')) }
            </Menu.Item>
          </Menu>
        )}
      />
      <Route
        component={() => (
          <Menu onClick={handleScroll}>
            <Menu.Item key="1">
              <Link
                data-test="linkProfileName"
                to="/profile"
              >
                { t('profile') }
              </Link>
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item key="2">
              { renderButton('btn-logout', null, handleLoguotHeader, 'btnLogout', t('logout')) }
            </Menu.Item>
          </Menu>
        )}
      />
      )
    </Switch>
  );
  const menuWithoutProfile = (
    <Menu onClick={handleScroll}>
      <Menu.Item key="3">
        { renderButton('btn-login', URL_FOR_LOGIN, null, 'btnLogin', t('login')) }
      </Menu.Item>
    </Menu>
  );

  const menu = profileName ? menuWithProfile : menuWithoutProfile;
  return (
    <div
      data-test="Dropdown"
      className="dropdown"
    >
      <Dropdown
        overlay={menu}
        trigger={['click']}
        visible={dropdownVisible}
        onVisibleChange={onVisibleChange}
      >
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
