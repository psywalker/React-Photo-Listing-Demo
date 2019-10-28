import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loadingRequestAction, logoutAction } from '../../actions';
import { Spinner, Error } from '../../components';
import setScrollX from '../../utils/setScrollX';
import './index.scss';

export class Profile extends PureComponent {
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
    window.localStorage.removeItem('token');
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
    setScrollX(0);
    return (
      <div
        data-test="profile"
        className="profile"
      >
        { fetching && (
          <Spinner
            data-test="spinner"
            className="spinner"
          />
        )}
        { !fetching && !loginError && (
          <div
            data-test="profileContent"
            className="profile__content profile-content"
          >
            <img
              data-test="profileContentAvatar"
              className="profile-content__avatar"
              src={profilePhotoUrl}
              alt="Profile avatar"
            />
            <div
              data-test="profileContentTitleWrap"
              className="profile-content__title-wrap"
            >
              <h2
                data-test="profileContentTitle"
                className="profile-content__title"
              >
                {profileFullName}
              </h2>
              <p data-test="profileContentEmail">{profileEmail}</p>
              <p
                data-test="profileContentText"
                className="profile-content__text"
              >
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
          <Error
            data-test="error"
            text="An authorization failed. Try logging in later!"
          />
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

export const mapStateToProps = (state) => {
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
