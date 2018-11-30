import React from 'react';
import { Switch, Route } from 'react-router-dom';
import App from './pages/Home';
import Photo from './components/Photo';
import User from './components/User';

const Main = () => (
    <main>
      <Switch>
        <Route path="/" exact component={App}/>
        <Route path="/photo/:id" component={Photo}/>
        <Route path="/users/:id" component={User}/>
      </Switch>
    </main>
  )

  export default Main;