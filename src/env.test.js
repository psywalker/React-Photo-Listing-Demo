import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';


Enzyme.configure({ adapter: new Adapter() });

describe('Test', () => {
 
    it('Test', () => {
        expect(process.env.REACT_APP_PIXABAY_API_KEY).toEqual('5902386-0f23bc626123b6d6520f3ef4b'); 
    });
});