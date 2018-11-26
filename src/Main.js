import React from 'react';
import { Switch, Route } from 'react-router-dom';
import App from './App';
import ComponentTest from './components/ComponentTest';

const Main = () => (
    <main>
      <Switch>
        <Route exact path='/' component={App}/>
        <Route path='/test' component={ComponentTest}/>
      </Switch>
    </main>
  )

  export default Main;