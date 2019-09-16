import React, { memo } from 'react';
import { LastLocationProvider } from 'react-router-last-location';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import { Row, Col, Layout } from 'antd';
import {
  Photo,
  User,
  Profile,
  HeaderApp,
} from '../components';
import HomeHOC from '../pages/Home/HomeHOC';
import Test from '../pages/Test';
import './index.scss';

const Main = memo(() => (
  // <BrowserRouter basename={process.env.PUBLIC_URL || '/'}>
  //   <Route exact path="/test" component={props => <Test {...props} />} />
  // </BrowserRouter>
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
          <Route exact path="/" component={props => <HomeHOC {...props} />} />
          <Route path="/photo/:id" component={props => <Photo {...props} />} />
          <Route path="/profile" component={props => <Profile {...props} />} />
          <Route path="/users/:id" component={props => <User {...props} />} />
          <Route path="/:tag" component={props => <HomeHOC {...props} />} />
          <Route exact path="/test" component={Test} />
        </Switch>
      </div>
    </LastLocationProvider>
  </BrowserRouter>
));

export default Main;
