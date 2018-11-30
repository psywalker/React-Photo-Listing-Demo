import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Photo from './pages/Photo';
import User from './components/User';

const Main = () => (
    <main>
      <Switch>
        <Route path="/" exact component={Home}/>
        <Route path="/photo/:id" component={Photo}/>
        <Route path="/users/:id" component={User}/>
      </Switch>
    </main>
  )

  export default Main;