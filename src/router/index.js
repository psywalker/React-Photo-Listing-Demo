import React from 'react';
import { LastLocationProvider } from 'react-router-last-location';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import { Row, Col, Layout } from 'antd';
import Home from '../pages/Home/Home';
import Photo from '../pages/Photo';
import User from '../pages/User';
import UserPhotoListing from '../pages/UserPhotoListing';
import Profile from '../pages/Profile';
import HeaderApp from '../components/HeaderApp';
import './index.scss';

const Main = () => (
  <BrowserRouter basename={process.env.PUBLIC_URL || '/'}>
    <LastLocationProvider>
      <Row className="header-row" style={{ margin: '0px 0 30px' }}>
        <Col>
          <Layout className="user-layout">
            <HeaderApp />
          </Layout>
        </Col>
      </Row>
      <div className="page">
        <Switch>
          <Route exact path="/" component={props => <Home {...props} />} />
          <Route path="/users/:id/photos" component={UserPhotoListing} />
          <Route path="/photo/:id" component={Photo} />
          <Route path="/profile" component={props => <Profile {...props} />} />
          <Route path="/users/:id" component={User} />
        </Switch>
      </div>
    </LastLocationProvider>
  </BrowserRouter>
);

export default Main;
