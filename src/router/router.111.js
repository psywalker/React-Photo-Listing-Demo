import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Link, Route } from 'react-router-dom';
import Router from '.';

Enzyme.configure({ adapter: new Adapter() });

describe('Test of component of Router', () => {
  it('Initial', () => { 

    const router = shallow(<Router />);
    expect(router).toMatchSnapshot();
  });
});
