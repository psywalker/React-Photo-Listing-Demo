import React from 'react';
import { Switch, Route } from 'react-router-dom';
import App from './pages/Home';
import Photo from './components/Photo';

const Main = () => (
    <main>
      <Switch>
        <Route exact path={`${process.env.REACT_APP_PATH || ''}/`} component={App}/>
        <Route path={`${process.env.REACT_APP_PATH || ''}/photo/:id`} component={Photo}/>
      </Switch>
    </main>
  )

  export default Main;