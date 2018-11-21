import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import PhotoCard from './PhotoCard';

Enzyme.configure({ adapter: new Adapter() });

describe('Test of component of PhotoCard', () => {
  it('Test state PhotoCard component', () => {
    const card = shallow(<PhotoCard />)
    expect(Array.isArray(card.state().tagsColor)).toEqual(true);
    expect(Array.isArray(card.state().tags)).toEqual(true);
    expect(typeof card.instance().props.photoName).toEqual('string');
    expect(typeof card.instance().props.title).toEqual('string');
  });

  it('Test snapshot PhotoCard component', () => {
    const card = shallow(<PhotoCard />);
    expect(card).toMatchSnapshot();

  });
});