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
import { URL_FOR_LOGIN } from '../../constants';
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
        className="user-layout__header"
      >
        <div
          data-test="page"
          className="page"
        >
          <Row type="flex" justify="space-between">
            <Col span={9} style={{ whiteSpace: 'nowrap' }}>
              <Link
                data-test="siteLogoLinkRouter"
                to="/"
                style={{ display: 'inline-block' }}
              >
                <h1
                  data-test="siteLogoTitle"
                  className="site-logo"
                >
                  PHOTOLISTING
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

              {!profileName && (
                <Button
                  data-test="btnLogin"
                  style={{ marginLeft: '10px' }}
                  href={URL_FOR_LOGIN}
                >
                  Login
                </Button>
              )}
              {profileName && (
                <span>
                  <Button
                    data-test="btnLogout"
                    className="btn-logout"
                    style={{ marginLeft: '10px' }}
                    onClick={handleLoguotHeader}
                  >
                    Logout
                  </Button>
                </span>
              )}
            </Col>

            <Col
              span={3}
              style={{ display: 'flex', justifyContent: 'flex-end' }}
            >
              {profileName && (
                <Link
                  data-test="linkProfileName"
                  to="/profile"
                >
                  <Icon
                    component={() => (
                      <img
                        data-test="userAvatarImg"
                        className="user-avatar"
                        alt=""
                        src={`${profilePhotoUrl}`}
                      />
                    )}
                  />
                </Link>
              )}
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

const mapStateToProps = (state) => {
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
