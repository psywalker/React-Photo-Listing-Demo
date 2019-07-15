import { BrowserRouter } from 'react-router-dom';
import { shape } from 'prop-types';
import Enzyme, { shallow, mount, render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { createSerializer } from 'enzyme-to-json';
import 'jest-extended';

// React 16 Enzyme adapter
expect.addSnapshotSerializer(createSerializer({ mode: 'deep' }));
Enzyme.configure({ adapter: new Adapter() });

global.shallow = shallow;
global.render = render;
global.mount = mount;
global.BrowserRouter = BrowserRouter;
global.shape = shape;

// Fail tests on any warning
window.console.error = (message) => {
  throw new Error(message);
};
