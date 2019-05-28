import React, { Component } from 'react';
import axios from 'axios';
import './index.css';

class Profile extends Component {
    constructor(...args) {
      super(...args);
      this.state = {
        profilePhotoUrl: '',
        profileName: '',
        prifileEmail: '',
      }
    }

    componentDidMount = () => {
        this.handleAuthorizationRequest();
    };

    handleAuthorizationRequest = () => {
      let token = localStorage.getItem('token');

      if (token) {
        let headers = {
              'Authorization': 'Bearer ' + token, 
        }

        axios.get(`${process.env.REACT_APP_PROFILE}/me`, {headers: headers}).then((res) => {
          const profilePhotoUrl = res.data.profile_image.small;
          const profileName = res.data.name;
          const prifileEmail = res.data.email;

          this.setState({
            profilePhotoUrl,
            profileName,
            prifileEmail,
          });
        })
        .catch(() => {
          console.log('2: Запрос с токкеном НЕудачный::: ', 'pixabay API not responding');
        });

      } else {

        let code = document.location.search.split('?code=')

        if(code) {
          axios.post('https://unsplash.com/oauth/token', {
              
                redirect_uri: process.env.REACT_APP_UNSPLASH_API_REDIRECT_URI,
                client_secret: process.env.REACT_APP_UNSPLASH_API_CLIENT_SECRET,
                code: code[1],
                grant_type: 'authorization_code',
                client_id: process.env.REACT_APP_UNSPLASH_API_KEY,
          
            }).then((res) => {
              const token = res.data.access_token;
              localStorage.clear();
              localStorage.setItem('token', token);

              if (token) {
                let headers = {
                      'Authorization': 'Bearer ' + token, 
                }
        
                axios.get(`${process.env.REACT_APP_PROFILE}/me`, {headers: headers}).then((res) => {
                  const profilePhotoUrl = res.data.profile_image.small;
                  const profileName = res.data.name;
                  const prifileEmail = res.data.email;
        
                  this.setState({
                    profilePhotoUrl,
                    profileName,
                    prifileEmail,
                  });
                })
                .catch(() => {
                  console.log('2: Запрос с токкеном НЕудачный::: ', 'pixabay API not responding');
                });
        
              }

            })
            .catch(() => {
              console.log('3: Запрос без токкена (начальный) НЕудачный:::  ', 'pixabay API not responding');
              
            });
        } else {
          console.log('4: Предложить авторизацию');
          /* здесь позже код напишу, пока надо разобраться с кодом выше */
        }
      } 
    }

    handleLoguot = () => {
      const { history } = this.props;
      localStorage.clear();
      history.push('/') 
    };
    render() {
      const { 
        profilePhotoUrl,
        profileName,
        prifileEmail,
     } = this.state;

      return (
        <div className="profile">
            <h2 className="profile-title">
              <img className="profile-ava" src={profilePhotoUrl} alt="Profile avatar" />
              {profileName}
            </h2>
            <p>Email: {prifileEmail}</p>
            <button onClick={this.handleLoguot}>Logout</button>
        </div>
      );
    }
  }
    

Profile.propTypes = {

};
Profile.defaultProps = {

};

export default Profile;