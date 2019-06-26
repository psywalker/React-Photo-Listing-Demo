import React from 'react';
import ReactDOM from 'react-dom';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { createSerializer } from 'enzyme-to-json';
import { Home } from '.';
import filters from '../../filters';

expect.addSnapshotSerializer(createSerializer({ mode: 'deep' }));
Enzyme.configure({ adapter: new Adapter() });

describe('Test of component of Home', () => {
  const initialProps = {
    cardsPhotosRequestAction: () => {},
    paginationChangeAction: () => {},
    filterItemValueAction: () => {},
    searchTextAction: () => {},
    searchChangeInputValueAction: () => {},
    filters: [],
    isListingLoading: false,
    cards: [],
    cardsData: {
      query: 'wallpapers',
      page: 1,
      per_page: 6,
    },
    totalCards: 0,
    navTopItemActive: 2,
    photolistingRequestError: false,
    match: {
      params: {
        tag: {},
      },
    },
  };

  describe('Home component initial', () => {
    it('renders with initial props', () => {
      const home = shallow(<Home {...initialProps} />);

      expect(home.find('.nav-top__item')).toHaveLength(0);
      expect(home.find('.cards__text-empty')).toHaveLength(1);
      expect(home.find('.pagination')).toHaveLength(1);
      expect(home.find('.spinner')).toHaveLength(0);
      expect(home).toMatchSnapshot();
    });

    it('renders with loading', () => {
      const props = {
        ...initialProps,
        isListingLoading: true,
      };

      const home = shallow(<Home {...props} />);
      expect(home.find('.spinner')).toHaveLength(1);
      expect(home).toMatchSnapshot();
    });

    it('renders with error', () => {
      const props = {
        ...initialProps,
        photolistingRequestError: true,
      };

      const home = shallow(<Home {...props} />);
      expect(home.find('.error-text').text()).toEqual('Error loading photolisting');
      expect(home).toMatchSnapshot();
    });

    it('dispatches the `cardsPhotosRequestAction()` method it receives from props', () => {
      const mockFetchRequestAction = jest.fn();
      const props = {
        ...initialProps,
        cardsPhotosRequestAction: mockFetchRequestAction,
        cardsData: {
          query: 'wallpapers',
          page: 1,
          per_page: 2,
        },
      };

      const home = shallow(<Home {...props} />);
      expect(mockFetchRequestAction).toHaveBeenCalled();
      expect(home).toMatchSnapshot();
    });
  });

  describe('Home component with content', () => {
    it('renders with cards', () => {
      const props = {
        ...initialProps,
        cards: [
          {
            photoDesc: null,
            photoID: 'kdGstD3te3M',
            photoName: 'https://images.unsplash.com/photo-1558981408-db0ecd8a1ee4?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjQzODA4fQ',
            title: 'Harley-Davidson',
            userAvatar: 'https://images.unsplash.com/profile-1556751276456-1561737ea797?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=128&w=128',
            userID: 'harleydavidson',
          },
        ],
      };
      const home = shallow(<Home {...props} />);
      expect(home.find('.photo-list__item')).toHaveLength(1);
      expect(home).toMatchSnapshot();
    });
  });
});


// describe('Test of component of Home', () => {

//   it('renders without crashing', () => {
//     const div = document.createElement('div');
//   });
// });
// // describe('Test of component of Home', () => {

// //   it('renders without crashing', () => {
// //     const div = document.createElement('div');
// //     ReactDOM.render(<Home />, div);
// //     ReactDOM.unmountComponentAtNode(div);
// //   });

// //   it('Test Spinner', () => {

// //     const home = shallow(<Home />);

// //     home.setState({
// //       isListingLoading: false,
// //     });

// //     expect(home.find('.spinner').length).toEqual(0);

// //     home.setState({
// //       isListingLoading: true,
// //     });

// //     expect(home.find('.spinner').length).toEqual(1);

// //   });

// //   it('Test display Pagination', () => {

// //     const home = shallow(<Home />);

// //     home.setState({
// //       totalCards: 7,
// //     });

// //     expect(home.find('Pagination').length).toEqual(1);

// //     home.setState({
// //       totalCards: 5,
// //     });

// //     expect(home.find('Pagination').length).toEqual(0);
// //   });

// //   it('Test h2 while empty', () => {

// //     const home = shallow(<Home />);

// //     home.setState({
// //       totalCards: 1,
// //     });

// //     expect(home.find('.cards__text-empty').length).toEqual(0);

// //     home.setState({
// //       totalCards: null,
// //     });

// //     expect(home.find('.cards__text-empty').length).toEqual(1);

// //   });

// //   it('Test Snapshot', () => {

// //     const home = shallow(<Home />);
// //     expect(home).toMatchSnapshot();
// //   });
// // });
