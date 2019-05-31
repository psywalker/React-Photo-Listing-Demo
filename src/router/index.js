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

const Main = () => {
  const [loginFlag, setLoginFlag] = useState(false);
  function handleLogin(flag) {
    if (!flag) { 
      setLoginFlag(true);
      console.log("1::", loginFlag);
    }
    else {
      console.log("2::", loginFlag);
      localStorage.clear();
      setLoginFlag(false);
    }
  }
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL || '/'}>
      <LastLocationProvider>
        <Row style={{ margin: '0px 0 30px' }}>
          <Col>
            <Layout className="user-layout">
              <HeaderApp loginFlag={loginFlag} handleLogin={handleLogin} />
            </Layout>
          </Col>
        </Row>
        <div className="page">
          <Switch>
            <Route path="/" exact component={Home} loginFlag={loginFlag} />
            <Route path="/users/:id/photos" component={UserPhotoListing} />
            <Route path="/photo/:id" component={Photo} />
            {/* <Route path="/profile" component={Profile} /> */}
            <Route path="/profile" component={props => <Profile handleLogin={handleLogin} {...props} />} />
            <Route path="/users/:id" component={User} />
          </Switch>
        </div>
      </LastLocationProvider>
    </BrowserRouter>
  )
}

export default Main;
