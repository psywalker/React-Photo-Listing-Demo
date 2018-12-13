import React from 'react';
import { Switch, Route, Redirect} from 'react-router-dom';
import Home from '../pages/Home/Home';
import Photo from '../pages/Photo';
import User from '../pages/User';
import UserPhotoListing from '../pages/UserPhotoListing';

const Main = () => (
      <Switch>
        <Route path="/" exact component={Home}/>
        <Route path="/users/:id/photos" component={UserPhotoListing}/>
        <Route path="/photo/:id" component={Photo}/>
        <Route path="/users/:id" component={User}/>
        <Redirect push to="/" />
      </Switch>)

  export default Main;