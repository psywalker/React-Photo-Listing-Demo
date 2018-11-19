import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import Filter from './components/Filter';


Enzyme.configure({ adapter: new Adapter() });

describe('Test of component of Filter.js', () => {
  it('Initial filter\'s state showDropdown ', () => { 
    const filter = shallow(<Filter />)
    expect(filter.state().showDropdown).toEqual(false);
  });

  it('Initial filter\'s state showDropdown ', () => { 
    const filter = shallow(<Filter />)
    //expect(filter.find('t').at(1).props().caret).toBe(true);
    //expect(filter).toMatchSnapshot()
    //const tree = create(<Filter />).toJSON();
    //filter.find('t').at(1).simulate('click');
    //const tree = renderer.create(<Filter />).toJSON();

    //expect(tree).toMatchSnapshot()
    //expect(filter.find('div')).toBe(true);
    //expect(filter.exists('div')).toEqual(true);
    //console.log(filter.debug());
    //console.log(filter.state());
    //console.log('111')

  });
});