import React from 'react';
import Enzyme, { shallow, mount, render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { createSerializer } from 'enzyme-to-json';
import HomeTest from './HomeTest';
import 'jest-extended';
import 'jest-enzyme';

// React 16 Enzyme adapter
expect.addSnapshotSerializer(createSerializer({ mode: 'deep' }));
Enzyme.configure({ adapter: new Adapter() });
// import { mapStateToProps } from './HomeHOC';
// import { testDidUpdate } from '.';
describe('Test of component of Home', () => {
  it('with `filters` data ', () => {});
});