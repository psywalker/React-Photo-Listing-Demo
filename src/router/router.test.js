import React from 'react';
import ReactDOM from 'react-dom';
import { renderIntoDocument } from 'react-dom/test-utils';
import TestRenderer from 'react-test-renderer'; 
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { LastLocationProvider } from 'react-router-last-location';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import Main from './index';
import initialStore from '../initialStore';

import App from '../index';

// import HomeHOC from '../pages/Home/HomeHOC';
// import * as Func from '../index';

// Func.renderIntoDocumentFunc = renderIntoDocument;

describe('Test of component of Router', () => {
  it('renders `<App />`', () => {
    // renderIntoDocumentFunc.default = jest.fn();
    // renderIntoDocument()

    // const store = {
    //   ...initialStore,
    //   dispatch: () => {},
    //   getState: () => {},
    //   replaceReducer: () => {},
    //   subscribe: () => {},
    //   Symbol: () => {},
    // };
    // const props = {
    //   login: {}
    // }
    // const tree = TestRenderer.create(
    //   <MemoryRouter initialEntries={['/photo/hag']}>
    //     <Provider store={store}>
    //       <Main {...props} />
    //     </Provider>
    //   </MemoryRouter>,
    // ).toJSON();
    // const wrapper = global.mountWrap(
    //   <MemoryRouter initialEntries={['/']}>
    //     <Provider store={store}>
    //       <BrowserRouter basename={process.env.PUBLIC_URL || '/'}>
    //         <LastLocationProvider>
    //           <Main />
    //         </LastLocationProvider>
    //       </BrowserRouter>
    //     </Provider>
    //   </MemoryRouter>,
    // );

    // console.log(wrapper.debug())
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
