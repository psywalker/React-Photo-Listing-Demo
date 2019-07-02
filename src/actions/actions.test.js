import React from 'react';
import ReactDOM from 'react-dom';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { BrowserRouter } from 'react-router-dom';
import { shape } from 'prop-types';
import { createSerializer } from 'enzyme-to-json';
import * as t from '.'
import filters from '../../filters';

expect.addSnapshotSerializer(createSerializer({ mode: 'deep' }));
Enzyme.configure({ adapter: new Adapter() });

describe('Test of actions', () => {
   it('Test `logoutAction`', () => {
     
   });
});