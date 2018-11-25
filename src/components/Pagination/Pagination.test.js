import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Pagination from '.';
import { getPageNumbers, generateNavItems } from "../../utils";

Enzyme.configure({ adapter: new Adapter() });

describe('Test of component of Pagination', () => {
 
  it('Test snapshot Pagination component', () => {
    const pagination = shallow(<Pagination />);
    expect(pagination).toMatchSnapshot();
  });
  it('Test snapshot Pagination component: items length', () => {
    const props = {
      perPage: 20,
      totalCards: 100,
    }

    const pagination = mount(<Pagination {...props} />);
    expect(pagination.find('a.pagination__link').length).toEqual(5);
  });
  it('Test snapshot Pagination component: click on item', () => {
    const props = {
      perPage: 20,
      totalCards: 100,
    }

    const pagination = mount(<Pagination {...props} />);
    pagination.setState({ page: 3 });
    expect(pagination.find('a.pagination__link_active').text()).toEqual('3');

    pagination.find('a.pagination__link').at(0).simulate('click');

    expect(pagination.find('a.pagination__link_active').text()).toEqual('1');
  });
  it('Test snapshot Pagination component: click on lelt and right arrows', () => {
    const props = {
      perPage: 20,
      totalCards: 100,
    }

    const pagination = mount(<Pagination {...props} />);

    /* Test left arrow */
    expect(pagination.state().page).toEqual(1);
    expect(pagination.find('a.pagination__link_active').text()).toEqual('1');

    pagination.find('a.page-link_left').simulate('click');

    expect(pagination.state().page).toEqual(1);
    expect(pagination.find('a.pagination__link_active').text()).toEqual('1');

    /* Test right arrow in the middle */
    pagination.find('a.page-link_right').simulate('click');

    expect(pagination.state().page).toEqual(2);
    expect(pagination.find('a.pagination__link_active').text()).toEqual('2');

    /* Test right arrow in the end */
    pagination.find('a.pagination__link').at(4).simulate('click');

    expect(pagination.state().page).toEqual(5);
    expect(pagination.find('a.pagination__link_active').text()).toEqual('5');
  });

  it('Test snapshot Pagination component: generateNavItems() and getPageNumbers() methods ', () => {

    const props = {
      itemNumbers: 10,
      perPage: 20,
      totalCards: 200,
    }

    const pagination = mount(<Pagination {...props} />);
    pagination.setState({ page: 1 });

    expect(pagination.find('a.pagination__link_active').text()).toEqual('1');
    expect(pagination.find('a.pagination__link').length).toEqual(10);

    const navigationItems = generateNavItems(1, 20, 100, 10);
    expect(navigationItems.length).toEqual(5);

    pagination.setState({ navigationItems });
    expect(pagination.find('a.pagination__link').length).toEqual(5);

    const i = getPageNumbers(1, 20, 100);
    expect(i).toEqual(6);
  });
});