import React from 'react';
import NavTop from '.';

describe('Test of component of NavTop', () => {
  // Default Data
  const initialProps = {
    filters: [],
    navTopItemActive: 0,
    onFilterItemValue: () => {},
  };
  const filters = [
    {
      id: 0,
      label: 'Editorial',
      filterValue: 'editorial',
    },
    {
      id: 1,
      label: 'Following',
      filterValue: 'following',
      border: true,
    },
    {
      id: 2,
      label: 'Wallpapers',
      filterValue: 'wallpapers',
    },
  ];
  const pageNavTop = 'ul[data-test="navTop"]';
  const pageNavTopItem = 'li[data-test="navTopItem"]';
  const pageNavTopItemTag = 'div[data-test="navTopItemTag"]';

  const appSelector = wrapper => ({
    getPageNavTop: () => wrapper.find(pageNavTop),
    getPageNavTopItem: () => wrapper.find(pageNavTopItem),
    getPageNavTopItemTag: () => wrapper.find(pageNavTopItemTag),
  });

  // const propses = {
  //   ...initialProps,
  //   filters,
  // };
  // const navTop = global.mountWrap(<NavTop {...propses} />);
  // console.log(navTop.debug());

  describe('HeaderApp component initial', () => {
    it('renders without initial props', () => {
      const navTop = global.mountWrap(<NavTop />);
      const page = appSelector(navTop);

      const nav = page.getPageNavTop();
      const navItem = page.getPageNavTopItem();
      const navItemTag = page.getPageNavTopItemTag();

    });
  });
});