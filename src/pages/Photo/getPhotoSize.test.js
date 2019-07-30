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
      // const html = ''
      //   + '<!DOCTYPE html>'
      //       + '<html>'
      //       + '<head>'
      //           + '<title>Blank</title>'
      //       + '</head>'
      //       + '<body>'
      //           + '<div id="photo-container">Hello World</div>'
      //       + '</body>'
      //   + '</html>';
      // const jsdom = new JSDOM(html);
      // Object.defineProperty(jsdom.window.HTMLHtmlElement.prototype, 'clientHeight', { value: 698 });
      // const { window } = jsdom.window;
      // const el = window.document.getElementById('photo-container');
      // el.style.width = '812px';
      // console.log(el.innerHTML);
      // const div = window.document.createElement('div');
      // div.id = 'photo-container';
      // div.style.width = '812px';
      // window.document.body.appendChild(div);
      const jsdom = new JSDOM('<!DOCTYPE html><html>');
      Object.defineProperty(jsdom.window.HTMLHtmlElement.prototype, 'clientHeight', { value: 698 });
      const div = window.document.createElement('div');
      div.id = 'photo-container';
      div.style.width = '812px';
      window.document.body.appendChild(div);

      const props = {
        ...initialProps,
        widthPhoto: 7952,
        heightPhoto: 5304,
      };
      const result = getPhotoSize(props);
      expect(result).toEqual({photoWidth: "auto", photoHeight: "438px"});

    });
  });
});