import React from 'react';
import ReactDOM from 'react-dom';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { createSerializer } from 'enzyme-to-json';
import get from 'lodash/get';
import { put, call  } from 'redux-saga/effects';
import axios from 'axios';
import * as t from '../constants/actionTypes';
import initialStore from '../initialStore';
import { fetchLoginData, loginAfterToken } from './login';
import { URL_FOR_PROFILE_ME, URL_FOR_TOKEN, URL_FOR_AVATAR_PLACEHOLDER } from '../constants';

const initStore = initialStore.login;

expect.addSnapshotSerializer(createSerializer({ mode: 'deep' }));
Enzyme.configure({ adapter: new Adapter() });

describe('Test of saga `login`', () => {
  it('loginAfterToken Saga test', () => {
    const mockResponse = { profileEmail: 'email@email.com' };
    const gen = loginAfterToken('tokken');
    expect(gen.next().value).toEqual(call(fetchLoginData));
    expect(gen.next(mockResponse).value).toEqual(put({ type: 'LOGIN_SUCCESS', dataForProps: mockResponse }));
    expect(gen.next()).toEqual({ done: true, value: undefined });
  });
});