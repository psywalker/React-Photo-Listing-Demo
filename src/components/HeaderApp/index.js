import React, { Component } from 'react';
import { Route, Link} from 'react-router-dom';
import {Layout, Button, Icon  } from "antd";
import ButtonBack from '../../components/ButtonBack';

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
        console.log(11)
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