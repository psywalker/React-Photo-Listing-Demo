import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Test from './components/Test';

Enzyme.configure({ adapter: new Adapter() });

function setup() {
  const enzymeWrapper = shallow(<Test />);
  return {
    enzymeWrapper,
  };
}

describe('components', () => {
  describe('Test 1', () => {
    it('Test 2', () => {
      const { enzymeWrapper } = setup();

      expect(enzymeWrapper.find('div').hasClass('test')).toBe(true);

    });

    it('simulates click events', () => {
      const { enzymeWrapper } = setup();
      const value = 1;
      const onClick = jest.fn();

      expect(enzymeWrapper).toMatchSnapshot();

      enzymeWrapper.find('div').simulate('click');

      expect(onClick).toBeCalledWith(1);

    });
  });
});