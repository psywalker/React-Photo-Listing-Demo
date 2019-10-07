import React from 'react';
import HomeHOC from '../pages/Home/HomeHOC';
import Photo from '../pages/Photo';
import User from '../pages/User';
import Profile from '../pages/Profile';
import Main, { getBaseName } from './index';

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

  it('`process.env`', () => {
    const basename = process.env.PUBLIC_URL || '/';
    expect(getBaseName()).toEqual(basename);

    process.env = Object.assign(process.env, {
      PUBLIC_URL: 'whatever',
    });
    expect(getBaseName()).toEqual('whatever');

    process.env = Object.assign(process.env, {
      PUBLIC_URL: '',
    });
    expect(getBaseName()).toEqual('/');
  });
});
