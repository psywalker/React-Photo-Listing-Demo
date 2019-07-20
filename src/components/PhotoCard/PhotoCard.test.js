import React from 'react';
import PhotoCard from '.';
import { getTagsHiddenArr } from '.';

describe('Test of component of `PhotoCard`', () => {
  const initialProps = {
    onSearchTagValue: () => {},
    cards: [],
  };

  const cardsOneElement = [
    {
      photoDesc: null,
      photoAltDesc: 'image',
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
  const photoCardPhotoLinkRouter = 'Link[data-test="photoCardPhotoLink"]';
  const photoCardImg = 'img[data-test="photoCardImg"]';
  const photoCardAutor = 'div[data-test="photoCardAutor"]';
  const photoCardAutorLink = 'a[data-test="photoCardAutorLink"]';
  const photoCardAutorLinkRouter = 'Link[data-test="photoCardAutorLink"]';
  const photoCardAutorAvatar = 'img[data-test="photoCardAutorAvatar"]';
  const photoCardAutorName = 'span[data-test="photoCardAutorName"]';
  const photoCardDesc = 'p[data-test="photoCardDesc"]';
  const photoCardBadge = 'div[data-test="photoCardBadge"]';
  const photoCardTagMainContainer = '[data-test="photoCardTagMainContainer"]';
  const tag = 'div[data-test="tag"]';
  const photoCardTagMore = 'div[data-test="photoCardTagMore"]';

  const appSelector = wrapper => ({
    getPhotoCardList: () => wrapper.find(photoCardList),
    getPhotoCardListItem: () => wrapper.find(photoCardListItem),
    getNthPhotoCardListItem: n => wrapper.find(photoCardListItem).at(n),
    getPhotoCardPhotoLink: () => wrapper.find(photoCardPhotoLink),
    getNthPhotoCardPhotoLink: n => wrapper.find(photoCardPhotoLink).at(n),
    getPhotoCardPhotoLinkRouter: () => wrapper.find(photoCardPhotoLinkRouter),
    getPhotoCard: () => wrapper.find(photoCard),
    getPhotoCardImg: () => wrapper.find(photoCardImg),
    getNthPhotoCardImg: n => wrapper.find(photoCardImg).at(n),
    getPhotoCardAutor: () => wrapper.find(photoCardAutor),
    getPhotoCardAutorLink: () => wrapper.find(photoCardAutorLink),
    getPhotoCardAutorLinkRouter: () => wrapper.find(photoCardAutorLinkRouter),
    getNthPhotoCardAutorLink: n => wrapper.find(photoCardAutorLink).at(n),
    getPhotoCardAutorAvatar: () => wrapper.find(photoCardAutorAvatar),
    getPhotoCardAutorName: () => wrapper.find(photoCardAutorName),
    getPhotoCardDesc: () => wrapper.find(photoCardDesc),
    getPhotoCardBadge: () => wrapper.find(photoCardBadge),
    getNthPhotoCardBadge: n => wrapper.find(photoCardBadge).at(n),
    getTag: () => wrapper.find(tag),
    getNthTag: n => wrapper.find(tag).at(n),
    getPhotoCardTagMainContainer: () => wrapper.find(photoCardTagMainContainer),
    getPhotoCardTagMore: () => wrapper.find(photoCardTagMore),
  });

  describe('`PhotoCard` initional render', () => {
    it('renders without initial props', () => {
      const photoCardComponent = global.mountWrap(<PhotoCard />);
      const page = appSelector(photoCardComponent);
      const cardList = page.getPhotoCardList();
      const cardListItem = page.getPhotoCardListItem();

      expect(cardList).toHaveLength(1);
      expect(cardListItem).toHaveLength(0);

      expect(photoCardComponent).toMatchSnapshot();
    });
    it('renders with initial props', () => {
      const photoCardComponent = global.mountWrap(<PhotoCard {...initialProps} />);
      const page = appSelector(photoCardComponent);
      const cardList = page.getPhotoCardList();
      const cardListItem = page.getPhotoCardListItem();

      expect(cardList).toHaveLength(1);
      expect(cardListItem).toHaveLength(0);

      expect(photoCardComponent).toMatchSnapshot();
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

      expect(photoCardComponent).toMatchSnapshot();
    });
  });

  describe('Test `getTagsHiddenArr`', () => {
    it('result `getTagsHiddenArr` with `< 4` tags to equal `false`', () => {
      const obj = {
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
      };
      const resultTag = getTagsHiddenArr(obj);
      expect(resultTag).toEqual(false);
    });
    it('result `getTagsHiddenArr` with `> 3` tags to equal `false`', () => {
      const obj = {
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
          {
            title: 'bike',
          },
        ],
      };
      const resultTag = getTagsHiddenArr(obj);
      expect(resultTag.length).toEqual(1);
    });
  });
  describe('Test `photoCardPhotoLink`', () => {
    it('Test `photoCardPhotoLink` address', () => {
      const props = {
        ...initialProps,
        cards: cardsOneElement,
      };
      const photoCardComponent = global.mountWrap(<PhotoCard {...props} />);
      const page = appSelector(photoCardComponent);
      const cardPhotoLink0 = page.getNthPhotoCardPhotoLink(0);
      const cardPhotoLinkRouter = page.getPhotoCardPhotoLinkRouter(); 
      
      expect(cardPhotoLink0.props().href).toEqual('/photo/1');
      expect(cardPhotoLinkRouter.prop('to')).toEqual('/photo/1');

      expect(photoCardComponent).toMatchSnapshot();
    });
    it('Test data `cards` in component', () => {
      const props = {
        ...initialProps,
        cards: cardsOneElement,
      };
      const photoCardComponent = global.mountWrap(<PhotoCard {...props} />);
      const page = appSelector(photoCardComponent);
      const cardImg = page.getPhotoCardImg();
      const cardAutorLink = page.getPhotoCardAutorLink();
      const cardAutorLinkRouter = page.getPhotoCardAutorLinkRouter();
      const cardAutorAvatar = page.getPhotoCardAutorAvatar();
      const cardAutorName = page.getPhotoCardAutorName();
      const cardPhotoDesc = page.getPhotoCardDesc();
      const cardTagMainContainer = page.getPhotoCardTagMainContainer();

      expect(cardImg.prop('alt')).toEqual('image');
      expect(cardImg.prop('src')).toEqual(cardsOneElement[0].photoName);
      expect(cardAutorLink.props().href).toEqual('/users/harleydavidson');
      expect(cardAutorLinkRouter.prop('to')).toEqual('/users/harleydavidson');
      expect(cardAutorAvatar.prop('alt')).toEqual('harleydavidson');
      expect(cardAutorAvatar.prop('src')).toEqual(cardsOneElement[0].userAvatar);
      expect(cardAutorName).toHaveText('Harley-Davidson');
      expect(cardPhotoDesc).toHaveText('');
      expect(cardTagMainContainer.prop('tags')).toBeArray();
      expect(cardTagMainContainer.prop('handleMethod')).toBeFunction();

      expect(photoCardComponent).toMatchSnapshot();
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
              {
                title: 'electric bike',
              },
              {
                title: 'harley-davidson',
              },
              {
                title: 'scooter',
              },
            ],
          },
        ],
      };
      const photoCardComponent = global.mountWrap(<PhotoCard {...props} />);
      const page = appSelector(photoCardComponent);
      const cardPhotoCardTagMore = page.getPhotoCardTagMore();
      const cardTag = page.getTag();
      const cardTag0 = page.getNthTag(0);

      expect(cardTag).toHaveLength(3);
      expect(cardTag0).toHaveText('motorcycle');
      expect(cardPhotoCardTagMore).toHaveText('more tags...');
      expect(cardPhotoCardTagMore).toHaveLength(1);

      expect(photoCardComponent).toMatchSnapshot();
    });
    it('render `tags` on two element `cards`', () => {
      const props = {
        ...initialProps,
        cards: [
          {
            ...cardsOneElement[0],
            tags: [
              {
                title: 'motorcycle1',
              },
              {
                title: 'auto1',
              },
              {
                title: 'velocity1',
              },
            ],
          },
          {
            ...cardsOneElement[0],
            photoID: '2',
            tags: [
              {
                title: 'motorcycle2',
              },
              {
                title: 'auto2',
              },
              {
                title: 'velocity2',
              },
            ],
          },
        ],
      };
      const photoCardComponent = global.mountWrap(<PhotoCard {...props} />);
      const page = appSelector(photoCardComponent);
      const cardTag = page.getTag();
      const cardTag5 = page.getNthTag(5);
      
      expect(cardTag).toHaveLength(6);
      expect(cardTag5).toHaveText('velocity2');

      expect(photoCardComponent).toMatchSnapshot();
    });

    it('Mock `onSearchTagValue` ', () => {
      const mockFetchRequestAction = jest.fn();
      const props = {
        cards: [
          {
            ...cardsOneElement[0],
            tags: [
              {
                title: 'motorcycle1',
              },
              {
                title: 'auto1',
              },
              {
                title: 'velocity1',
              },
              {
                title: 'motorcycle2',
              },
              {
                title: 'auto2',
              },
              {
                title: 'velocity2',
              },
            ],
          },
        ],
        onSearchTagValue: mockFetchRequestAction,
      };

      const photoCardComponent = global.mountWrap(<PhotoCard {...props} />);
      const page = appSelector(photoCardComponent);
      const cardBadge = page.getPhotoCardBadge();
      const cardTag = page.getTag();
      const cardTag0 = page.getNthTag(0);
      cardTag0.simulate('click');
      expect(mockFetchRequestAction).toHaveBeenCalledTimes(1);
    });
  });
});