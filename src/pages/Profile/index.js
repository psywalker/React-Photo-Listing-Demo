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
        console.log('1: if с проверкой на токкен сработал::: ', token);
        let code = document.location.search.split('?code=')
        let headers = {
              'Authorization': 'Bearer ' + token, 
        }
        axios.get('https://unsplash.com/me', {headers: headers}).then((res) => {
          console.log('2: Запрос с токкеном удачный::: ', res);
        
        })
        .catch(() => {
          console.log('2: Запрос с токкеном НЕудачный::: ', 'pixabay API not responding');
          
        });
      } else {

        let code = document.location.search.split('?code=')

        if(code) {
          axios.post('https://unsplash.com/oauth/token', {
              
                redirect_uri: 'https://psywalker.github.io/React-Photo-Listing-Demo/profile', 
                client_secret: '21b065299de3e2b21be2fec1090d4de4156c8d4c08c7174977c44c273f24842c',
                code: code[1],
                grant_type: 'authorization_code',
                client_id: process.env.REACT_APP_UNSPLASH_API_KEY
          
            }).then((res) => {
              console.log('3: Запрос без токкена (начальный) удачный::: ', res);
              const token = res.data.access_token;
              localStorage.clear();
              localStorage.setItem('token', token);
              console.log('3: Проверка токкена и токкена в localStorage::: ', token, localStorage.getItem('token'));
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