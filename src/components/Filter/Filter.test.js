import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Filter from '.';
import filters from '../../filters';

Enzyme.configure({ adapter: new Adapter() });

describe('Test of component of Filter.js', () => {
  it('Initial filter\'s state showDropdown ', () => {
    const filter = shallow(<Filter />);
    expect(filter.state().showDropdown).toEqual(false);
  });

  it('Test display DropdownMenu of Filters ', () => {
    const filtersWrapper = mount(
      <div className="filter-wrapper">
        {filters.map(item => (
          <li key={item.id} className="filter-list__item">
            <Filter className={`filter-${item.id}`} key={item.id} filters={item.items} activeFilter={item.name} />
          </li>))
        }
      </div>,
    );

    expect(filtersWrapper.find('.filter-1').find('button.filter__toggler').length).toBe(1);
    expect(filtersWrapper.find('.filter-1').find('.filter-dropDownMenu').length).toBe(0);
    expect(filtersWrapper.find('.filter-2').find('.filter-dropDownMenu').length).toBe(0);
    expect(filtersWrapper.find('.filter-1').instance().state.showDropdown).toBe(false);

    filtersWrapper.find('.filter-1').find('button.filter__toggler').simulate('click');

    expect(filtersWrapper.find('.filter-1').instance().state.showDropdown).toBe(true);
    expect(filtersWrapper.find('.filter-1').find('.filter-dropDownMenu').length).toBe(3);
    expect(filtersWrapper.find('.filter-2').find('.filter-dropDownMenu').length).toBe(0);
  });

  it('Test bug in Filters ', () => {
    const filtersWrapper = mount(
      <div>
        <ul className="filter-wrapper">
          {filters.map(item => (
            <li key={item.id} className="filter-list__item">
              <Filter className={`filter-${item.id}`} key={item.id} filters={item.items} activeFilter={item.name} />
            </li>))
          }
        </ul>
      </div>,
    );

    expect(filtersWrapper.find('.filter-1').find('.filter-dropDownMenu').length).toBe(0);
    expect(filtersWrapper.find('.filter-1').instance().state.showDropdown).toBe(false);

    filtersWrapper.find('.filter-1').instance().hide();

    expect(filtersWrapper.find('.filter-1').instance().state.showDropdown).toBe(false);
    expect(filtersWrapper.find('.filter-1').find('.filter-dropDownMenu').length).toBe(0);
  });
});