import getPhotoSize from './getPhotoSize';

const { JSDOM } = require('jsdom');

const jsdom = new JSDOM('<!DOCTYPE html><html>...');
Object.defineProperty(jsdom.window.HTMLHtmlElement.prototype, 'clientWidth', { value: 123 });
console.log(jsdom.window.document.documentElement.clientWidth); // 123
describe('Test `getPhotoSize` method', () => {
  // Default Data
  const initialProps = {
    isSuccessPhotoRequest: false,
    widthPhoto: 500,
    heightPhoto: 1000,
  };

  describe('without `window.document.getElementById("photo-container")` and `isSuccessPhotoRequest` null ', () => {
    it('Result with `isSuccessPhotoRequest` true', () => {
      const props = {
        ...initialProps,
        isSuccessPhotoRequest: true,
      };
      const result = getPhotoSize(props);
      expect(result).toEqual({ photoWidth: '300px', photoHeight: 'auto' });
      
    });
    it('Result with `window.document.getElementById("photo-container")` null', () => {
      const props = {
        ...initialProps,
      };
      const result = getPhotoSize(props);
      expect(result).toEqual({ photoWidth: '300px', photoHeight: 'auto' });
    });
  });
  describe('with `window.document.getElementById("photo-container")`', () => {
    it('Result with `window.document.getElementById("photo-container")` in DOM', () => {
      const div = window.document.createElement('div');
      div.id = 'photo-container';
      div.style.width = '900px';
      window.document.body.appendChild(div);
      const props = {
        ...initialProps,
      };
      const result = getPhotoSize(props);
      //expect(result).toEqual({ photoWidth: '300px', photoHeight: 'auto' });

    });
  });
});