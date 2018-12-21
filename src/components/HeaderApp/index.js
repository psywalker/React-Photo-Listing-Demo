import React, { Component } from 'react';
import { Route, Link} from 'react-router-dom';
import {Layout, Button, Icon  } from "antd";
import ButtonBack from '../../components/ButtonBack';
import axios from 'axios';

const {
    Header,
  } = Layout;

class HeaderApp extends Component {
    constructor(...args) {
      super(...args);
      this.state = {
        
      };
    }
    
    handleAuthorizationRequest = () => {
        axios.defaults.headers.common = {};
        axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*'
        axios.get('https://unsplash.com/oauth/authorize?', {
            headers: {
                'Content-type': 'text/html',
                'Access-Control-Allow-Origin': '*',
            },
            params: {
              redirect_uri: '/', 
              code: 'code',
              client_id: process.env.REACT_APP_UNSPLASH_API_KEY
            },
          }).then((res) => {
            console.log('111', res);
          })
          .catch(() => {
            console.log('pixabay API not responding');
            
          });
    }

    render() {
      return (
          <div className="header-app">
            <Header className="user-layout__header"> 
                <div className="page">
                    <Link to={`/`}> <Icon component={() => <img className="user__icon-home" alt="pixabay.com" src="https://www.vectorlogo.zone/logos/pixabay/pixabay-card.png"/>} /> </Link> 
                    <Route path="/:id" component={() => <ButtonBack />} /> 
                    <Button
                        type='default'
                        onClick={this.handleAuthorizationRequest}
                        >
                        Autorization
                    </Button>
                </div>
            </Header>    
        </div>
      );
    }
  }
    

HeaderApp.propTypes = {

};
HeaderApp.defaultProps = {

};

export default HeaderApp;