import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loadingRequestAction, logoutAction } from '../../actions';
import Spinner from '../../components/Spinner';
import './index.css';

class Profile extends Component {
  componentDidMount = () => {
    const { login } = this.props;
    if (!login.profilePhotoUrl) {
      const { loadingRequestAction } = this.props;
      loadingRequestAction(window.document.location);
    }
  }

  handleLoguotProfile = () => {
    const { history, logoutAction } = this.props;
    logoutAction();
    window.localStorage.clear();
    history.push('/');    
  };

  render() {
    const { login, login: { fetching } } = this.props;
    return (
      <div className="profile">
        { fetching && (<Spinner className="spinner" />)}
        { !fetching && (
          <div className="profile__content">
            <h2 className="profile-title">
              <img className="profile-ava" src={login.profilePhotoUrl} alt="Profile avatar" />
              {login.profileName}
            </h2>
            <p>
              Email:
              {
                login.profileEmail
              }
            </p>
            <button type="button" onClick={this.handleLoguotProfile}>Logout</button>
          </div>
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
    profileName: PropTypes.string,
    profileEmail: PropTypes.string,
    fetching: PropTypes.bool,
  }),
};
Profile.defaultProps = {
  logoutAction: () => {},
  loadingRequestAction: () => {},
  login: {
    profilePhotoUrl: '',
    profileName: '',
    profileEmail: '',
    fetching: false,
  },
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
