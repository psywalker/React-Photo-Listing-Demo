import React from 'react';
import { Switch, Route } from 'react-router-dom';
import App from './pages/Home';
import Photo from './components/Photo';

const Main = () => (
    <main>
      <Switch>
        <Route path="/" exact component={App}/>
        <Route path="/photo/:id" component={Photo}/>
      </Switch>
    </main>
  )

  export default Main;