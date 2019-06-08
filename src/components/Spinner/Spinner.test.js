import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Spinner from '.';

Enzyme.configure({ adapter: new Adapter() });

describe('Test of component of Spinner', () => {
  it('Test Spinner tags heaving', () => {
    const spinner = shallow(<Spinner />);
    expect(spinner.find('.site-spinner').length).toEqual(1);
    expect(spinner.find('.lds-ring').length).toEqual(1);
    expect(spinner.find('.lds-ring div').length).toEqual(4);
  });

  it('Test Snapshot', () => {
    const spinner = shallow(<Spinner />);
    expect(spinner).toMatchSnapshot();
  });
});
