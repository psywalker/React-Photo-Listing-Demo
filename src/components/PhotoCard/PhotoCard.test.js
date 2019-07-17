import React from 'react';
import PhotoCard from '.';

describe('Test of component of `PhotoCard`', () => {
  const initialProps = {
    onSearchTagValue: () => {},
    cards: [],
  };

  const cardsOneElement = [
    {
      photoDesc: null,
      photoID: '1',
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
  const photoCardList = 'ul[data-test="photoCardList"]';
  const photoCardListItem = 'li[data-test="photoCardListItem"]';
  const photoCard = 'div[data-test="photoCard"]';
  const photoCardPhotoLink = 'a[data-test="photoCardPhotoLink"]';
  const photoCardImg = 'img[data-test="photoCardImg"]';
  const photoCardAutor = 'div[data-test="photoCardAutor"]';
  const photoCardAutorLink = 'a[data-test="photoCardAutorLink"]';
  const photoCardAutorAvatar = 'img[data-test="photoCardAutorAvatar"]';
  const photoCardAutorName = 'span[data-test="photoCardAutorName"]';
  const photoCardDesc = 'p[data-test="photoCardDesc"]';
  const photoCardBadge = 'div[data-test="photoCardBadge"]';
  const photoCardBadgeTagMain = 'div[data-test="photoCardBadgeTagMain"]';
  const photoCardPopover = 'div[data-test="photoCardPopover"]';
  const photoCardBadgeTagInner = 'div[data-test="photoCardBadgeTagInner"]';
  const photoCardBadgeTagInnerMore = 'div[data-test="photoCardBadgeTagInnerMore"]';


  const appSelector = wrapper => ({
    getPhotoCardList: () => wrapper.find(photoCardList),
    getPhotoCardListItem: () => wrapper.find(photoCardListItem),
    getNthPhotoCardListItem: n => wrapper.find(photoCardListItem).at(n),
    getPhotoCardPhotoLink: () => wrapper.find(photoCardPhotoLink),
    getNthPhotoCardPhotoLink: n => wrapper.find(photoCardPhotoLink).at(n),
    getPhotoCard: () => wrapper.find(photoCard),
    getPhotoCardImg: () => wrapper.find(photoCardImg),
    getNthPhotoCardImg: n => wrapper.find(photoCardImg).at(n),
    getPhotoCardAutor: () => wrapper.find(photoCardAutor),
    getPhotoCardAutorLink: () => wrapper.find(photoCardAutorLink),
    getPhotoCardAutorAvatar: () => wrapper.find(photoCardAutorAvatar),
    getPhotoCardAutorName: () => wrapper.find(photoCardAutorName),
    getPhotoCardDesc: () => wrapper.find(photoCardDesc),
    getPhotoCardBadge: () => wrapper.find(photoCardBadge),
    getNthPhotoCardBadge: n => wrapper.find(photoCardBadge).at(n),
    getPhotoCardBadgeTagMain: () => wrapper.find(photoCardBadgeTagMain),
    getNthPhotoCardBadgeTagMain: n => wrapper.find(photoCardBadgeTagMain).at(n),
    getPhotoCardPopover: () => wrapper.find(photoCardPopover),
    getPhotoCardBadgeTagInner: () => wrapper.find(photoCardBadgeTagInner),
    getNthPhotoCardBadgeTagInner: n => wrapper.find(photoCardBadgeTagInner).at(n),
    getPhotoCardBadgeTagInnerMore: () => wrapper.find(photoCardBadgeTagInnerMore),
    getNthPhotoCardBadgeTagInnerMore: n => wrapper.find(photoCardBadgeTagInnerMore).at(n),
  });

  describe('`PhotoCard` initional render', () => {
    it('renders without initial props', () => {
      const photoCardComponent = global.mountWrap(<PhotoCard />);
      const page = appSelector(photoCardComponent);
      const cardList = page.getPhotoCardList();
      const cardListItem = page.getPhotoCardListItem();

      expect(cardList).toHaveLength(1);
      expect(cardListItem).toHaveLength(0);
    });
    it('renders with initial props', () => {
      const photoCardComponent = global.mountWrap(<PhotoCard {...initialProps} />);
      const page = appSelector(photoCardComponent);
      const cardList = page.getPhotoCardList();
      const cardListItem = page.getPhotoCardListItem();

      expect(cardList).toHaveLength(1);
      expect(cardListItem).toHaveLength(0);
    });
    it('renders with one element in `cards`', () => {
      const props = {
        ...initialProps,
        cards: cardsOneElement,
      };
      const photoCardComponent = global.mountWrap(<PhotoCard {...props} />);
      const page = appSelector(photoCardComponent);

      const cardList = page.getPhotoCardList();
      const cardListItem = page.getPhotoCardListItem();

      expect(cardList).toHaveLength(1);
      expect(cardListItem).toHaveLength(1);
      expect(cardListItem).toExist();
      expect(cardList).toContainMatchingElement('.photo-card-list__item');
    });
  });

  describe('Test Tags', () => {
    it('render `tags` on one element `cards`', () => {
      const props = {
        ...initialProps,
        cards: [
          {
            ...cardsOneElement[0],
            tags: [
              {
                title: 'motorcycle',
              },
              {
                title: 'auto',
              },
              {
                title: 'velocity',
              },
            ],
          },
        ],
      };
      const photoCardComponent = global.mountWrap(<PhotoCard {...props} />);
      const page = appSelector(photoCardComponent);
      const cardList = page.getPhotoCardList();
      const cardBadge = page.getPhotoCardBadge();
      const cardBadgeTagMain = page.getPhotoCardBadgeTagMain();
      const cardBadgeTagMain0 = page.getNthPhotoCardBadgeTagMain(0);
      console.log(cardList.debug())
      // expect(cardBadgeTagMain).toHaveLength(3);
      // expect(cardBadgeTagMain0).toHaveText('motorcycle');
      //console.log(cardBadgeTagMain.debug())
    });
    // it('render `tags` on two element `cards`', () => {
    //   const props = {
    //     ...initialProps,
    //     cards: [
    //       {
    //         ...cardsOneElement[0],
    //         tags: [
    //           {
    //             title: 'motorcycle1',
    //           },
    //           {
    //             title: 'auto1',
    //           },
    //           {
    //             title: 'velocity1',
    //           },
    //         ],
    //       },
    //       {
    //         ...cardsOneElement[0],
    //         photoID: '2',
    //         tags: [
    //           {
    //             title: 'motorcycle2',
    //           },
    //           {
    //             title: 'auto2',
    //           },
    //           {
    //             title: 'velocity2',
    //           },
    //         ],
    //       },
    //     ],
    //   };
    //   const photoCardComponent = global.mountWrap(<PhotoCard {...props} />);
    //   const page = appSelector(photoCardComponent);
    //   const cardBadge = page.getPhotoCardBadge();
    //   const cardBadgeTagMain = page.getPhotoCardBadgeTagMain();
    //   const cardBadgeTagMain5 = page.getNthPhotoCardBadgeTagMain(5);
      
    //   expect(cardBadgeTagMain).toHaveLength(6);
    //   expect(cardBadgeTagMain5).toHaveText('velocity2');
    // });

    // it('Mock `onSearchTagValue` ', () => {
    //   const mockFetchRequestAction = jest.fn();
    //   const props = {
    //     cards: [
    //       {
    //         ...cardsOneElement[0],
    //         tags: [
    //           {
    //             title: 'motorcycle1',
    //           },
    //           {
    //             title: 'auto1',
    //           },
    //           {
    //             title: 'velocity1',
    //           },
    //           {
    //             title: 'motorcycle2',
    //           },
    //           {
    //             title: 'auto2',
    //           },
    //           {
    //             title: 'velocity2',
    //           },
    //         ],
    //       },
    //     ],
    //     onSearchTagValue: mockFetchRequestAction,
    //   };

    //   const photoCardComponent = global.mountWrap(<PhotoCard {...props} />);
    //   const page = appSelector(photoCardComponent);
    //   const cardBadge = page.getPhotoCardBadge();
    //   const cardBadgeTagMain = page.getPhotoCardBadgeTagMain();
    //   const cardBadgeTagMain0 = page.getNthPhotoCardBadgeTagMain(0);
    //   const cardBadgeTagInner = page.getPhotoCardBadgeTagInner();
    //   const cardBadgeTagInner4 = page.getNthPhotoCardBadgeTagInner(4);
    //   cardBadgeTagMain0.simulate('click');
    //   //cardBadgeTagInner4.simulate('click');
    //   //expect(mockFetchRequestAction).toHaveBeenCalledTimes(2);
    //   console.log(cardBadgeTagInner4.debug());
    // });
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