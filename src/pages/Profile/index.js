import React, { Component } from 'react';
import axios from 'axios';

class Profile extends Component {
    constructor(...args) {
      super(...args);
      this.state = {
        
      };
    }

    componentDidMount = () => {
        this.handleAuthorizationRequest();
    };

    handleAuthorizationRequest = () => {
        
        let code = document.location.search.split('?code=')
        console.log('444', code[1])
        axios.post('https://unsplash.com/oauth/token', {
            
              redirect_uri: 'http://localhost:3000/profile/', 
              client_secret: '21b065299de3e2b21be2fec1090d4de4156c8d4c08c7174977c44c273f24842c',
              code: code[1],
              grant_type: 'authorization_code',
              client_id: process.env.REACT_APP_UNSPLASH_API_KEY
         
          }).then((res) => {
            console.log('111', res);
          })
          .catch(() => {
            console.log('pixabay API not responding');
            
          });

          /*axios({
            method: 'post',
            url: 'https://unsplash.com/oauth/token?',
            data: {
                redirect_uri: '/', 
                client_secret: '21b065299de3e2b21be2fec1090d4de4156c8d4c08c7174977c44c273f24842c',
                code: code[1],
                grant_type: 'authorization_code',
                client_id: process.env.REACT_APP_UNSPLASH_API_KEY
            }
          }).then((res) => {
            console.log('111', res);
          })
          .catch(() => {
            console.log('pixabay API not responding');
            
          });*/
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