import React from 'react';
import Tags from '.';

describe('Test of component of Spinner', () => {
  // Default Data
  const initialProps = {
    handleMethod: () => {},
    tags: [],
  };

  const tags = [
    { title: 'city' },
    { title: 'urban' },
    { title: 'building' },
  ];
  const pageTag = 'div[data-test="tag"]';

  const appSelector = wrapper => ({
    getTag: () => wrapper.find(pageTag),
  });

  // const propses = {
  //   ...initialProps,
  //   tags,
  // };
  // const tagMount = global.mountWrap(<Tags {...propses} />);
  // console.log(tagMount.debug());

  describe('Spinner component initial', () => {
    it('renders without initial props', () => {
      const tagMount = global.mountWrap(<Tags />);
      const page = appSelector(tagMount);

      const tag = page.getTag();

    });
  });
});