import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import PaginationSelf from './PaginationSelf';

Enzyme.configure({ adapter: new Adapter() });

describe('Test of component of PaginationSelf', () => {
  it('Test state PhotoCard component', () => {
    const pagination = mount(<PaginationSelf />)

  });

  it('Test snapshot PaginationSelf component', () => {
    const pagination = shallow(<PaginationSelf />);
    expect(pagination).toMatchSnapshot();
  });
});