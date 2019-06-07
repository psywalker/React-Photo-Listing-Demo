import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import User from '.';

Enzyme.configure({ adapter: new Adapter() });

describe('Test of component of User', () => {
  it('Test User snapshot', () => {
    const props = {
      match: {
        params: {
          id: 'sC-BXbi9ajw',
        },
      },
    };

    const user = shallow(<User {...props} />);
    expect(user).toMatchSnapshot();
  });
});
