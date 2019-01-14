import React, { Component } from 'react';
import axios from 'axios';

class Profile extends Component {
    constructor(...args) {
      super(...args);
      this.state = {
        token: null,
      };
    }

    componentDidMount = () => {
        this.handleAuthorizationRequest();
    };

    handleAuthorizationRequest = () => {
      let token = localStorage.getItem('token');

      if (token) {
        console.log('111', token);
        let code = document.location.search.split('?code=')
        let headers = {
              'Authorization': 'Bearer ' + token, 
        }
        axios.get('https://unsplash.com/me/psywalker', {headers: headers}).then((res) => {
          console.log('222', res);
        
        })
        .catch(() => {
          console.log('222', 'pixabay API not responding');
          
        });
      } else {

        let code = document.location.search.split('?code=')

        if(code) {
          axios.post('https://unsplash.com/oauth/token', {
              
                redirect_uri: 'http://localhost:3000/profile/', 
                client_secret: '21b065299de3e2b21be2fec1090d4de4156c8d4c08c7174977c44c273f24842c',
                code: code[1],
                grant_type: 'authorization_code',
                client_id: process.env.REACT_APP_UNSPLASH_API_KEY
          
            }).then((res) => {
              console.log('333', res);
              const token = res.data.access_token;
              localStorage.clear();
              localStorage.setItem('token', token);
              console.log('333', token, localStorage.getItem('token'));
            })
            .catch(() => {
              console.log('333', 'pixabay API not responding');
              
            });
        } else {
          console.log('Предложить авторизацию');
          /* здесь позже код напишу, пока надо разобраться с кодом выше */
        }
      } 
    }

    render() {
      return (
        <div className="profile">
            1111
        </div>
      );
    }
  }
    

Profile.propTypes = {

};
Profile.defaultProps = {

};

export default Profile;