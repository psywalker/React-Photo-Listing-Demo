import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import NavTop from '.'; 

Enzyme.configure({ adapter: new Adapter() });

describe('Test of component of NavTop', () => {
    it('Test display Pagination', () => { 
        const navTop = shallow(<NavTop />);
        console.log(navTop.debug())
    });  

    it('Test Snapshot', () => { 

        const navTop = shallow(<NavTop />);
        //expect(userPhotoListing).toMatchSnapshot();
    });
});