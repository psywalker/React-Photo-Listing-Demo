import React from 'react';
import ReactDOM from 'react-dom';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { BrowserRouter } from 'react-router-dom';
import { shape } from 'prop-types';
import { createSerializer } from 'enzyme-to-json';
import * as t from '../constants/actionTypes';
import {
  logoutAction,
  userRequestAction,
} from '.';

expect.addSnapshotSerializer(createSerializer({ mode: 'deep' }));
Enzyme.configure({ adapter: new Adapter() });

describe('Test of actions', () => {

  it('Test `logoutAction`', () => {
    const expectedAction = {
      type: t.LOGOUT,
    };
    expect(logoutAction()).toEqual(expectedAction);
  });

  describe('Test `userRequestAction`', () => {

    it('Test `userRequestAction` with `isUserFetching` egual true (Passed test)', () => {
      const expectedAction = {
        type: t.USER_FETCHING,
        isUserFetching: true,
        match: { match: {} },
      };
      expect(userRequestAction({ match: {} })).toEqual(expectedAction);
    });

    it('Test `userRequestAction` with `isUserFetching` egual false (Failed test)', () => {
      const expectedAction = {
        type: t.USER_FETCHING,
        isUserFetching: false,
        match: { match: {} },
      };
      expect(userRequestAction({ match: {} })).not.toEqual(expectedAction);
    });

    
  });
});