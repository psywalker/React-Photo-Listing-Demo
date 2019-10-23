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
import Logo from '../Logo';
import DropdownLogin from '../DropdownLogin';
import {
  URL_FOR_LOGIN,
  URL_FOR_LOGO,
  URL_FOR_AVA_EMPTY_LOGIN,
  URL_FOR_LOGIN_ICON,
  URL_FOR_LOGOUT_ICON,
} from '../../constants';
import { logoutAction } from '../../actions';
import './index.scss';

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
    <div className="header">
      <Logo />

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

      <DropdownLogin
        profileName={profileName}
        profilePhotoUrl={profilePhotoUrl}
        handleLoguotHeader={handleLoguotHeader}
      />
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
