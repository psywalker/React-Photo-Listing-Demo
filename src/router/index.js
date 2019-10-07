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
import './index.scss';

export const getBaseName = () => process.env.PUBLIC_URL || '/';

const Main = memo(() => (
  <BrowserRouter basename={getBaseName()}>
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
        </Switch>
      </div>
    </LastLocationProvider>
  </BrowserRouter>
));

export default Main;
