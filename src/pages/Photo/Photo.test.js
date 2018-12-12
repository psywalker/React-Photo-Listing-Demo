import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Link, Route } from 'react-router-dom';
import Photo from '.';

Enzyme.configure({ adapter: new Adapter() });

describe('Test of component of Photo', () => {
  it('Initial', () => { 
    const props = {
      match: {
        params: {
          id: 'sC-BXbi9ajw',
        }
      }
    }

    const photo = shallow(<Photo {...props} />);
    photo.setState({ 
      userName: 'User111', 
      userNic: 'url',
      userPortfolioUrl: 'linkUrl',
    }); 
    expect(photo.find('h2').text()).toEqual("Autor: User111 ");
    expect(photo.find('Link').prop('to')).toEqual("/users/url");
    expect(photo.find('.photo-card__autor-link').prop('href')).toEqual("linkUrl");
    expect(photo).toMatchSnapshot();
  });
});
