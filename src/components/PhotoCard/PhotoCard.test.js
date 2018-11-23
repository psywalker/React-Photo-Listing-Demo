import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import PhotoCard from './PhotoCard';

Enzyme.configure({ adapter: new Adapter() });

describe('Test of component of PhotoCard', () => {
  it('Test state PhotoCard component', () => {
    const card = mount(<PhotoCard />)
    expect(typeof card.prop('photoName')).toEqual('string');
    expect(typeof card.prop('title')).toEqual('string');
    expect(Array.isArray(card.prop('tags'))).toEqual(true);
  });

  it('Test snapshot PhotoCard component', () => {
    const card = shallow(<PhotoCard />);
    expect(card).toMatchSnapshot();
  });
});