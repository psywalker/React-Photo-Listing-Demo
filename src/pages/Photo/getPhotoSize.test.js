import getPhotoSize from './getPhotoSize';

const { JSDOM } = require('jsdom');


// console.log(jsdom.window.document.documentElement.clientWidth); // 123
describe('Test `getPhotoSize` method', () => {
  // Default Data
  const initialProps = {
    isSuccessPhotoRequest: false,
    widthPhoto: 500,
    heightPhoto: 1000,
  };

  describe('without and `isSuccessPhotoRequest` null', () => {
    it('Result with `isSuccessPhotoRequest` true', () => {
      const props = {
        ...initialProps,
        isSuccessPhotoRequest: true,
      };
      const result = getPhotoSize(props, 500, 1000);
      expect(result).toEqual({ photoWidth: '300px', photoHeight: 'auto' });
      
    });
    it('Result with default `widthPhoto` and `heightPhoto`', () => {
      const props = {
        ...initialProps,
        widthPhoto: 300,
        heightPhoto: 300,
      };
      const result = getPhotoSize(props, 994, 710);
      expect(result).toEqual({ photoWidth: '300px', photoHeight: 'auto' });
    });
  });
  it('Result with ``widthPhoto` > `heightPhoto ', () => {
    const props = {
      ...initialProps,
      widthPhoto: 3600,
      heightPhoto: 2703,
    };
    const result = getPhotoSize(props, 994, 710);
    expect(result).toEqual({ photoWidth: 'auto', photoHeight: '450px' });
  });
  it('Result with ``widthPhoto` < `heightPhoto ', () => {
    const props = {
      ...initialProps,
      widthPhoto: 2318,
      heightPhoto: 3000,
    };
    const result = getPhotoSize(props, 994, 710);
    expect(result).toEqual({ photoWidth: '403px', photoHeight: 'auto' });
  });
  it('Result with `widthPhoto` > `heightPhoto` and `heightPhoto` < `windowHeight` ', () => {
    const props = {
      ...initialProps,
      widthPhoto: 7952,
      heightPhoto: 5304,
    };
    const result = getPhotoSize(props, 994, 931);
    expect(result).toEqual({ photoWidth: 'auto', photoHeight: '603px' });
  });
  it('Result with `widthPhoto` < `heightPhoto` and `widthPhoto` > `photoContainerWidth` ', () => {
    const props = {
      ...initialProps,
      widthPhoto: 3346,
      heightPhoto: 4736,
    };
    const result = getPhotoSize(props, 992, 3260);
    expect(result).toEqual({ photoWidth: '930px', photoHeight: 'auto' });
  });
});