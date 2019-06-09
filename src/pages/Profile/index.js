import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { loadingRequestAction, logoutAction } from '../../actions';
import { Spinner } from '../../components';
import './index.scss';

class Profile extends PureComponent {
  componentDidMount = () => {
    const { login } = this.props;
    if (!login.profilePhotoUrl) {
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
    const { login, login: { fetching, loginError } } = this.props;
    return (
      <div className="profile">
        { fetching && (<Spinner className="spinner" />)}
        { !fetching && !loginError && (
          <div className="profile__content profile-content">
            <img className="profile-content__avatar" src={login.profilePhotoUrl} alt="Profile avatar" />
            <div className="profile-content__title-wrap">
              <h2 className="profile-content__title">
                {login.profileFullName}
              </h2>
              <p>{login.profileEmail}</p>
              <p className="profile-content__text">
                Download free, beautiful high-quality photos curated by
                {' '}
                {
                  login.profileName
                }
              </p>
            </div>
          </div>
        )}
        { !fetching && loginError && (
          <p>
            При авторизации возникла ошибка. Попробуйте авторизоваться позже!
            {' '}
            <Link to="/">
              Перейти на главную.
            </Link>
          </p>
        )}
      </div>
    );
  }
}

Profile.propTypes = {
  logoutAction: PropTypes.func,
  loadingRequestAction: PropTypes.func,
  login: PropTypes.shape({
    profilePhotoUrl: PropTypes.string,
    profileFullName: PropTypes.string,
    profileName: PropTypes.string,
    profileEmail: PropTypes.string,
    fetching: PropTypes.bool,
    loginError: PropTypes.bool,
  }),
  history: PropTypes.shape({
    profilePhotoUrl: PropTypes.string,
  }),
};
Profile.defaultProps = {
  logoutAction: () => {},
  loadingRequestAction: () => {},
  login: {
    profilePhotoUrl: '',
    profileFullName: '',
    profileName: '',
    profileEmail: '',
    fetching: false,
    loginError: false,
  },
  history: {},
};

const mapStateToProps = (state) => {
  const { login } = state;
  return { login };
};

const mapDispatchToProps = ({
  loadingRequestAction,
  logoutAction,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Profile);
