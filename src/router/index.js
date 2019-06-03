import React, { useState } from 'react';
import { LastLocationProvider } from 'react-router-last-location';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import { Row, Col, Layout } from 'antd';
import Home from '../pages/Home/Home';
import Photo from '../pages/Photo';
import User from '../pages/User';
import UserPhotoListing from '../pages/UserPhotoListing';
import Profile from '../pages/Profile';
import HeaderApp from '../components/HeaderApp';
import handleAuthorizationRequest from '../autorization';

const Main = () => {
  const [autorizationResultObj, setAutorizationResultObj] = useState({
    loginFlag: false,
  });

  const handleLoguot = () => {
    setAutorizationResultObj({ loginFlag: false });
  };

  const handleAuthorization = (code) => {
    handleAuthorizationRequest(code)
      .then(
        (response) => {
          setAutorizationResultObj(response);
        },
      );
  };

  return (
    <BrowserRouter basename={process.env.PUBLIC_URL || '/'}>
      <LastLocationProvider>
        <Row style={{ margin: '0px 0 30px' }}>
          <Col>
            <Layout className="user-layout">
              <HeaderApp
                autorizationResultObj={autorizationResultObj}
                handleLoguot={handleLoguot}
              />
            </Layout>
          </Col>
        </Row>
        <div className="page">
          <Switch>
            <Route exact path="/" component={props => <Home {...props} />} />
            <Route path="/users/:id/photos" component={UserPhotoListing} />
            <Route path="/photo/:id" component={Photo} />
            <Route path="/profile" component={props => <Profile autorizationResultObj={autorizationResultObj} handleAuthorization={handleAuthorization} handleLoguot={handleLoguot} {...props} />} />
            <Route path="/users/:id" component={User} />
          </Switch>
        </div>
      </LastLocationProvider>
    </BrowserRouter>
  );
};

export default Main;
