import React from 'react';
import ReactDOM from 'react-dom';
import Enzyme, { shallow, mount, render } from 'enzyme';
import { renderIntoDocument } from 'react-dom/test-utils';
import TestRenderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { LastLocationProvider } from 'react-router-last-location';
// import { Switch, Route, BrowserRouter } from 'react-router-dom';
import HomeHOC from '../pages/Home/HomeHOC';
import Home from '../pages/Home';
import Photo from '../pages/Photo';
import User from '../pages/User';
import Profile from '../pages/Profile';
import Test from '../pages/Test';
import Main from './index';
import initialStore from '../initialStore';

import App from '../index';

const div = global.document.createElement('div');

jest.mock('react-dom', () => ({ render: jest.fn() }));
global.document.getElementById = id => id === 'root' && div;

describe('Test of component of Router', () => {
  it('renders `<App />`', () => {

    const component = global.shallow(<Main />);
    const newPathMap = component.find('Route').reduce((pathMap, route) => {
      const routeProps = route.props();
      pathMap[routeProps.path] = routeProps.component({});
      return pathMap;
    }, {});

    expect(newPathMap['/']).toStrictEqual(<HomeHOC />);
    expect(newPathMap['/photo/:id']).toStrictEqual(<Photo />);
    expect(newPathMap['/profile']).toStrictEqual(<Profile />);
    expect(newPathMap['/users/:id']).toStrictEqual(<User />);
    expect(newPathMap['/:tag']).toStrictEqual(<HomeHOC />);
  });
});
