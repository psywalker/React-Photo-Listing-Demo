import { BrowserRouter } from 'react-router-dom';
import { shape } from 'prop-types';
import Enzyme, { shallow, mount, render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { createSerializer } from 'enzyme-to-json';
import 'jest-extended';
import 'jest-enzyme';

// React 16 Enzyme adapter
expect.addSnapshotSerializer(createSerializer({ mode: 'deep' }));
Enzyme.configure({ adapter: new Adapter() });

const router = {
  history: new BrowserRouter().history,
  route: {
    location: {},
    match: {},
  },
};

const createContext = () => ({
  context: { router },
  childContextTypes: { router: shape({}) },
});

function mountWrap(node) {
  return mount(node, createContext());
}

global.shallow = shallow;
global.render = render;
global.mount = mount;
global.mountWrap = mountWrap;
// Fail tests on any warning
console.error = (message) => {
  throw new Error(message);
};
