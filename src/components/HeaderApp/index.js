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

const HeaderApp = withRouter(memo((props) => {
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
    <div className="header-app">
      <Header className="user-layout__header">
        <div className="page">
          <Row type="flex" justify="space-between">
            <Col span={9} style={{ whiteSpace: 'nowrap' }}>
              <Link to="/" style={{ display: 'inline-block' }}>
                <h1 className="site-logo">PHOTOLISTING</h1>
              </Link>
              <Route path="/:id" component={() => <ButtonBack style={{ marginLeft: '10px' }} />} />

              {!profileName && (
                <Button
                  style={{ marginLeft: '10px' }}
                  href={URL_FOR_LOGIN}
                >
                  Login
                </Button>
              )}
              {profileName && (
                <span>
                  <Button
                    className="btn-logout"
                    style={{ marginLeft: '10px' }}
                    onClick={handleLoguotHeader}
                  >
                    Logout
                  </Button>
                </span>
              )}
            </Col>

            <Col span={3} style={{ display: 'flex', justifyContent: 'flex-end' }}>
              {profileName && (
                <Link to="/profile">
                  <Icon
                    component={() => (
                      <img
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
