import React from 'react';
import ReactDOM from 'react-dom';
import { renderIntoDocument } from 'react-dom/test-utils';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import Main from '.';
import { store } from '../index';
import HomeHOC from '../pages/Home/HomeHOC';

console.log(111)

describe('Test of component of Router', () => {
  it('renders ButtonBack', () => {
    const div = window.document.createElement('div');
    div.id = 'root';
    div.style.width = '812px';
    window.document.body.appendChild(div);
    // const wrapper = global.mountWrap(
    //   <MemoryRouter initialEntries={['/']}>
    //     <Main store={store} />
    //   </MemoryRouter>,
    // );
    // const wrapper = global.mountWrap(
    //   <MemoryRouter initialEntries={['/']}>
    //     <Provider store={store}>
    //       <Main />
    //     </Provider>
    //   </MemoryRouter>,
    // );
    // const App = ({store}) => (
    //   <Provider store={store}>
    //     <Switch>
    //       <Route exact path="/" component={props => <HomeHOC {...props} />} />
    //     </Switch>
    //   </Provider>
    // );

    //console.log(wrapper.debug());
  });
});
