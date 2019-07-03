import React from 'react';
import ReactDOM from 'react-dom';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { createSerializer } from 'enzyme-to-json';
import * as t from '../constants/actionTypes';
import initialStore from '../initialStore';
import * as loginReducer from './login';

const initStore = initialStore.login;

expect.addSnapshotSerializer(createSerializer({ mode: 'deep' }));
Enzyme.configure({ adapter: new Adapter() });

describe('Test of reducer `login`', () => {

  it('Test `logoutAction`', () => {

  });
});