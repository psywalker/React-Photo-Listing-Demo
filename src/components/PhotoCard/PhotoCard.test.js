import React from 'react';
import PhotoCard from '.';

describe('Test of component of PhotoCard', () => {
  const initialProps = {
    onSearchTagValue: () => {},
    cards: [],
  };

  const cardsOneElement = [
    {
      photoDesc: null,
      photoID: 'kdGstD3te3M',
      tags: [
        {
          title: 'motorcycle',
        },
      ],
      photoName: 'https://images.unsplash.com/photo-1558981408-db0ecd8a1ee4?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjQzODA4fQ',
      title: 'Harley-Davidson',
      userAvatar: 'https://images.unsplash.com/profile-1556751276456-1561737ea797?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=128&w=128',
      userID: 'harleydavidson',
    },
  ];
  const photoList = 'li[data-test="tab"]';

  describe('Home component initial', () => {
    it('renders without initial props', () => {
      const photoCard = global.shallow(<PhotoCard />);
    });
    it('renders with initial props', () => {
      const photoCard = global.shallow(<PhotoCard {...initialProps} />);
      expect(photoCard).toMatchSnapshot();
    });
    it('renders with `cards`', () => {
      const props = {
        ...initialProps,
        cards: cardsOneElement,
      };
      const photoCard = global.shallow(<PhotoCard {...props} />);
      expect(photoCard).toMatchSnapshot();
    });
  });
});


// import React from 'react';
// import { LastLocationProvider } from 'react-router-last-location';
// import { BrowserRouter } from 'react-router-dom';
// import Enzyme, { shallow, mount } from 'enzyme';
// import Adapter from 'enzyme-adapter-react-16';
// import PhotoCard from '.';

// Enzyme.configure({ adapter: new Adapter() });

// describe('Test of component of PhotoCard', () => {
//   it('Test state PhotoCard dive props', () => {
//     const props = {
//       photoName: '',
//     };
//     const card = shallow(
//       <BrowserRouter>
//         <LastLocationProvider><PhotoCard {...props} /></LastLocationProvider>
//       </BrowserRouter>,
//     );
//     expect(typeof card.props().children.props.children.props.photoName).toEqual('string');
//   });

//   it('Test state PhotoCard props', () => {
//     const props = {
//       photoName: 'src',
//       photoID: '1',
//       userID: '1',
//     };
//     const card = mount(
//       <BrowserRouter>
//         <LastLocationProvider><PhotoCard {...props} /></LastLocationProvider>
//       </BrowserRouter>,
//     );
//     expect(card.find('.photo-card__img').prop('src')).toEqual('src');
//     expect(card.find('a.photo-card__photo-link').prop('href')).toEqual('/photo/1');
//     expect(card.find('a.photo-card-self__link-ava').prop('href')).toEqual('/users/1');
//   });

//   it('Test state PhotoCard booleans', () => {
//     const props1 = {
//       title: '11',
//       photoDesc: '11',
//       tags: [
//         {
//           title: '1',
//         },
//         {
//           title: '2',
//         },
//         {
//           title: '3',
//         },
//         {
//           title: '4',
//         },
//       ],
//     };

//     const card1 = mount(
//       <BrowserRouter>
//         <LastLocationProvider><PhotoCard {...props1} /></LastLocationProvider>
//       </BrowserRouter>,
//     );
//     expect(card1.find('a.photo-card-self__link-ava').length).toEqual(1);
//     expect(card1.find('.photo-card-self__desc').text()).toEqual('11');
//     expect(card1.find('Popover').length).toEqual(1);
//     const props2 = {
//       title: '',
//       photoDesc: '',
//       tags: [
//         {
//           title: '1',
//         },
//         {
//           title: '2',
//         },
//         {
//           title: '3',
//         },
//       ],
//     };

//     const card2 = mount(
//       <BrowserRouter>
//         <LastLocationProvider><PhotoCard {...props2} /></LastLocationProvider>
//       </BrowserRouter>,
//     );
//     expect(card2.find('a.photo-card-self__link-ava').length).toEqual(0);
//     expect(card2.find('.photo-card-self__desc').text()).toEqual('No Description');
//     expect(card2.find('Popover').length).toEqual(0);
//   });
//   it('Test snapshot PhotoCard component', () => {
//     const card = shallow(
//       <BrowserRouter>
//         <LastLocationProvider><PhotoCard /></LastLocationProvider>
//       </BrowserRouter>,
//     );
//     expect(card).toMatchSnapshot();
//   });
// });