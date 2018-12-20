import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Link, Route } from 'react-router-dom';
import User from '.';

Enzyme.configure({ adapter: new Adapter() });

describe('Test of component of User', () => {
  it('Initial', () => { 
    const props = {
      match: {
        params: {
          id: 'sC-BXbi9ajw',
        }
      }
    }

    const user = shallow(<User {...props} />);
    user.setState({ 
      userName: 'User111', 
      userLastName: 'UserLastName',
      userPortfolioUrl: 'userPortfolioUrl',
      userFirstPhoto: 'userFirstPhotoSrc',
      userPhoto: 'userPhotoSrc'
    }); 
    //expect(user.find('.user-card__title').text()).toEqual("User111 UserLastName");
    //expect(user.find('.user-card__first-img').prop('src')).toEqual("userFirstPhotoSrc");
    //expect(user.find('.user-card__photo').prop('src')).toEqual("userPhotoSrc");
    //expect(user.find('.user-card__link-portfolio').prop('href')).toEqual("userPortfolioUrl");
    //expect(user).toMatchSnapshot();
  });
});
