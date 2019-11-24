import React, { memo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Link,
  Route,
  Switch,
  withRouter,
} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import {
  Menu,
  Dropdown,
  Avatar,
  Button,
} from 'antd';
import UserAvatar from '../UserAvatar';
import { URL_FOR_LOGIN } from '../../constants';
import handleVisibleByScroll from '../../utils/handleVisibleByScroll';
import { logoutAction } from '../../actions';
import './index.scss';

const DropdownLogin = memo(({ history }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const profileName = useSelector(state => state.login.profileName);
  const profilePhotoUrl = useSelector(state => state.login.profilePhotoUrl);
  const profileFullName = useSelector(state => state.login.profileFullName);

  const onVisibleChange = (value) => {
    setDropdownVisible(value);
  };
  const handleScroll = () => {
    setDropdownVisible(false);
  };

  const handleLoguotHeader = () => {
    dispatch(logoutAction());
    window.localStorage.removeItem('token');
    window.localStorage.removeItem('loginData');
    history.push('/');
  };

  useEffect(() => {
    handleVisibleByScroll('addEventListener', ['scroll'], [handleScroll]);
    return () => {
      handleVisibleByScroll('removeEventListener', ['scroll'], [handleScroll]);
    };
  });

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
  history: PropTypes.shape({}),
};

DropdownLogin.defaultProps = {
  history: {},
};

export default withRouter(DropdownLogin);
