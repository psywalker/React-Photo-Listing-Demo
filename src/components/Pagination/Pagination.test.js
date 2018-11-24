import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Pagination from '.';

Enzyme.configure({ adapter: new Adapter() });

describe('Test of component of Pagination', () => {
  it('Test state PhotoCard component', () => {
    const pagination = mount(<Pagination />)

  });

  it('Test snapshot Pagination component', () => {
    const pagination = shallow(<Pagination />);
    expect(pagination).toMatchSnapshot();
  });

  it('Test snapshot Pagination component', () => {
    const props = {
      page: 3,
      perPage: 20,
      totalCards: 100,
    }

    const pagination = mount(<Pagination {...props} />);
    //console.log('1111', pagination.find('a.pagination__link_active').text());
    //expect(pagination.find('a.pagination__link').length).toEqual(7);
    //expect(pagination.find('a.pagination__link_active').text()).toEqual('3');

    //pagination.find('a.pagination__link').at(1).simulate('click');
    //expect(pagination.find('a.pagination__link_active').text()).toEqual('1');
     //pagination.instance().handleNavigationClick(1)
    //console.log(pagination.debug());
  });
});