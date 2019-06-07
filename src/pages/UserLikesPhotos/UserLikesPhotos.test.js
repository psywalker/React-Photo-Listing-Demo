import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import UserLikesPhotos from '.';
import Spinner from '../../components/Spinner';

Enzyme.configure({ adapter: new Adapter() });

describe('Test of component of UserLikesPhotos', () => {
  it('Test display Pagination', () => {
    const props = {
      userId: 'sC-BXbi9ajw',
    };

    const userLikesPhotos = shallow(<UserLikesPhotos {...props} />);

    userLikesPhotos.setState({
      totalCards: 7,
    });

    expect(userLikesPhotos.find('Pagination').length).toEqual(1);

    userLikesPhotos.setState({
      totalCards: 5,
    });

    expect(userLikesPhotos.find('Pagination').length).toEqual(0);
  });

  it('Test Spinner and photo-list', () => {
    const props = {
      userId: 'sC-BXbi9ajw',
    };

    const userLikesPhotos = shallow(<UserLikesPhotos {...props} />);


    userLikesPhotos.setState({
      isListingLoading: false,
    });
    expect(userLikesPhotos.find(Spinner).length).toEqual(0);
    expect(userLikesPhotos.find('.user-photos').length).toEqual(1);


    userLikesPhotos.setState({
      isListingLoading: true,
    });

    expect(userLikesPhotos.find(Spinner).length).toEqual(1);
    expect(userLikesPhotos.find('.user-photos').length).toEqual(0);
  });

  it('Test Snapshot', () => {
    const props = {
      userId: 'sC-BXbi9ajw',
    };

    const userLikesPhotos = shallow(<UserLikesPhotos {...props} />);
    expect(userLikesPhotos).toMatchSnapshot();
  });
});
