import React, { memo } from 'react';
import { LastLocationProvider } from 'react-router-last-location';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import { BackTop, Icon } from 'antd';
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
      <HeaderApp />
      <div className="page">
        <BackTop>
          <div className="ant-back-top-inner"><Icon type="arrow-up" /></div>
        </BackTop>
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
