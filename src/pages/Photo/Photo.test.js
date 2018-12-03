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
    //photo.instance().handlePhotoQuery();
    //expect(photo.state('userNic')).toEqual('Ricardo Frantz');
    photo.setState({ userName: 'User111', userNic: 'url' });
    console.log(photo.debug());
    //expect(filter.state().showDropdown).toEqual(false);
  });
});
