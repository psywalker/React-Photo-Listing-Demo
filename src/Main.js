import React from 'react';
import { Switch, Route } from 'react-router-dom';
import App from './App';
import ComponentTest from './components/ComponentTest';

const Main = () => (
    <main>
      <Switch>
        <Route exact path={`${process.env.REACT_APP_PATH || ''}/`} component={App}/>
        <Route path={`${process.env.REACT_APP_PATH || ''}/test`} component={ComponentTest}/>
      </Switch>
    </main>
  )

  export default Main;