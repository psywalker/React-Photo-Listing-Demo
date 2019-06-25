import React from 'react';
import ReactDOM from 'react-dom';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Home } from '.';
import filters from '../../filters';

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
    totalCards: 10,
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
