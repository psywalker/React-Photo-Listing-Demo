import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './index.css';

class Profile extends Component {
  componentDidMount = () => {
    const { autorizationResultObj, handleAuthorization } = this.props;
    if (!autorizationResultObj.loginFlag) {
      const code = document.location.search.split('?code=');
      handleAuthorization(code[1]);
    }
  }

  handleLoguotProfile = () => {
    const { history, handleLoguot } = this.props;
    handleLoguot();
    history.push('/');    
  };

  render() {
    const { handleLoguot } = this.props;
    const { profilePhotoUrl, profileName, profileEmail } = this.props.autorizationResultObj;
    return (
      <div className="profile">
        <h2 className="profile-title">
          <img className="profile-ava" src={profilePhotoUrl} alt="Profile avatar" />
          {profileName}
        </h2>
        <p>Email: { profileEmail }</p>
        <button onClick={this.handleLoguotProfile}>Logout</button>
      </div>
    );
  }
}

export default Profile;
