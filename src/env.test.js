import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';


Enzyme.configure({ adapter: new Adapter() });

describe('test .env file', () => {
 
    it('test .env file on empty string', () => {
        function isEmpty(str) {
            if (str.trim() != '') 
              return true;
              
            return false;
          }
        expect(typeof process.env.REACT_APP_PIXABAY_API_KEY).toEqual('string');
        expect(isEmpty(process.env.REACT_APP_PIXABAY_API_KEY)).toEqual(true);  
    });
});