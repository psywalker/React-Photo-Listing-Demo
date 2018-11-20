import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Test from './components/Test';
import DropdownItem from './components/DropdownItem';

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

    it('Test padding of div', () => {
      //const { enzymeWrapper } = setup();
      //const onClick = jest.fn(() => 1);
      const props = {
        onFilterClick: () => {},
        activeFilter: '',
        filterType: '',
        hasPadding: false,
      }
      const dropdownItem = shallow(<DropdownItem {...props} />)

      expect(dropdownItem.find('div').prop('role')).toEqual('presentation')
      expect(dropdownItem.find('div').prop('style')).toEqual({})
      
    });


    it('Test active of class of div', () => {
      const props1 = {
        onFilterClick: () => {},
        activeFilter: 'filter',
        filterType: 'filter',
        hasPadding: false,
      }
      const dropdownItem1 = shallow(<DropdownItem {...props1} />)

      expect(dropdownItem1.find('div').hasClass('active')).toEqual(true);
      

      const props2 = {
        onFilterClick: () => {},
        activeFilter: 'filter1',
        filterType: 'filter2',
        hasPadding: false,
      }
      const dropdownItem2 = shallow(<DropdownItem {...props2} />)

      expect(dropdownItem2.find('div').hasClass('active')).toEqual(false);
    });


    it('Test element of check', () => {
      const props1 = {
        onFilterClick: () => {},
        activeFilter: 'filter',
        filterType: 'filter',
        hasPadding: false,
      }
      const dropdownItem1 = shallow(<DropdownItem {...props1} />)

      expect(dropdownItem1.find('i').length).toEqual(1);
      

      const props2 = {
        onFilterClick: () => {},
        activeFilter: 'filter1',
        filterType: 'filter2',
        hasPadding: false,
      }
      const dropdownItem2 = shallow(<DropdownItem {...props2} />)

      expect(dropdownItem2.find('i').length).toEqual(0);
    });

    it('Test text of div element', () => {
      const props = {
        onFilterClick: () => {},
        activeFilter: 'filter',
        filterType: 'filter',
        hasPadding: false,
      }
      const dropdownItem = shallow(<DropdownItem {...props} />)

      expect(dropdownItem.find('div').text()).toEqual(props.filterType + '✓')
    });

    it('Test method of div element', () => {

      function func() {
        const props = {
          onFilterClick: jest.fn(),
        }     
        const enzymeWrapper = shallow(<DropdownItem {...props} />)
        return {
          props,
          enzymeWrapper
        }
      }
      const { enzymeWrapper, props } = func()

      const div = enzymeWrapper.find('div')
      div.props().onClick()
      expect(props.onFilterClick).toBeCalled();
      expect(props.onFilterClick.mock.calls.length).toBe(1)
    });

    it('Test method of div element', () => {
      function funcTest() {
        const enzymeWrapper = shallow(<Test />);
        return {
          enzymeWrapper,
        };
      }
      const mock = jest.fn();
      mock.mockReturnValue(1);

      const { enzymeWrapper } = funcTest();
      const div = enzymeWrapper.find('div')
      
      expect(mock(div.prop.onClick)).toBe(1);

      //console.log(enzymeWrapper.debug());
      //expect(enzymeWrapper.find('div').hasClass('test')).toBe(true);

    });
  });
});