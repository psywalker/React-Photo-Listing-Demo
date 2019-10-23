import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Route, withRouter } from 'react-router-dom';
import { withLastLocation } from 'react-router-last-location';
import { connect } from 'react-redux';
import { ButtonBack } from '../index';
import Logo from '../Logo';
import DropdownLogin from '../DropdownLogin';

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
      <div className="header__logo">
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
      </div>

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
