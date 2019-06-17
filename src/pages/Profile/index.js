import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loadingRequestAction, logoutAction } from '../../actions';
import { Spinner, Error } from '../../components';
import './index.scss';

class Profile extends PureComponent {
  componentDidMount = () => {
    const { profilePhotoUrl } = this.props;
    if (!profilePhotoUrl) {
      const { loadingRequestAction: handleAction } = this.props;
      handleAction(window.document.location);
    }
  }

  handleLoguotProfile = () => {
    const { history, logoutAction: handleAction } = this.props;
    handleAction();
    window.localStorage.clear();
    history.push('/');
  };

  render() {
    const {
      fetching,
      loginError,
      profilePhotoUrl,
      profileFullName,
      profileEmail,
      profileName,
    } = this.props;
    return (
      <div className="profile">
        { fetching && (<Spinner className="spinner" />)}
        { !fetching && !loginError && (
          <div className="profile__content profile-content">
            <img
              className="profile-content__avatar"
              src={profilePhotoUrl}
              alt="Profile avatar"
            />
            <div className="profile-content__title-wrap">
              <h2 className="profile-content__title">
                {profileFullName}
              </h2>
              <p>{profileEmail}</p>
              <p className="profile-content__text">
                Download free, beautiful high-quality photos curated by
                {' '}
                {
                  profileName
                }
              </p>
            </div>
          </div>
        )}
        { !fetching && loginError && (
          <Error text="An authorization failed. Try logging in later!" />
        )}
      </div>
    );
  }
}

Profile.propTypes = {
  logoutAction: PropTypes.func,
  loadingRequestAction: PropTypes.func,
  profilePhotoUrl: PropTypes.string,
  profileFullName: PropTypes.string,
  profileName: PropTypes.string,
  profileEmail: PropTypes.string,
  fetching: PropTypes.bool,
  loginError: PropTypes.bool,
  history: PropTypes.shape({
    profilePhotoUrl: PropTypes.string,
  }),
};
Profile.defaultProps = {
  logoutAction: () => {},
  loadingRequestAction: () => {},
  profilePhotoUrl: '',
  profileFullName: '',
  profileName: '',
  profileEmail: '',
  fetching: false,
  loginError: false,
  history: {},
};

const mapStateToProps = (state) => {
  const { login } = state;
  return login;
};

const mapDispatchToProps = ({
  loadingRequestAction,
  logoutAction,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Profile);
