import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Route, Link, withRouter } from 'react-router-dom';
import {
  Layout,
  Icon,
  Button,
  Row,
  Col,
} from 'antd';
import { withLastLocation } from 'react-router-last-location';
import { connect } from 'react-redux';
import { ButtonBack } from '../index';
import {
  URL_FOR_LOGIN,
  URL_FOR_LOGO,
  URL_FOR_AVA_EMPTY_LOGIN,
  URL_FOR_LOGIN_ICON,
  URL_FOR_LOGOUT_ICON,
} from '../../constants';
import { logoutAction } from '../../actions';
import './index.scss';

const { Header } = Layout;

export const HeaderApp = withRouter(memo((props) => {
  const {
    history,
    profileName,
    profilePhotoUrl,
    logoutAction: handleAction,
  } = props;
  const handleLoguotHeader = () => {
    handleAction();
    window.localStorage.clear();
    history.push('/');
  };

  return (
    <div
      data-test="headerApp"
      className="header-app"
    >
      <Header
        data-test="userLayoutHeader"
        className="user-layout__header user-layout-header"
      >
        <div
          data-test="page"
          className="page"
        >
          <Row type="flex" justify="space-between">
            <Col span={2} style={{ whiteSpace: 'nowrap' }}>
              <Link
                data-test="siteLogoLinkRouter"
                to={{ pathname: '/', state: { flag: true } }}
                style={{ display: 'inline-block' }}
              >
                <h1
                  data-test="siteLogoTitle"
                  className="site-logo"
                >
                  <img
                    className="site-logo__img"
                    src={URL_FOR_LOGO}
                    alt="logo"
                  />
                </h1>
              </Link>
              <Route
                data-test="btnBackRoute"
                path="/:id"
                component={() => (
                  <ButtonBack
                    data-test="btnBack"
                    style={{ marginLeft: '10px' }}
                  />
                )}
              />

            </Col>

            <Col
              span={10}
              style={{ display: 'flex', justifyContent: 'flex-end' }}
            >
              <div className="user-layout-header__login">

                {!profileName && (
                  <div>
                    <Button
                      data-test="btnLogin"
                      className="btn-login"
                      href={URL_FOR_LOGIN}
                    >
                      Login
                    </Button>
                    <a
                      className="login-icon-link"
                      href={URL_FOR_LOGIN}
                    >
                      <img
                        data-test="login-icon"
                        className="login-icon"
                        alt="Login"
                        src={`${URL_FOR_LOGIN_ICON}`}
                      />
                    </a>
                    <img
                      data-test="userAvatarEmpty"
                      className="user-avatar-empty"
                      alt=""
                      src={`${URL_FOR_AVA_EMPTY_LOGIN}`}
                    />

                  </div>
                )}
                {profileName && (
                  <span>
                    <Button
                      data-test="btnLogout"
                      className="btn-logout"
                      onClick={handleLoguotHeader}
                    >
                      Logout
                    </Button>

                    <Icon
                      onClick={handleLoguotHeader}
                      component={() => (
                        <img
                          data-test="logout-icon"
                          className="logout-icon"
                          alt="Logout"
                          src={`${URL_FOR_LOGOUT_ICON}`}
                        />
                      )}
                    />
                    <Link
                      data-test="linkProfileName"
                      to="/profile"
                    >

                      <img
                        data-test="userAvatarImg"
                        className="user-avatar"
                        alt=""
                        src={`${profilePhotoUrl}`}
                      />

                    </Link>
                  </span>
                )}
              </div>
            </Col>
          </Row>
        </div>
      </Header>
    </div>
  );
}));

HeaderApp.propTypes = {
  history: PropTypes.shape({
    prop: PropTypes.string,
  }),
  logoutAction: PropTypes.func,
  profilePhotoUrl: PropTypes.string,
  profileName: PropTypes.string,
  profileEmail: PropTypes.string,
  fetching: PropTypes.bool,
};
HeaderApp.defaultProps = {
  history: {},
  logoutAction: () => {},
  profilePhotoUrl: '',
  profileName: '',
  profileEmail: '',
  fetching: false,
};

export const mapStateToProps = (state) => {
  const { login } = state;
  return login;
};

const mapDispatchToProps = {
  logoutAction,
};

export default withLastLocation(connect(
  mapStateToProps,
  mapDispatchToProps,
)(HeaderApp));
