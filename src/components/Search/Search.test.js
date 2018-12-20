import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Search from '.'; 

Enzyme.configure({ adapter: new Adapter() });

describe('Test of component of Search', () => {

    it('Test Search placeholder', () => { 

        const search = shallow(<Search />);
        expect(search.find('.search__input').prop('placeholder')).toEqual('Wallpapers');

    });  

    it('Test Search value', () => { 

        const search = shallow(<Search />);
        search.setState({
            inputValue: 'wolf',
        })
        expect(search.find('.search__input').prop('value')).toEqual('wolf');

    });  

    it('Test Snapshot', () => { 
        const search = shallow(<Search />);
        expect(search).toMatchSnapshot();
    });
});