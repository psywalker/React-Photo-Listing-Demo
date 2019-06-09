import React, { memo } from 'react';
import { LastLocationProvider } from 'react-router-last-location';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import { Row, Col, Layout } from 'antd';
import {
  Home,
  Photo,
  User,
  UserPhotoListing,
  Profile,
  HeaderApp,
} from '../components';
import './index.scss';

const Main = memo(() => (
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
));

export default Main;
