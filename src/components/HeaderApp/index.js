import React, { Component } from 'react';
import { Route, Link} from 'react-router-dom';
import {Layout, Icon  } from "antd";
import ButtonBack from '../../components/ButtonBack';

const {
    Header,
  } = Layout;

class HeaderApp extends Component {
    constructor(...args) {
      super(...args);
      this.state = {
        scopes: 'response_type=code&scope=public+read_user+write_user+read_photos+write_likes+write_photos+write_followers+read_collections+write_collections'
      };
    }
    
    render() {
      const { scopes } = this.state.scopes;
      return (
          <div className="header-app">
            <Header className="user-layout__header"> 
                <div className="page">
                    <Link to={`/`}> <Icon component={() => <img className="user__icon-home" alt="pixabay.com" src="https://www.vectorlogo.zone/logos/pixabay/pixabay-card.png"/>} /> </Link> 
                    <Route path="/:id" component={() => <ButtonBack />} /> 
                    <a href={`https://unsplash.com/oauth/authorize?redirect_uri=https://psywalker.github.io/React-Photo-Listing-Demo/profile&response_type=code&${scopes}&client_id=${process.env.REACT_APP_UNSPLASH_API_KEY}`}>Autorization link</a>
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